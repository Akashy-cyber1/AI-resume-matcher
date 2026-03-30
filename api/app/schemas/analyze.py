from pydantic import BaseModel, Field


class AnalyzeResponse(BaseModel):
    score: int = Field(..., ge=0, le=100)
    similarity: float = Field(..., ge=-1.0, le=1.0)
    missing_keywords: list[str]
    suggestions: list[str] = Field(..., min_length=1, max_length=5)
    processing_time: float = Field(..., ge=0)


class TaskQueuedResponse(BaseModel):
    task_id: str
    status: str = "queued"


class TaskStatusResponse(BaseModel):
    task_id: str
    status: str
    result: AnalyzeResponse | None = None