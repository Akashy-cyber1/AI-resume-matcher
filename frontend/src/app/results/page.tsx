'use client'

import { Suspense, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import { ScoreRing } from '@/components/score-ring'
import { Check, X, Lightbulb, Zap, RefreshCw, Clock3 } from 'lucide-react'

type ParsedSuggestion = {
  id: number
  title: string
  description: string
  impact?: string
}

function parseNumber(value: string | null, fallback = 0) {
  if (!value) return fallback
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

function clampPercent(value: number) {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(100, Math.round(value)))
}

function parseListParam(value: string | null): string[] {
  if (!value) return []
  const trimmed = value.trim()
  if (!trimmed) return []

  try {
    const parsed = JSON.parse(trimmed)
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => String(item).trim())
        .filter(Boolean)
    }
  } catch {
    // Fall through to delimiter parsing
  }

  return trimmed
    .split(/[,\n|]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseSuggestionsParam(value: string | null): ParsedSuggestion[] {
  if (!value) return []

  const toSuggestion = (item: unknown, index: number): ParsedSuggestion | null => {
    if (typeof item === 'string') {
      const title = item.trim()
      if (!title) return null
      return {
        id: index + 1,
        title,
        description: 'Add this recommendation to improve your ATS match.',
      }
    }

    if (item && typeof item === 'object') {
      const rec = item as Record<string, unknown>
      const title = String(rec.title ?? rec.name ?? rec.heading ?? '').trim()
      const description = String(rec.description ?? rec.details ?? rec.reason ?? '').trim()
      const impactRaw = rec.impact ?? rec.score_impact ?? rec.expected_gain
      const impact =
        impactRaw !== undefined && impactRaw !== null ? String(impactRaw).trim() : undefined

      if (!title && !description) return null
      return {
        id: index + 1,
        title: title || `Suggestion ${index + 1}`,
        description: description || 'Consider this recommendation to improve your ATS score.',
        impact: impact || undefined,
      }
    }

    return null
  }

  const trimmed = value.trim()
  if (!trimmed) return []

  try {
    const parsed = JSON.parse(trimmed)
    if (Array.isArray(parsed)) {
      return parsed
        .map((item, index) => toSuggestion(item, index))
        .filter((item): item is ParsedSuggestion => item !== null)
    }
  } catch {
    // Fall through to delimiter parsing
  }

  return trimmed
    .split(/[|\n]/)
    .map((item, index) => toSuggestion(item, index))
    .filter((item): item is ParsedSuggestion => item !== null)
}

function getScoreCategory(score: number) {
  if (score >= 85) return { label: 'Excellent', color: 'text-[#00E676]' }
  if (score >= 70) return { label: 'Good', color: 'text-[#00D4FF]' }
  if (score >= 50) return { label: 'Fair', color: 'text-[#FF9800]' }
  return { label: 'Needs Work', color: 'text-[#FF4B4B]' }
}

function ResultsContent() {
  const searchParams = useSearchParams()

  const data = useMemo(() => {
    const score = clampPercent(parseNumber(searchParams.get('score'), 0))
    const similarity = clampPercent(parseNumber(searchParams.get('similarity'), score))
    const processingTime = parseNumber(searchParams.get('processing_time'), 0)

    const missingKeywords = parseListParam(searchParams.get('missing_keywords'))
    const suggestions = parseSuggestionsParam(searchParams.get('suggestions'))

    const suggestionCount = suggestions.length
    const missingCount = missingKeywords.length
    const matchedApprox = Math.max(0, Math.round((score / 100) * (missingCount + 10)) - missingCount)

    return {
      score,
      similarity,
      processingTime,
      missingKeywords,
      suggestions,
      missingCount,
      suggestionCount,
      matchedApprox,
    }
  }, [searchParams])

  const category = getScoreCategory(data.score)

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <ScoreRing score={data.score} size={200} strokeWidth={16} />
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#F0F0FF] mb-2">
                  Your ATS Score
                </h1>
                <p className={`text-xl font-semibold ${category.color} mb-4`}>{category.label}</p>
                <p className="text-[#8888AA] mb-6">
                  Resume similarity match: <span className="text-[#F0F0FF]">{data.similarity}%</span>
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/30">
                    <Check className="w-4 h-4 text-[#00E676]" />
                    <span className="text-sm text-[#F0F0FF]">{data.matchedApprox} Matched</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF4B4B]/10 border border-[#FF4B4B]/30">
                    <X className="w-4 h-4 text-[#FF4B4B]" />
                    <span className="text-sm text-[#F0F0FF]">{data.missingCount} Missing</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/30">
                    <Lightbulb className="w-4 h-4 text-[#6C63FF]" />
                    <span className="text-sm text-[#F0F0FF]">{data.suggestionCount} Suggestions</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30">
                    <Zap className="w-4 h-4 text-[#00D4FF]" />
                    <span className="text-sm text-[#F0F0FF]">ATS Compatible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 mb-8">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#F0F0FF] mb-6">
              Analysis Summary
            </h3>

            <div className="space-y-4">
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#F0F0FF]">ATS Score</span>
                  <span className="text-sm font-semibold text-[#00D4FF]">{data.score}%</span>
                </div>
                <div className="h-3 bg-[#111118] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] rounded-full transition-all duration-1000"
                    style={{ width: `${data.score}%` }}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#8888AA]">Similarity</span>
                  <span className="text-sm text-[#8888AA]">{data.similarity}%</span>
                </div>
                <div className="h-3 bg-[#111118] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8888AA]/40 rounded-full transition-all duration-1000"
                    style={{ width: `${data.similarity}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/30">
              <div className="flex items-start gap-3">
                <Clock3 className="w-5 h-5 text-[#6C63FF] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#F0F0FF]">
                  Processing time:{' '}
                  <span className="font-semibold">
                    {data.processingTime > 0 ? `${data.processingTime.toFixed(2)}s` : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#F0F0FF] mb-4 flex items-center gap-2">
                <X className="w-5 h-5 text-[#FF4B4B]" />
                Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.missingKeywords.length > 0 ? (
                  data.missingKeywords.map((keyword, index) => (
                    <span
                      key={`${keyword}-${index}`}
                      className="chip-error px-3 py-1.5 rounded-full text-sm animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                      title="Add this to your resume"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p className="text-[#8888AA] text-sm">No missing keywords provided in result.</p>
                )}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#F0F0FF] mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#6C63FF]" />
                Suggestions
              </h3>
              <div className="space-y-3">
                {data.suggestions.length > 0 ? (
                  data.suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.id}
                      className="border-l-2 border-[#6C63FF] bg-[#111118] rounded-r-xl p-4 animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <p className="text-[#F0F0FF] font-medium">{suggestion.title}</p>
                        {suggestion.impact ? (
                          <span className="text-xs text-[#00E676] font-semibold whitespace-nowrap">
                            {suggestion.impact}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[#8888AA] text-sm leading-relaxed">{suggestion.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#8888AA] text-sm">No suggestions provided in result.</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/analyze" className="flex-1">
              <button className="w-full py-4 rounded-xl font-semibold gradient-button text-white flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Analyze Another
              </button>
            </Link>
          </div>
        </div>
      </div>

      <CTASection />
      <Footer />
    </main>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0F]" />}>
      <ResultsContent />
    </Suspense>
  )
}
