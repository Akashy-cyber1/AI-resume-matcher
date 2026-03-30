import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "api"))

from app.services.embedding import get_embedding
from app.services.scoring import cosine_similarity_score, normalize_score

resume = "Python Django FastAPI PostgreSQL REST API developer"
jd = "We need a backend developer with FastAPI PostgreSQL and API experience"

r = get_embedding(resume)
j = get_embedding(jd)

sim = cosine_similarity_score(r, j)
score = normalize_score(sim)

print("Similarity:", sim)
print("Score:", score)