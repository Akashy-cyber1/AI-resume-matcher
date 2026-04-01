# Frontend Integration Guide for AI Resume Matcher Backend

## 1. Project Overview

This backend powers a basic AI Resume Screener tool. Users upload a PDF/DOCX resume and paste a job description (JD), receiving an ATS match score (0-100), semantic similarity, missing JD keywords, and 5 AI-powered suggestions for improvement.

**Main Workflow**:
1. User uploads resume (PDF/DOCX, <=5MB) + JD text.
2. Backend validates, parses resume text (PyMuPDF/docx), extracts TFIDF keywords.
3. Computes embeddings (all-MiniLM-L6-v2), cosine similarity -> normalized score.
4. Identifies missing keywords (JD keywords not in resume).
5. Generates suggestions (OpenAI gpt-3.5-turbo or fallback static).
6. Returns results sync or async (Celery/Redis).

**Frontend Modules Needed** (based on backend):
- Landing/Analyze page: upload, JD textarea, analyze button (sync/async toggle).
- Results page/section: score gauge, similarity bar, missing keywords chips, suggestions list, processing time.
- Rate limit notice (429 handling).
- Health check for loading indicator.

No dashboard/history/pricing/profile - backend lacks these.

## 2. Backend Architecture Summary

- **Framework**: FastAPI 0.135.2
- **Async Processing**: Celery 5.6.3 + Redis broker/backend
- **DB**: PostgreSQL (psycopg 3.3.3) with pgvector extension. Table `analyses` schema exists but **not used** in code (no CRUD ops).
- **Embeddings**: sentence-transformers all-MiniLM-L6-v2
- **AI**: OpenAI gpt-3.5-turbo (optional, fallback to static).
- **Structure**:
  | Folder | Contents |
  |--------|----------|
  | `api/app/core/` | config.py (Settings), rate_limit.py (IP 10/hr), validation.py (file), redis_client.py |
  | `api/app/db/` | database.py (psycopg conn), schema.sql (unused analyses table) |
  | `api/app/routers/` | analyze.py (only router) |
  | `api/app/schemas/` | analyze.py (Pydantic AnalyzeResponse etc.) |
  | `api/app/services/` | analyze_service.py (main logic), embedding.py, keywords.py (TFIDF), parser.py, scoring.py (cosine), openai_suggestions.py, suggestions.py (fallback) |
  | `api/app/tasks/` | analyze_tasks.py (Celery task) |
- **Entrypoint**: `api/app/main.py` mounts /analyze router.
- Run: `uvicorn api.app.main:app --reload`

## 3. Authentication Flow

**Not found in backend.** No authentication system implemented.

- No login/signup endpoints.
- No JWT/session/OAuth.
- No user models/schemas.
- All endpoints public (only IP rate limiting).
- **Frontend Recommendation**: Treat as public tool. Add frontend auth later (e.g., Clerk/Supabase) or IP rate limit UX. No tokens/headers needed now.
- Protected routes: None.
- Error responses: None auth-related.

## 4. User Model & Account Data

**Not found in backend.** No user models, profile, plan/scan_count.

- No user fields returned anywhere.
- **Frontend**: No profile data. Mock or frontend-only state for demo.

## 5. Complete API Endpoint Inventory

All public, IP rate-limited (10/hr default), CORS localhost:3000/5173.

| Method | Path | Purpose | Req Content-Type | Req Body/Query/Path | Headers | Response | Frontend Use |
|--------|------|---------|------------------|---------------------|---------|----------|--------------|
| GET | /health | Liveness | - | - | - | `{"status": "ok"}` | App init/loading |
| POST | /analyze/ | Sync analysis | multipart/form-data | UploadFile `resume` (PDF/DOCX <=5MB), Form `jd_text` (str) | - | 200: AnalyzeResponse<br>400/413/429/500: `{"detail": str}` | Analyze page main action |
| POST | /analyze/async | Queue async | multipart/form-data | Same as above | - | 200: TaskQueuedResponse<br>429 etc. | Async mode button |
| GET | /analyze/tasks/{task_id} | Poll task | - | Path: task_id (str) | - | 200: TaskStatusResponse (status: SUCCESS/PENDING/STARTED/RETRY/FAILURE, result?) | Results polling (every 1-2s) |

**Validation**: PDF/DOCX only, filename req, size/content-type checks.
**Examples**:
- Success sync: See #7.
- Error: `{"detail": "Only PDF and DOCX files are allowed."}` (400)

## 6. Resume Analysis Workflow

**Sync (/analyze/)**:
1. Upload resume (PDF/DOCX <=5MB) + jd_text.
2. Validate ext/size/type/filename.
3. Temp file write, parse text (PyMuPDF/docx).
4. TFIDF keywords (resume vs JD), missing = JD kws not in resume (>2 chars).
5. Embeddings (MiniLM), cosine sim (-1..1) -> score = clamp(round(sim*100),0,100).
6. AI suggestions (OpenAI prompt w/ compact resume/JD/kws, parse JSON/lines, cache Redis) or fallback.
7. Limit missing_keywords[:15], suggestions[:5].
8. Return w/ processing_time (~seconds).

**Async (/async + poll)**: Same, but Celery task (base64 file), poll status/result.

**File**: PDF/DOCX, .pdf/.docx mime, <=5MB.
**Failures**: Empty text, parse fail, embedding fail -> 400/500.
**Frontend Loading**: Sync: spinner ~5-10s. Async: queue immediate, poll till SUCCESS.

## 7. Response Data Contracts

**AnalyzeResponse** (exact keys, no nulls except arrays possible empty but min_length=1 for suggestions):
```typescript
interface AnalyzeResponse {
  score: number; // 0-100 int
  similarity: number; // -1.0 to 1.0, 4 decimals e.g. 0.8473
  missing_keywords: string[]; // 0-15 strings, e.g. ["react", "aws"]
  suggestions: string[]; // 1-5 strings, e.g. ["Add React project experience"]
  processing_time: number; // >0 float, seconds e.g. 2.34
}
```

**TaskQueuedResponse**:
```typescript
{
  task_id: string; // Celery UUID e.g. "abc-123-def"
  status: "queued";
}
```

**TaskStatusResponse**:
```typescript
{
  task_id: string;
  status: "PENDING" | "STARTED" | "RETRY" | "SUCCESS" | "FAILURE";
  result: AnalyzeResponse | null; // null unless SUCCESS
}
```

Health: `{status: "ok"}`

## 8. Error Handling Map

| Code | detail Example | Frontend UX |
|------|----------------|-------------|
| 400 | "Only PDF and DOCX files are allowed." / "Resume filename is missing." / "Could not parse..." / "Resume text extraction returned empty content." | Alert: Invalid file. Show accepted types/size. |
| 413 | "File too large. Maximum allowed size is 5MB." | Alert: File too big (5MB max). |
| 429 | "Rate limit exceeded. Try again after 1800 seconds." | Banner: Free limit (10/hr IP). Wait/refresh page. Upsell mock. |
| 500 | "Internal server error" / "Embedding pipeline failed." | Retry button, "Server busy. Try again." |
| N/A | Auth/payment: none | - |

Generic `{detail: str}`. Parse ttl in 429 for countdown.

## 9. Free Plan / Usage Limit Logic

**IP-based rate limit** (not user):
- 10 calls/hour default (`MAX_CALLS_PER_HOUR=10`).
- Redis key `rate_limit:IP`, incr/expire 3600s.
- Exceed -> 429 w/ ttl seconds.
- No monthly reset, no scan_count/usage returned.
- **Frontend**: Show mock "X/10 scans left" or IP warning. Refetch on 429.

## 10. Subscription / Payment Workflow

**Not found in backend.** No Razorpay/Stripe/plans/upgrade.
- No payment endpoints/webhooks.
- **Frontend**: Mock pricing page. Needs backend addition.

## 11. Scan History / Dashboard Workflow

**Not found in backend.** No list/detail/paginate.
- `analyses` table schema exists (JSONB results) but **unused** (no insert/query).
- **Frontend**: LocalStorage history or mock.

## 12. Profile / Settings Workflow

**Not found in backend.** No profile/update/plan.
- **Frontend**: Static or mock profile.

## 13. Frontend Page Mapping

| Page | Status | APIs | Data Needed |
|------|--------|------|-------------|
| Landing | Public | /health | None |
| Analyze | Public | POST /analyze/, /async | Resume file, JD text |
| Results | Public | GET /tasks/{id} (async) | Poll till result |
| Pricing | Mock | None | Static |
| Dashboard/History | Mock | None | Local mock |
| Profile | Mock | None | - |

## 14. Frontend Component Mapping

- **UploadBox**: Drag/drop + file picker (PDF/DOCX), size check, preview filename.
- **JDTextarea**: 1000+ chars, placeholder "Paste job desc...".
- **AnalyzeButton**: Sync/Async toggle, loading spinner.
- **ScoreCard**: Big 0-100 gauge (green>80, yellow 50-80, red<50).
- **SimilarityBar**: Progress -1..1 (0 center).
- **MissingKeywordsChips**: Red chips/tags scrollable.
- **SuggestionsAccordion/List**: 5 bullet improvements.
- **ProcessingTime**: "Analyzed in 2.3s".
- **RateLimitBanner**: Countdown on 429.
- **HealthLoader**: Initial check.

## 15. Frontend State Management Notes

(Zustand/Redux simple):
- `uploadState`: file, jd_text, validating.
- `analysisState`: loading(s/running/task_id), result(AnalyzeResponse|null), error.
- `pollInterval`: useEffect for async.
- Cache: localStorage last result (24h).
- No auth/user state needed.

Refetch: Always on submit (no cache beyond OpenAI internal).

## 16. Environment Variables Needed for Frontend

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000  # uvicorn default
# No API keys needed (public)
# Payments: none
```

## 17. CORS / CSRF / Headers / Content-Type Notes

- **CORS**: allow_origins=["http://localhost:3000","http://localhost:5173"], credentials=true, methods/headers=*.
- **Content-Type**: multipart/form-data for POST analyze (FormData.append('resume', file), 'jd_text', text).
- **No CSRF** (stateless API).
- **No auth headers** (public).
- **Axios/Fetch**: Default ok, with credentials:'include' if needed later.

## 18. Frontend Build Order Recommendation

**Phase 1: Core Analysis (exists)**
- Landing + /health check.
- Upload/JD form + POST /analyze/ sync.

**Phase 2: Polish Sync**
- Results UI (score/chips/suggestions).
- Error handling (400/413/429).
- Rate limit UX.

**Phase 3: Async (ready)**
- Async toggle + polling /tasks/{id}.

**Phase 4: Optimizations (mockable)**
- File validation client-side.
- Loading skeletons.

**Phase 5-6: SaaS Features (backend missing)**
- Mock auth/pricing/history after backend adds.

## 19. Missing or Risky Areas

**Backend Gaps / Ambiguities Before Frontend**:
- No authentication/users/plans/subscriptions/payments/history.
- `analyses` table schema but no code uses it (risk: future insert? No history API).
- Rate limit IP-only (not user-usage; changes break "free plan").
- No paginated history despite table.
- OpenAI optional (fallback works).
- No query params/filters.
- DB conn but unused (conn string req).
- Risky: Large resumes (embeddings heavy, no timeout shown).

**Immediate Blocks**: None - core analysis works standalone.

## 20. Final Frontend Checklist

**✅ Can Build Immediately (Production-Ready)**:
- [ ] Landing/Analyze form (multipart POST /analyze/).
- [ ] Sync results UI.
- [ ] Async polling.
- [ ] Error banners (file/rate).
- [ ] Client-side PDF/DOCX/5MB validation.

**❓ Needs Clarification**:
- [ ] Production base URL/CORS origins.

**🚧 Mock Temporarily**:
- [ ] Auth/login.
- [ ] Pricing/upgrade.
- [ ] User dashboard/history (localStorage).
- [ ] Profile/usage cards.

**Core MVP deployable in 1-2 days. SaaS features need backend first.**

