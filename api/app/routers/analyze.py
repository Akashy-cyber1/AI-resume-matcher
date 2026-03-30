import base64

from celery.result import AsyncResult
from fastapi import APIRouter, Depends, File, Form, Request, UploadFile

from app.celery_app import celery_app
from app.core.rate_limit import enforce_rate_limit
from app.schemas.analyze import AnalyzeResponse, TaskQueuedResponse, TaskStatusResponse
from app.services.analyze_service import run_analysis_from_bytes
from app.tasks.analyze_tasks import analyze_resume_task

router = APIRouter()


@router.post("/", response_model=AnalyzeResponse, dependencies=[Depends(enforce_rate_limit)])
def analyze_resume(
    request: Request,
    resume: UploadFile = File(...),
    jd_text: str = Form(...),
):
    file_bytes = resume.file.read()
    return run_analysis_from_bytes(
        file_bytes=file_bytes,
        filename=resume.filename or "",
        content_type=resume.content_type,
        jd_text=jd_text,
    )


@router.post("/async", response_model=TaskQueuedResponse, dependencies=[Depends(enforce_rate_limit)])
def analyze_resume_async(
    request: Request,
    resume: UploadFile = File(...),
    jd_text: str = Form(...),
):
    file_bytes = resume.file.read()
    encoded_file = base64.b64encode(file_bytes).decode("utf-8")

    task = analyze_resume_task.delay(
        encoded_file,
        resume.filename or "",
        resume.content_type or "",
        jd_text,
    )
    return TaskQueuedResponse(task_id=task.id, status="queued")


@router.get("/tasks/{task_id}", response_model=TaskStatusResponse)
def get_task_status(task_id: str):
    result = AsyncResult(task_id, app=celery_app)

    if result.state == "SUCCESS":
        return TaskStatusResponse(
            task_id=task_id,
            status="SUCCESS",
            result=result.result,
        )

    if result.state in {"PENDING", "STARTED", "RETRY"}:
        return TaskStatusResponse(
            task_id=task_id,
            status=result.state,
            result=None,
        )

    return TaskStatusResponse(
        task_id=task_id,
        status="FAILURE",
        result=None,
    )