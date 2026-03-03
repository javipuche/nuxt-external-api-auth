/** Authenticated user profile */
export interface User {
  id: string
  email: string
  displayName: string
  username?: string
}

/** Token pair from the External API */
export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

/** Response from sign-in / sign-up (tokens + user) */
export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

/** POST /v1/auth/sign-up request body */
export interface SignUpBody {
  email: string
  password: string
  displayName: string
  username: string
}

/** POST /v1/auth/sign-in request body */
export interface SignInBody {
  email: string
  password: string
}

/** POST /v1/auth/password/change request body */
export interface PasswordChangeBody {
  currentPassword: string
  newPassword: string
}

/** POST /v1/auth/password/forgot request body */
export interface PasswordForgotBody {
  email: string
}

/** POST /v1/auth/password/reset request body */
export interface PasswordResetBody {
  token: string
  password: string
}

/** Shape returned by BFF routes to the client (no tokens) */
export interface AuthUserResponse {
  user: User
}
