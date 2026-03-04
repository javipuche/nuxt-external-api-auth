import type { H3Event } from "h3";

export const refreshAccessToken = async (
  event: H3Event,
  baseUrl: string,
): Promise<string | null> => {
  const refreshToken = getRefreshTokenCookie(event);

  if (!refreshToken) {
    clearAuthCookies(event);
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
      const { accessToken, refreshToken } = response.data;
      setAuthCookies(event, accessToken, refreshToken);
      return accessToken;
    }

    clearAuthCookies(event);
    return null;
  } catch {
    clearAuthCookies(event);
    return null;
  }
};
