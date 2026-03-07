export interface User {
  id: string;
  email: string;
  displayName: string;
  username?: string;
}

export interface AuthUserResponse {
  user: User;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  displayName: string;
  username: string;
}

export type SignInResponse = AuthUserResponse;

export type SignUpResponse = AuthUserResponse;

export interface SignOutResponse {
  success: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
}
