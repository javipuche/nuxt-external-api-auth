import type { H3Event } from "h3";

const refresh = async (
  event: H3Event,
  endpoint: string,
): Promise<string | null> => {
  const refreshToken = getRefreshTokenCookie(event);

  if (!refreshToken) {
    clearAuthCookies(event);
    return null;
  }

  try {
    const response = await $fetch<
      ExternalApiSuccessResponse<{ accessToken: string; refreshToken: string }>
    >(endpoint, {
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

export const refreshAccessToken = (
  event: H3Event,
  endpoint: string,
): Promise<string | null> => {
  if (!event.context._refreshPromise) {
    event.context._refreshPromise = refresh(event, endpoint).finally(() => {
      event.context._refreshPromise = undefined;
    });
  }

  return event.context._refreshPromise;
};
