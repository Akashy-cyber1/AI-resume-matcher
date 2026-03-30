from io import BytesIO

from docx import Document
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def make_docx_bytes(text: str) -> bytes:
    doc = Document()
    for line in text.split("\n"):
        doc.add_paragraph(line)
    buffer = BytesIO()
    doc.save(buffer)
    buffer.seek(0)
    return buffer.read()


def fake_embedding(text: str):
    text = text.lower()
    if "redis" in text or "docker" in text:
        return [0.9, 0.1, 0.2, 0.7]
    return [0.8, 0.2, 0.2, 0.6]


def fake_suggestions(**kwargs):
    return [
        "Add Redis explicitly in the skills section.",
        "Mention Docker in a project bullet.",
        "Show measurable backend impact.",
        "Align resume summary with the target role.",
        "Use exact JD wording in project bullets.",
    ]


def test_analyze_success(monkeypatch):
    monkeypatch.setattr("app.services.analyze_service.get_embedding", fake_embedding)
    monkeypatch.setattr("app.services.analyze_service.get_ai_suggestions", fake_suggestions)

    resume_bytes = make_docx_bytes(
        "Akash\nSkills: Python FastAPI PostgreSQL\nProjects: Resume matcher backend"
    )

    response = client.post(
        "/analyze/",
        data={"jd_text": "Need Python FastAPI PostgreSQL Redis Docker backend experience"},
        files={
            "resume": (
                "resume.docx",
                resume_bytes,
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            )
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert "score" in body
    assert "missing_keywords" in body
    assert "suggestions" in body
    assert len(body["suggestions"]) == 5


def test_invalid_file_type():
    response = client.post(
        "/analyze/",
        data={"jd_text": "Need Python backend developer"},
        files={"resume": ("resume.txt", b"hello world", "text/plain")},
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Only PDF and DOCX files are allowed."


def test_corrupt_pdf():
    response = client.post(
        "/analyze/",
        data={"jd_text": "Need Python backend developer"},
        files={"resume": ("resume.pdf", b"not a real pdf", "application/pdf")},
    )

    assert response.status_code == 400
    assert "Could not parse the uploaded resume" in response.json()["detail"]