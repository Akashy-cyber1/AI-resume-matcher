import base64

from app.celery_app import celery_app
from app.services.analyze_service import run_analysis_from_bytes


@celery_app.task(name="analyze_resume_task")
def analyze_resume_task(
    encoded_file: str,
    filename: str,
    content_type: str,
    jd_text: str,
):
    file_bytes = base64.b64decode(encoded_file.encode("utf-8"))
    result = run_analysis_from_bytes(
        file_bytes=file_bytes,
        filename=filename,
        content_type=content_type,
        jd_text=jd_text,
    )
    return result.model_dump()