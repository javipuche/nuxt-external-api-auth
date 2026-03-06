export interface ExternalApiSuccessResponse<T> {
  success: true;
  timestamp: string;
  data: T;
}

export interface ExternalApiErrorResponse {
  success: false;
  timestamp: string;
  code: string;
  message: string;
  errors?: Record<string, string[]>;
}


export type ExternalApiErrorCode =
  | "INVALID_ACCESS_TOKEN"
  | "INVALID_REFRESH_TOKEN";

export interface ExternalApiErrorData {
  code: string;
  message: string;
  errors?: Record<string, string[]>;
}
