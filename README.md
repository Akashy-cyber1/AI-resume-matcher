# AI Resume Matcher

An AI-powered backend system that analyzes how well a resume matches a job description using **semantic similarity**, **keyword gap analysis**, and **smart improvement suggestions**.

---

## Overview

**AI Resume Matcher** is a backend AI project built to solve a real hiring problem:  
**How can we quickly understand whether a candidate’s resume fits a specific job description?**

This system accepts:

- a **resume file** (`PDF`, `DOCX`, or `TXT`)
- a **job description text**

and returns:

- **match score**
- **semantic similarity**
- **missing keywords**
- **resume improvement suggestions**
- **processing time**

This project is designed as the **core AI engine** of a resume screening platform.

---

## Key Features

- Resume parsing from **PDF**, **DOCX**, and **TXT**
- Job Description text analysis
- **Semantic matching** using SBERT embeddings
- **Match score** generation on a `0–100` scale
- **Missing keyword detection**
- Smart suggestions to improve resume relevance
- Fast backend API with **FastAPI**
- Interactive API testing with **Swagger UI**

---

## Why This Project Matters

Recruiters and hiring teams often receive hundreds of resumes for a single role.  
Most traditional screening systems rely only on keyword matching, which misses real semantic meaning.

This project improves that by combining:

- **AI-based semantic similarity**
- **keyword gap analysis**
- **resume optimization suggestions**

It can be extended into a full hiring product with:

- authentication
- recruiter dashboard
- resume history
- job matching analytics
- ATS-style scoring
- candidate recommendations

---

## Tech Stack

### Backend
- **Python**
- **FastAPI**
- **Uvicorn**
- **Pydantic**
- **python-dotenv**

### AI / NLP
- **Sentence Transformers (SBERT)**
- **scikit-learn (TF-IDF)**
- **spaCy** *(planned / optional improvement)*

### File Parsing
- **PyMuPDF** for PDF parsing
- **python-docx** for DOCX parsing

### Database
- **PostgreSQL**
- **pgvector**

### Testing
- **Swagger UI**
- **Postman**
- **Pytest** *(planned)*

---

## Current Phase

### Phase 1: Backend Core AI Engine
This repository currently focuses on the **backend API only**.

### Implemented Scope
- Resume file upload
- Resume text extraction
- JD text input
- Embedding generation
- Cosine similarity scoring
- Missing keyword extraction
- Suggestion generation
- `/analyze` endpoint

### Not Included Yet
- Frontend UI
- Authentication
- Payments
- Recruiter dashboard
- Candidate management

---

## Project Structure

```bash
AI-resume-matcher/
│
├── api/
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── db/
│   │   │   ├── database.py
│   │   │   └── schema.sql
│   │   ├── routers/
│   │   │   └── analyze.py
│   │   ├── services/
│   │   │   ├── parser.py
│   │   │   ├── embedding.py
│   │   │   ├── scoring.py
│   │   │   ├── keywords.py
│   │   │   └── suggestions.py
│   │   └── schemas/
│   │
│   └── .env
│
├── scripts/
├── tests/
├── requirements.txt
├── .gitignore
└── README.md
