import type { H3Event } from 'h3'

const ACCESS_TOKEN_COOKIE = 'og_access_token'
const REFRESH_TOKEN_COOKIE = 'og_refresh_token'

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

/**
 * Store both tokens as httpOnly cookies on the response.
 * The client never sees these values — they travel only as Set-Cookie headers.
 */
export function setTokenCookies(
  event: H3Event,
  accessToken: string,
  refreshToken: string,
): void {
  setCookie(event, ACCESS_TOKEN_COOKIE, accessToken, {
    ...baseCookieOptions,
    maxAge: 60 * 15, // 15 minutes
  })
  setCookie(event, REFRESH_TOKEN_COOKIE, refreshToken, {
    ...baseCookieOptions,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

/** Read the access token from the incoming request cookies */
export function getAccessToken(event: H3Event): string | undefined {
  return getCookie(event, ACCESS_TOKEN_COOKIE)
}

/** Read the refresh token from the incoming request cookies */
export function getRefreshToken(event: H3Event): string | undefined {
  return getCookie(event, REFRESH_TOKEN_COOKIE)
}

/** Remove both token cookies from the response (logout) */
export function clearTokenCookies(event: H3Event): void {
  deleteCookie(event, ACCESS_TOKEN_COOKIE, baseCookieOptions)
  deleteCookie(event, REFRESH_TOKEN_COOKIE, baseCookieOptions)
}
