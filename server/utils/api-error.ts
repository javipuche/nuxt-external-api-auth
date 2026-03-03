import type { ApiErrorCode, ApiErrorResponse } from '~~/shared/types/api'

/**
 * Typed error class for responses from the External API.
 * Captures the API error code, HTTP status, and field-level validation errors.
 */
export class ExternalApiError extends Error {
  public readonly code: ApiErrorCode
  public readonly statusCode: number
  public readonly errors?: Record<string, string[]>

  constructor(statusCode: number, body: ApiErrorResponse) {
    super(body.message)
    this.name = 'ExternalApiError'
    this.code = body.code as ApiErrorCode
    this.statusCode = statusCode
    this.errors = body.errors
  }
}

/**
 * Convert an ExternalApiError into an h3 error so Nuxt
 * serializes it properly for the client.
 */
export function throwApiError(error: ExternalApiError): never {
  throw createError({
    statusCode: error.statusCode,
    statusMessage: error.message,
    data: {
      code: error.code,
      errors: error.errors,
    },
  })
}
