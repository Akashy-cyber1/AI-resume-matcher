import re
from sklearn.feature_extraction.text import TfidfVectorizer

CUSTOM_STOP_WORDS = {
    "candidate", "able", "experience", "looking", "need", "must",
    "should", "developer", "build", "services", "service", "role",
    "work", "working", "strong", "skills", "skill", "team"
}

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9+#.\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def extract_keywords_tfidf(texts, top_k=20):
    vectorizer = TfidfVectorizer(
        stop_words=list(CUSTOM_STOP_WORDS),
        ngram_range=(1, 1),
        max_features=100
    )

    matrix = vectorizer.fit_transform([clean_text(t) for t in texts])
    features = vectorizer.get_feature_names_out()

    all_keywords = []
    for row in matrix:
        scores = row.toarray().flatten()
        pairs = sorted(zip(features, scores), key=lambda x: x[1], reverse=True)
        keywords = [word for word, score in pairs[:top_k] if score > 0]
        all_keywords.append(keywords)

    return all_keywords

def get_missing_keywords(resume_text: str, jd_text: str):
    resume_keywords, jd_keywords = extract_keywords_tfidf([resume_text, jd_text], top_k=25)

    missing = []
    for kw in jd_keywords:
        if kw not in resume_keywords and len(kw) > 2:
            missing.append(kw)

    return {
        "resume_keywords": resume_keywords,
        "jd_keywords": jd_keywords,
        "missing_keywords": missing
    }