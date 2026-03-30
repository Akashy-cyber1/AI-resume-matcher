import fitz
from docx import Document
from pathlib import Path

def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    text = []
    for page in doc:
        text.append(page.get_text("text", sort=True))
    return "\n".join(text).strip()

def extract_text_from_docx(file_path: str) -> str:
    doc = Document(file_path)
    return "\n".join([p.text for p in doc.paragraphs]).strip()

def extract_text_from_txt(file_path: str) -> str:
    return Path(file_path).read_text(encoding="utf-8", errors="ignore").strip()

def extract_resume_text(file_path: str) -> str:
    ext = Path(file_path).suffix.lower()

    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext == ".docx":
        return extract_text_from_docx(file_path)
    elif ext == ".txt":
        return extract_text_from_txt(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")