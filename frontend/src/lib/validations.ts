const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const MAX_JD_LENGTH = 5000
const MIN_JD_LENGTH = 1

const VALID_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const VALID_EXTENSIONS = ['.pdf', '.docx']

export function validateResumeFile(file: File): string | null {
  const fileName = file.name.toLowerCase()
  const hasValidExtension = VALID_EXTENSIONS.some((ext) => fileName.endsWith(ext))
  const hasValidMime = VALID_MIME_TYPES.includes(file.type)

  if (!hasValidExtension && !hasValidMime) {
    return 'Please upload a PDF or DOCX file'
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'File size must be less than 5MB'
  }

  return null
}

export function validateJobDescription(text: string): string | null {
  const trimmed = text.trim()

  if (trimmed.length < MIN_JD_LENGTH) {
    return 'Job description is required'
  }

  if (trimmed.length > MAX_JD_LENGTH) {
    return `Job description must be ${MAX_JD_LENGTH} characters or less`
  }

  return null
}

export function getMaxJobDescriptionLength(): number {
  return MAX_JD_LENGTH
}
