CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS analyses (
    id BIGSERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    resume_text TEXT NOT NULL,
    jd_text TEXT NOT NULL,
    score INT NOT NULL,
    similarity DOUBLE PRECISION NOT NULL,
    missing_keywords JSONB NOT NULL,
    suggestions JSONB NOT NULL,
    processing_time DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);