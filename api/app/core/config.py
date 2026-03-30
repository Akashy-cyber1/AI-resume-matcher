import os
from dotenv import load_dotenv

load_dotenv("api/.env")

class Settings:
    APP_NAME = os.getenv("APP_NAME", "AI Resume Matcher API")
    DEBUG = os.getenv("DEBUG", "false").lower() == "true"
    DATABASE_URL = os.getenv("DATABASE_URL")
    MODEL_NAME = os.getenv("MODEL_NAME", "all-MiniLM-L6-v2")

settings = Settings()