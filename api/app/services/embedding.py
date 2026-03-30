from sentence_transformers import SentenceTransformer
from app.core.config import settings

model = SentenceTransformer(settings.MODEL_NAME)

def get_embedding(text: str):
    return model.encode(text).tolist()

def get_embedding_dimension() -> int:
    return len(model.encode("test sentence"))