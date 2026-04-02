export interface AnalyzeResponse {
  score: number
  similarity: number
  missing_keywords: string[]
  suggestions: string[]
  processing_time: number
}
