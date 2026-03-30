import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "api"))

from app.services.keywords import get_missing_keywords

resume_text = "Python Django FastAPI PostgreSQL REST APIs Git GitHub"
jd_text = "Looking for Python FastAPI PostgreSQL Redis Docker CI/CD experience"

result = get_missing_keywords(resume_text, jd_text)
print(result)