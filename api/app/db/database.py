import os
import psycopg
from dotenv import load_dotenv

load_dotenv("api/.env")

DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    return psycopg.connect(DATABASE_URL)