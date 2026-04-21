from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "ai_resume_screener",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="Asia/Kolkata",
    task_track_started=True,
    # ✅ YE ADD KARO — HF Spaces pe sync mode mein chalega
    task_always_eager=settings.CELERY_TASK_ALWAYS_EAGER,
    task_eager_propagates=True,  # errors properly raise honge eager mode mein
)