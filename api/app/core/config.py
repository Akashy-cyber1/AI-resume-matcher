import os
from dotenv import load_dotenv

load_dotenv("api/.env")


def _csv_env(name: str, default: str = "") -> list[str]:
    raw = os.getenv(name, default)
    return [item.strip() for item in raw.split(",") if item.strip()]


class Settings:
    APP_NAME = os.getenv("APP_NAME", "AI Resume Screener API")
    DEBUG = os.getenv("DEBUG", "false").lower() == "true"

    DATABASE_URL = os.getenv("DATABASE_URL", "")
    REDIS_URL = os.getenv("REDIS_URL", "redis://127.0.0.1:6379/0")

    MODEL_NAME = os.getenv("MODEL_NAME", "all-MiniLM-L6-v2")

    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
    OPENAI_API_STYLE = os.getenv("OPENAI_API_STYLE", "chat_completions")
    OPENAI_TIMEOUT_SECONDS = int(os.getenv("OPENAI_TIMEOUT_SECONDS", "12"))

    MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", "5"))
    MAX_CALLS_PER_HOUR = int(os.getenv("MAX_CALLS_PER_HOUR", "10"))
    CACHE_TTL_SECONDS = int(os.getenv("CACHE_TTL_SECONDS", "3600"))

    CORS_ORIGINS = _csv_env(
        "CORS_ORIGINS",
        "http://localhost:3000,http://localhost:5173",
    )


settings = Settings()