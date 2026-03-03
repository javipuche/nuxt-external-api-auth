import type { H3Event } from "h3";
/**
 * Attempt to refresh tokens using the refresh token cookie.
 * On success: updates both cookies and returns the new access token.
 * On failure: clears all cookies and returns null.
 */
export const refreshToken = async function (
  event: H3Event,
  baseUrl: string,
): Promise<string | null> {
  const refreshToken = getRefreshToken(event);

  if (!refreshToken) {
    clearTokenCookies(event);
    return null;
  }

  try {
    const response = await $fetch<
      ApiSuccessResponse<{ accessToken: string; refreshToken: string }>
    >(`${baseUrl}/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { refreshToken },
    });

    if (response.success) {
      setTokenCookies(
        event,
        response.data.accessToken,
        response.data.refreshToken,
      );
      return response.data.accessToken;
    }

    clearTokenCookies(event);
    return null;
  } catch {
    clearTokenCookies(event);
    return null;
  }
};
