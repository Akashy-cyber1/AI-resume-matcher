import sys
from pathlib import Path

API_ROOT = Path(__file__).resolve().parents[2]
sys.path.append(str(API_ROOT))

from app.services.embedding import get_embedding, get_embedding_dimension

text = "Python Django FastAPI PostgreSQL machine learning"
embedding = get_embedding(text)

print("Dimension:", get_embedding_dimension())
print("First 10 values:", embedding[:10])