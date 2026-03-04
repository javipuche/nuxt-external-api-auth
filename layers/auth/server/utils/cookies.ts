import type { H3Event } from "h3";

export const COOKIE_ACCESS_TOKEN = "access_token";
export const COOKIE_REFRESH_TOKEN = "refresh_token";

const cookieOptions = {
  httpOnly: true,
  secure: !import.meta.dev,
  sameSite: "lax" as const,
  path: "/",
};

export const setAccessTokenCookie = (event: H3Event, token: string) => {
  setCookie(event, COOKIE_ACCESS_TOKEN, token, {
    ...cookieOptions,
    maxAge: 60 * 15, // 15 minutos
  });
};

export const setRefreshTokenCookie = (event: H3Event, token: string) => {
  setCookie(event, COOKIE_REFRESH_TOKEN, token, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
};

export const setAuthCookies = (
  event: H3Event,
  accessToken: string,
  refreshToken: string,
) => {
  setAccessTokenCookie(event, accessToken);
  setRefreshTokenCookie(event, refreshToken);
};

export function getAccessTokenCookie(event: H3Event): string | undefined {
  return getCookie(event, COOKIE_ACCESS_TOKEN);
}

export function getRefreshTokenCookie(event: H3Event): string | undefined {
  return getCookie(event, COOKIE_REFRESH_TOKEN);
}

export function clearAuthCookies(event: H3Event): void {
  deleteCookie(event, COOKIE_ACCESS_TOKEN, cookieOptions);
  deleteCookie(event, COOKIE_REFRESH_TOKEN, cookieOptions);
}
