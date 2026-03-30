import hashlib
import json
import re
from openai import OpenAI

from app.core.config import settings
from app.core.redis_client import redis_client
from app.services.suggestions import generate_fallback_suggestions

client = None
if settings.OPENAI_API_KEY:
    client = OpenAI(
        api_key=settings.OPENAI_API_KEY,
        timeout=settings.OPENAI_TIMEOUT_SECONDS,
    )


def _compact_resume_text(resume_text: str, max_chars: int = 1400) -> str:
    lines = [line.strip() for line in resume_text.splitlines() if line.strip()]
    selected = []

    for line in lines:
        selected.append(line)
        if sum(len(x) for x in selected) >= max_chars:
            break

    compact = "\n".join(selected)
    return compact[:max_chars]


def _cache_key(jd_text: str, missing_keywords: list[str], score: int) -> str:
    # Sirf JD pe cache karna unsafe hai; same JD but different resume par wrong result aa sakta hai
    # Isliye JD + missing_keywords + score bucket use kar rahe hain
    normalized_jd = re.sub(r"\s+", " ", jd_text.lower()).strip()
    score_bucket = (score // 5) * 5
    raw = normalized_jd[:1200] + "|" + "|".join(sorted(missing_keywords[:12])) + f"|{score_bucket}"
    return "ai_suggestions:" + hashlib.sha256(raw.encode("utf-8")).hexdigest()


def _parse_suggestions(raw_text: str) -> list[str]:
    raw_text = raw_text.strip()

    try:
        parsed = json.loads(raw_text)
        if isinstance(parsed, list):
            cleaned = [str(item).strip() for item in parsed if str(item).strip()]
            return cleaned[:5]
    except Exception:
        pass

    lines = []
    for line in raw_text.splitlines():
        clean = re.sub(r"^\s*[-*\d.]+\s*", "", line).strip()
        if clean:
            lines.append(clean)

    if lines:
        return lines[:5]

    return []


def get_ai_suggestions(
    resume_text: str,
    jd_text: str,
    score: int,
    missing_keywords: list[str],
    resume_keywords: list[str],
    jd_keywords: list[str],
) -> list[str]:
    cache_key = _cache_key(jd_text, missing_keywords, score)

    try:
        cached = redis_client.get(cache_key)
        if cached:
            parsed = json.loads(cached)
            if isinstance(parsed, list) and parsed:
                return parsed[:5]
    except Exception:
        pass

    if not client:
        return generate_fallback_suggestions(score, missing_keywords)

    compact_resume = _compact_resume_text(resume_text)
    prompt = f"""
You are an expert ATS resume reviewer.

Given this resume summary and job description, return exactly 5 specific improvements.
Focus on:
- missing skills/tools
- weak phrasing
- lack of measurable impact
- missing JD alignment
- project/experience improvements

Return ONLY a JSON array of 5 strings. No markdown. No explanation.

Match score: {score}

Resume summary:
{compact_resume}

Resume keywords:
{", ".join(resume_keywords[:15])}

Job description:
{jd_text[:1500]}

JD keywords:
{", ".join(jd_keywords[:15])}

Missing keywords:
{", ".join(missing_keywords[:15])}
""".strip()

    try:
        if settings.OPENAI_API_STYLE == "responses":
            response = client.responses.create(
                model=settings.OPENAI_MODEL,
                input=prompt,
                max_output_tokens=220,
            )
            raw_text = response.output_text or ""
        else:
            response = client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": "You generate short, practical resume improvement suggestions.",
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    },
                ],
                temperature=0.2,
                max_tokens=220,
            )
            raw_text = response.choices[0].message.content or ""

        suggestions = _parse_suggestions(raw_text)
        if not suggestions:
            suggestions = generate_fallback_suggestions(score, missing_keywords)

    except Exception:
        suggestions = generate_fallback_suggestions(score, missing_keywords)

    try:
        redis_client.setex(
            cache_key,
            settings.CACHE_TTL_SECONDS,
            json.dumps(suggestions),
        )
    except Exception:
        pass

    return suggestions[:5]