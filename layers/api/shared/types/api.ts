export interface ApiSuccessResponse<T> {
  success: true;
  timestamp: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  timestamp: string;
  code: string;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type ApiErrorCode = "INVALID_ACCESS_TOKEN" | "INVALID_REFRESH_TOKEN";
