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

export type ExternalApiResponse<T> =
  | ExternalApiSuccessResponse<T>
  | ExternalApiErrorResponse;

export type ExternalApiErrorCode =
  | "INVALID_ACCESS_TOKEN"
  | "INVALID_REFRESH_TOKEN";

export interface UserDto {
  id: string;
  email: string;
  displayName: string;
  username?: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface SignInPayloadDto {
  email: string;
  password: string;
}

export interface SignUpPayloadDto {
  email: string;
  password: string;
  displayName: string;
  username: string;
}
