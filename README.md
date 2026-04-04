<div align="center">

# 🚀 AI Resume Matcher

### *AI-powered Resume-to-JD Matching Platform for Smarter Hiring & Better Applications*

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=24&pause=1000&color=6C63FF&center=true&vCenter=true&width=900&lines=FastAPI+%7C+SBERT+%7C+PostgreSQL+%7C+Redis+%7C+Next.js;Upload+Resume+%E2%86%92+Match+with+Job+Description+%E2%86%92+Get+AI+Insights;ATS+Score+%7C+Missing+Keywords+%7C+Suggestions+%7C+Async+Analysis" alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Next.js-000000?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/AI-SBERT-6C63FF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Vector%20DB-pgvector-5A67D8?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cache-Redis-DC382D?style=for-the-badge&logo=redis" />
  <img src="https://img.shields.io/badge/UI-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css" />
</p>

<p align="center">
  <a href="#-demo--preview"><img src="https://img.shields.io/badge/Live%20Demo-Add%20Link-6C63FF?style=flat-square" /></a>
  <a href="#-local-setup"><img src="https://img.shields.io/badge/Setup-Quick%20Start-00D4FF?style=flat-square" /></a>
  <a href="#-api-endpoints"><img src="https://img.shields.io/badge/API-Docs-111827?style=flat-square" /></a>
  <a href="#-future-roadmap"><img src="https://img.shields.io/badge/Roadmap-In%20Progress-22C55E?style=flat-square" /></a>
</p>

</div>

---

## ✨ Overview

**AI Resume Matcher** is a full-stack AI application that compares a candidate’s resume with a job description and returns meaningful hiring insights.

It helps users:
- upload a resume (`PDF` / `DOCX`)
- paste a target job description
- receive an **ATS-style match score**
- see **semantic similarity**
- identify **missing keywords**
- get **AI-generated improvement suggestions**

This project is built as a **production-style portfolio project** for **Python backend**, **AI/NLP**, and **full-stack developer** roles.

---

## 🎯 Problem It Solves

Recruiters and candidates often struggle with:
- understanding how well a resume matches a job description
- identifying skill gaps quickly
- improving resume quality before applying
- manually reviewing multiple resumes at scale

This platform solves that by combining **resume parsing**, **semantic similarity**, **keyword gap analysis**, and **AI suggestions** into one workflow.

---

## 🔥 Core Highlights

### Backend Highlights
- Resume parsing for `PDF` and `DOCX`
- SBERT embeddings for semantic matching
- ATS score generation
- Missing keyword detection
- AI suggestion generation
- Sync + async analysis support
- Redis-based rate limiting
- Celery task queue support
- Production-friendly FastAPI architecture

### Frontend Highlights
- Premium dark futuristic UI
- Landing page with marketing sections
- Resume upload + JD analysis flow
- Results page with score visualization
- Contact page
- Auth + dashboard UI screens
- Glassmorphism, gradients, animations, responsive design

---

## 🧠 Tech Stack

### Frontend
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Radix UI**
- **Lucide React**
- **Recharts**
- **Sonner**
- **next-themes**

### Backend
- **FastAPI**
- **Python**
- **Sentence Transformers (SBERT)**
- **spaCy / TF-IDF**
- **PostgreSQL + pgvector**
- **Redis**
- **Celery**
- **Pydantic**
- **Uvicorn**

---

## 🏗️ System Architecture

```text
User
  │
  ▼
Next.js Frontend
  │
  │  HTTP / FormData Requests
  ▼
FastAPI Backend
  │
  ├── Resume Validation
  ├── Resume Parsing (PDF/DOCX)
  ├── Keyword Extraction
  ├── Embedding Generation (SBERT)
  ├── Similarity Scoring
  ├── Suggestions Engine
  ├── Redis Rate Limiting / Cache
  └── Celery Async Processing
```

---

## 📂 Project Structure

```text
AI_Resume_Matcher/
│
├── api/
│   ├── app/
│   │   ├── core/              # config, validation, rate limit, redis
│   │   ├── db/                # DB setup and schema
│   │   ├── routers/           # FastAPI routes
│   │   ├── schemas/           # Pydantic models
│   │   ├── services/          # parser, embeddings, scoring, suggestions
│   │   ├── tasks/             # Celery tasks
│   │   └── main.py            # FastAPI entrypoint
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/               # routes/pages
│   │   ├── components/        # reusable UI components
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🧪 Core Workflow

```text
1. User uploads a resume
2. User pastes a job description
3. Frontend sends multipart request to backend
4. Backend validates file type and size
5. Resume text is extracted
6. JD + resume embeddings are generated
7. Cosine similarity is calculated
8. Score is normalized (0–100)
9. Missing keywords are identified
10. Suggestions are generated
11. Frontend renders the results page
```

---

## 🖼️ Demo / Preview

> Add your screenshots here after GitHub upload.

### Suggested screenshots to add
- Landing Page
- Analyze Page
- Results Page
- Contact Page
- Dashboard UI

Example markdown:

```md
![Landing Page](./screenshots/landing.png)
![Analyze Page](./screenshots/analyze.png)
![Results Page](./screenshots/results.png)
```

### Live Links
- **Frontend Demo:** `Add your Vercel frontend URL here`
- **Backend API:** `Add your backend API URL here`

---

## 📡 API Endpoints

### Health Check
```http
GET /health
```

**Response**
```json
{
  "status": "ok"
}
```

### Sync Analysis
```http
POST /analyze/
```

**Content-Type:** `multipart/form-data`

**Form Fields**
- `resume` → PDF/DOCX file
- `jd_text` → job description text

**Sample Response**
```json
{
  "score": 87,
  "similarity": 0.8473,
  "missing_keywords": ["react", "aws"],
  "suggestions": [
    "Add React project experience",
    "Mention AWS deployment work"
  ],
  "processing_time": 2.34
}
```

### Async Analysis
```http
POST /analyze/async
```

**Sample Response**
```json
{
  "task_id": "abc123",
  "status": "queued"
}
```

### Task Status
```http
GET /analyze/tasks/{task_id}
```

**Sample Response**
```json
{
  "task_id": "abc123",
  "status": "SUCCESS",
  "result": {
    "score": 87,
    "similarity": 0.8473,
    "missing_keywords": ["react", "aws"],
    "suggestions": ["Add React project experience"],
    "processing_time": 2.34
  }
}
```

---

## 🖥️ Frontend Pages

### Public Pages
- `/` → Landing page
- `/analyze` → Resume analysis page
- `/results` → Analysis results
- `/contact` → Contact page

### UI-Only Pages
- `/auth/signin`
- `/auth/signup`
- `/dashboard`
- `/dashboard/history`
- `/dashboard/profile`
- `/dashboard/upgrade`
- `/success`

> **Note:** Auth, billing, plan management, and dashboard data are currently UI-only unless connected to real backend APIs.

---

## ⚙️ Local Setup

### 1) Clone the repository
```bash
git clone <your-repo-url>
cd AI_Resume_Matcher
```

---

## Backend Setup

### 2) Create and activate virtual environment
```bash
python -m venv venv
```

**Windows**
```bash
venv\Scripts\activate
```

**macOS / Linux**
```bash
source venv/bin/activate
```

### 3) Install backend dependencies
```bash
pip install -r api/requirements.txt
```

### 4) Configure backend environment variables
Create a `.env` file if required.

```env
OPENAI_API_KEY=your_openai_key
DATABASE_URL=postgresql://user:password@localhost:5432/resume_matcher
REDIS_URL=redis://127.0.0.1:6379/0
MAX_CALLS_PER_HOUR=10
```

### 5) Run backend
From project root:
```bash
uvicorn api.app.main:app --reload
```

Or if you are inside `api/`:
```bash
uvicorn app.main:app --reload
```

Backend URL:
```text
http://127.0.0.1:8000
```

---

## Frontend Setup

### 6) Move to frontend folder
```bash
cd frontend
```

### 7) Install frontend dependencies
```bash
npm install
```

### 8) Create frontend env file
Create `.env.local` inside `frontend/`

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 9) Run frontend
```bash
npm run dev
```

Frontend URL:
```text
http://localhost:3000
```

---

## 🧪 Testing Checklist

### Manual Core Flow
- [ ] Start backend
- [ ] Start frontend
- [ ] Open `/analyze`
- [ ] Upload valid PDF/DOCX resume
- [ ] Paste job description
- [ ] Click Analyze
- [ ] Verify results page shows:
  - [ ] ATS Score
  - [ ] Similarity
  - [ ] Missing Keywords
  - [ ] Suggestions
  - [ ] Processing Time

### Validation Checks
- [ ] Wrong file type
- [ ] File size > 5MB
- [ ] Empty JD text
- [ ] Backend unavailable state
- [ ] Rate limit response

---

## 🔐 Current Limitations

- No real authentication backend yet
- No real payment/subscription integration yet
- No persistent scan history API yet
- Dashboard pages are currently UI-only
- Advanced SaaS flows are planned but not fully connected yet

---

## ✅ Current Status

### Completed
- [x] Backend analysis engine
- [x] Resume parser
- [x] Semantic similarity pipeline
- [x] Missing keyword extraction
- [x] Suggestions engine
- [x] Sync analysis API
- [x] Async analysis API
- [x] Landing page
- [x] Analyze page
- [x] Results page
- [x] Contact page
- [x] Auth/dashboard UI migration

### In Progress / Planned
- [ ] Real auth integration
- [ ] User scan history
- [ ] Razorpay subscription
- [ ] Plan-based usage limits
- [ ] Profile persistence
- [ ] Production deployment optimization

---

## 🌍 Deployment

### Frontend
- GitHub
- Vercel

### Backend
- Render / Railway / VPS
- PostgreSQL
- Redis
- Celery worker

### Suggested Production Stack
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** PostgreSQL
- **Cache / Queue:** Redis
- **Background Jobs:** Celery

---

## 📈 Future Roadmap

- Real user authentication
- Usage tracking per user
- Resume scan history dashboard
- Recruiter mode
- Better PDF/export support
- Email reports
- Subscription management
- Admin analytics
- Smarter scoring pipeline
- Better ATS explanation engine

---

## 💡 Why This Project Matters

This project demonstrates:
- real-world AI/NLP use case
- full-stack architecture
- backend API design
- embeddings + semantic matching
- frontend/backend integration
- async task processing
- production-style engineering approach

It is a strong portfolio project for:
- **Python Developer** roles
- **FastAPI Backend Developer** roles
- **AI / NLP Engineer** roles
- **Full Stack Developer** roles

---

## 👨‍💻 Author

**Akash Yadav**

- Python Developer
- FastAPI / Next.js Builder
- AI Project Developer

> Add your GitHub, LinkedIn, and portfolio links here.

Example:

```md
- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile
- Portfolio: https://yourportfolio.com
```

---

## 📄 License

This project is built for **portfolio, learning, and product development** purposes.

---

<div align="center">

### ⭐ If you like this project, consider giving it a star on GitHub!

</div>
