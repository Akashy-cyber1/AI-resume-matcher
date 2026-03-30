from pathlib import Path
from fastapi import HTTPException
from app.core.config import settings

ALLOWED_EXTENSIONS = {".pdf", ".docx"}
DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
ALLOWED_CONTENT_TYPES = {
    ".pdf": {"application/pdf"},
    ".docx": {DOCX_MIME},
}


def validate_resume_upload(filename: str, content_type: str | None, size_bytes: int) -> None:
    if not filename:
        raise HTTPException(status_code=400, detail="Resume filename is missing.")

    ext = Path(filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed.",
        )

    max_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
    if size_bytes > max_bytes:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum allowed size is {settings.MAX_FILE_SIZE_MB}MB.",
        )

    allowed_types = ALLOWED_CONTENT_TYPES.get(ext, set())
    if content_type and allowed_types and content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid content type for {ext} file.",
        )