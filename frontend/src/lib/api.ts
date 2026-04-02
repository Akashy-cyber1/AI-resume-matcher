import type { AnalyzeResponse } from '@/types/analyze'
import type { TaskQueuedResponse, TaskStatusResponse } from '@/types/task'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new ApiError('NEXT_PUBLIC_API_BASE_URL is not configured', 500)
  }

  return API_BASE_URL.replace(/\/+$/, '')
}

async function parseApiError(response: Response): Promise<never> {
  let message = 'Request failed'

  try {
    const data = await response.json()
    if (typeof data?.detail === 'string') {
      message = data.detail
    } else if (Array.isArray(data?.detail)) {
      message = data.detail.map((item: { msg?: string }) => item.msg).filter(Boolean).join(', ') || message
    } else if (typeof data?.message === 'string') {
      message = data.message
    }
  } catch {
    // ignore json parse failures
  }

  throw new ApiError(message, response.status)
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl()
  const response = await fetch(`${baseUrl}${path}`, init)

  if (!response.ok) {
    await parseApiError(response)
  }

  return response.json() as Promise<T>
}

export async function healthCheck(): Promise<{ status: string }> {
  return request<{ status: string }>('/health', { method: 'GET' })
}

export async function analyzeResume(resume: File, jdText: string): Promise<AnalyzeResponse> {
  const formData = new FormData()
  formData.append('resume', resume)
  formData.append('jd_text', jdText)

  return request<AnalyzeResponse>('/analyze/', {
    method: 'POST',
    body: formData,
  })
}

export async function analyzeResumeAsync(resume: File, jdText: string): Promise<TaskQueuedResponse> {
  const formData = new FormData()
  formData.append('resume', resume)
  formData.append('jd_text', jdText)

  return request<TaskQueuedResponse>('/analyze/async', {
    method: 'POST',
    body: formData,
  })
}

export async function getAnalyzeTaskStatus(taskId: string): Promise<TaskStatusResponse> {
  return request<TaskStatusResponse>(`/analyze/tasks/${taskId}`, {
    method: 'GET',
  })
}
