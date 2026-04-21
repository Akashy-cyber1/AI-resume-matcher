FROM python:3.11-slim

# ─── System dependencies ───────────────────────────────────────
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# ─── Non-root user ────────────────────────────────────────────
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app

# ─── Cache dirs → /tmp ────────────────────────────────────────
ENV TRANSFORMERS_CACHE=/tmp/hf_cache
ENV SENTENCE_TRANSFORMERS_HOME=/tmp/st_cache
ENV HF_HOME=/tmp/hf_home
ENV TORCH_HOME=/tmp/torch_cache
ENV XDG_CACHE_HOME=/tmp/cache

# ─── Install dependencies ─────────────────────────────────────
COPY --chown=user requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ─── spaCy model ──────────────────────────────────────────────
RUN python -m spacy download en_core_web_sm

# ─── App code ─────────────────────────────────────────────────
COPY --chown=user . /app

# ─── Port ─────────────────────────────────────────────────────
EXPOSE 7860

# ──────────────────────────────────────────────────────────────
# ✅ YAHAN ADD KARO — Schema apply + server start
# ──────────────────────────────────────────────────────────────
CMD ["sh", "-c", "python -c \"import psycopg, os; conn = psycopg.connect(os.getenv('DATABASE_URL')); conn.autocommit = True; conn.execute(open('app/db/schema.sql').read()); conn.close(); print('Schema OK')\" && uvicorn app.main:app --host 0.0.0.0 --port 7860"]