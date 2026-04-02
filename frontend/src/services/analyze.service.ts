import { analyzeResume, analyzeResumeAsync, getAnalyzeTaskStatus, healthCheck } from '@/lib/api'
import type { AnalyzeResponse } from '@/types/analyze'
import type { TaskQueuedResponse, TaskStatusResponse } from '@/types/task'

export async function checkBackendHealth(): Promise<{ status: string }> {
  return healthCheck()
}

export async function runResumeAnalysis(resume: File, jdText: string): Promise<AnalyzeResponse> {
  return analyzeResume(resume, jdText)
}

export async function queueResumeAnalysis(resume: File, jdText: string): Promise<TaskQueuedResponse> {
  return analyzeResumeAsync(resume, jdText)
}

export async function getResumeAnalysisTaskStatus(taskId: string): Promise<TaskStatusResponse> {
  return getAnalyzeTaskStatus(taskId)
}
