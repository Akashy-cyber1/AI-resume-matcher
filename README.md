# AI Resume Matcher

AI-powered backend API that takes a resume file and job description text, then returns:
- match score
- missing keywords
- improvement suggestions

## Tech Stack
- FastAPI
- PostgreSQL
- pgvector
- Sentence Transformers
- PyMuPDF
- python-docx
- scikit-learn

## Run Locally
1. Create venv
2. Install requirements
3. Add `.env`
4. Run:
   uvicorn app.main:app --reload

## Endpoint
POST /analyze/