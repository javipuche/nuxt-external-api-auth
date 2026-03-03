/** Successful response envelope from the External API */
export interface ApiSuccessResponse<T> {
  success: true
  timestamp: string
  data: T
}

/** Error response envelope from the External API */
export interface ApiErrorResponse {
  success: false
  timestamp: string
  code: string
  message: string
  errors?: Record<string, string[]>
}

/** Union type for any External API response */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

/** Known error codes returned by the External API */
export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'INVALID_CREDENTIALS'
  | 'INVALID_ACCESS_TOKEN'
  | 'UNAUTHORIZED'
  | 'EMAIL_ALREADY_EXISTS'
  | 'USERNAME_ALREADY_EXISTS'
  | 'BAD_REQUEST'
