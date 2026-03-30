import os
import time
import tempfile

from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.services.parser import extract_resume_text
from app.services.embedding import get_embedding
from app.services.scoring import cosine_similarity_score, normalize_score
from app.services.keywords import get_missing_keywords
from app.services.suggestions import generate_suggestions

router = APIRouter()

@router.post("/")
async def analyze_resume(
    resume: UploadFile = File(...),
    jd_text: str = Form(...)
):
    start_time = time.time()

    suffix = os.path.splitext(resume.filename)[1]

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        content = await resume.read()
        tmp.write(content)
        temp_path = tmp.name

    try:
        resume_text = extract_resume_text(temp_path)
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Resume text extraction failed")

        resume_embedding = get_embedding(resume_text)
        jd_embedding = get_embedding(jd_text)

        similarity = cosine_similarity_score(resume_embedding, jd_embedding)
        score = normalize_score(similarity)

        keyword_result = get_missing_keywords(resume_text, jd_text)
        missing_keywords = keyword_result["missing_keywords"]

        suggestions = generate_suggestions(score, missing_keywords)

        processing_time = round(time.time() - start_time, 2)

        return {
            "score": score,
            "similarity": round(similarity, 4),
            "missing_keywords": missing_keywords[:15],
            "suggestions": suggestions,
            "processing_time": processing_time
        }

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)