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
