import os
import tempfile
import time

from fastapi import HTTPException

from app.core.validation import validate_resume_upload
from app.schemas.analyze import AnalyzeResponse
from app.services.parser import extract_resume_text
from app.services.embedding import get_embedding
from app.services.scoring import cosine_similarity_score, normalize_score
from app.services.keywords import get_missing_keywords
from app.services.openai_suggestions import get_ai_suggestions


def run_analysis_from_bytes(
    file_bytes: bytes,
    filename: str,
    content_type: str | None,
    jd_text: str,
) -> AnalyzeResponse:
    start_time = time.perf_counter()

    validate_resume_upload(filename, content_type, len(file_bytes))

    suffix = os.path.splitext(filename)[1].lower()
    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(file_bytes)
            temp_path = tmp.name

        try:
            resume_text = extract_resume_text(temp_path)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Could not parse the uploaded resume. File may be corrupt or unsupported.",
            )

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Resume text extraction returned empty content.",
            )

        try:
            resume_embedding = get_embedding(resume_text)
            jd_embedding = get_embedding(jd_text)
        except Exception:
            raise HTTPException(
                status_code=500,
                detail="Embedding pipeline failed.",
            )

        similarity = cosine_similarity_score(resume_embedding, jd_embedding)
        score = normalize_score(similarity)

        keyword_result = get_missing_keywords(resume_text, jd_text)
        missing_keywords = keyword_result["missing_keywords"]
        resume_keywords = keyword_result["resume_keywords"]
        jd_keywords = keyword_result["jd_keywords"]

        suggestions = get_ai_suggestions(
            resume_text=resume_text,
            jd_text=jd_text,
            score=score,
            missing_keywords=missing_keywords,
            resume_keywords=resume_keywords,
            jd_keywords=jd_keywords,
        )

        processing_time = round(time.perf_counter() - start_time, 2)

        return AnalyzeResponse(
            score=score,
            similarity=round(similarity, 4),
            missing_keywords=missing_keywords[:15],
            suggestions=suggestions[:5],
            processing_time=processing_time,
        )

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)