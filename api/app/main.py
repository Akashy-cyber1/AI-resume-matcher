from fastapi import FastAPI
from app.routers.analyze import router as analyze_router

app = FastAPI(title="AI Resume Matcher API")

app.include_router(analyze_router, prefix="/analyze", tags=["analyze"])

@app.get("/health")
def health():
    return {"status": "ok"}