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
