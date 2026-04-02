import type { AnalyzeResponse } from './analyze'

export interface TaskQueuedResponse {
  task_id: string
  status: string
}

export interface TaskStatusResponse {
  task_id: string
  status: string
  result: AnalyzeResponse | null
}
