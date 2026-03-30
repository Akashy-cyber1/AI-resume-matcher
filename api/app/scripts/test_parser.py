import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "api"))

from app.services.parser import extract_resume_text

file_path = input("Enter resume file path: ").strip()
text = extract_resume_text(file_path)

print("\n===== EXTRACTED TEXT PREVIEW =====\n")
print(text[:3000])
print("\n===== TOTAL CHARS =====")
print(len(text))