'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import { runResumeAnalysis } from '@/services/analyze.service'
import { getMaxJobDescriptionLength, validateJobDescription, validateResumeFile } from '@/lib/validations'
import { ApiError } from '@/lib/api'
import { Cloud, FileText, X, Upload, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'

export default function AnalyzePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const maxJDLength = getMaxJobDescriptionLength()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setApiError(null)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      const error = validateResumeFile(droppedFile)
      if (error) {
        setFileError(error)
        setFile(null)
      } else {
        setFileError(null)
        setFile(droppedFile)
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiError(null)
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const error = validateResumeFile(selectedFile)
      if (error) {
        setFileError(error)
        setFile(null)
      } else {
        setFileError(null)
        setFile(selectedFile)
      }
    }
  }

  const removeFile = () => {
    setFile(null)
    setFileError(null)
    setApiError(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleAnalyze = async () => {
    if (!file || !jobDescription.trim()) return

    const jdError = validateJobDescription(jobDescription)
    if (jdError) {
      setApiError(jdError)
      return
    }

    setIsAnalyzing(true)
    setApiError(null)

    try {
      const result = await runResumeAnalysis(file, jobDescription.trim())

      const query = new URLSearchParams({
        score: String(result.score),
        similarity: String(result.similarity),
        processing_time: String(result.processing_time),
        missing_keywords: JSON.stringify(result.missing_keywords),
        suggestions: JSON.stringify(result.suggestions),
      })

      router.push(`/results?${query.toString()}`)
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message)
      } else {
        setApiError('Unable to analyze resume right now. Please try again.')
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  const jdValidationError = validateJobDescription(jobDescription)
  const canAnalyze = file && !fileError && !jdValidationError && !isAnalyzing

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#F0F0FF] mb-4">
              Analyze Your Resume
            </h1>
            <p className="text-[#8888AA] text-lg max-w-2xl mx-auto">
              Upload your resume and paste the job description to get your ATS score
            </p>
          </div>

          {/* Scans Remaining Banner */}
          <div className="glass-card rounded-xl p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#00E676]" />
              <span className="text-sm text-[#F0F0FF]">2 free scans remaining this month</span>
            </div>
            <button className="text-sm text-[#6C63FF] hover:text-[#00D4FF] transition-colors">
              Upgrade for unlimited
            </button>
          </div>

          {/* Two Panel Layout */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Left Panel - File Upload */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#F0F0FF] mb-4">
                Upload Resume
              </h3>

              {!file ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-[#6C63FF] bg-[#6C63FF]/10'
                      : fileError
                        ? 'border-[#FF4B4B] bg-[#FF4B4B]/5'
                        : 'border-[rgba(255,255,255,0.15)] hover:border-[#6C63FF]/50 hover:bg-[rgba(255,255,255,0.02)]'
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Cloud className={`w-12 h-12 mx-auto mb-4 ${fileError ? 'text-[#FF4B4B]' : 'text-[#6C63FF]'}`} />
                  <p className="text-[#F0F0FF] font-medium mb-2">
                    Drag & drop your resume here
                  </p>
                  <p className="text-sm text-[#8888AA] mb-4">
                    or click to browse
                  </p>
                  <p className="text-xs text-[#8888AA]">
                    PDF or DOCX · Max 5MB
                  </p>
                </div>
              ) : (
                <div className="border border-[rgba(255,255,255,0.08)] rounded-xl p-4 bg-[#111118]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#6C63FF]/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#6C63FF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F0F0FF] font-medium truncate">{file.name}</p>
                      <p className="text-sm text-[#8888AA]">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[#8888AA] hover:text-[#FF4B4B] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {fileError && (
                <div className="mt-4 flex items-center gap-2 text-[#FF4B4B] text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {fileError}
                </div>
              )}
            </div>

            {/* Right Panel - Job Description */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#F0F0FF]">
                  Job Description
                </h3>
                <span className="text-sm text-[#8888AA]">
                  {jobDescription.length}/{maxJDLength}
                </span>
              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => {
                  setApiError(null)
                  setJobDescription(e.target.value.slice(0, maxJDLength))
                }}
                placeholder="Paste the job description here..."
                className="w-full h-64 bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-[#F0F0FF] placeholder:text-[#8888AA] resize-none focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
            </div>
          </div>

          {apiError && (
            <div className="mb-6 flex items-center gap-2 text-[#FF4B4B] text-sm">
              <AlertCircle className="w-4 h-4" />
              {apiError}
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className={`w-full py-5 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 transition-all ${canAnalyze
              ? 'gradient-button text-white'
              : 'bg-[#111118] text-[#8888AA] cursor-not-allowed'
              }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing your resume...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Analyze Match
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Loading State */}
          {isAnalyzing && (
            <div className="mt-6">
              <div className="h-1 bg-[#111118] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] animate-shimmer" style={{ width: '100%' }} />
              </div>
              <p className="text-center text-sm text-[#8888AA] mt-3">
                Scanning keywords and calculating ATS compatibility...
              </p>
            </div>
          )}
        </div>
      </div>

      <CTASection />
      <Footer />
    </main>
  )
}
