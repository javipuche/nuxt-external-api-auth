import type { H3Event } from "h3";
import type { ApiSuccessResponse } from "~~/shared/types/api";

interface ApiFetchOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  /** Skip Bearer token injection (for public endpoints like sign-in) */
  noAuth?: boolean;
}

/**
 * Authenticated fetch to the External API.
 *
 * - Injects the access token from httpOnly cookies as a Bearer header
 * - On 401 + code=INVALID_ACCESS_TOKEN: transparently refreshes tokens and retries
 * - On refresh failure: clears cookies (user is logged out)
 * - Returns the unwrapped `data` field from the API success envelope
 */
export async function apiFetch<T>(
  event: H3Event,
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const config = useRuntimeConfig();
  const baseUrl = config.externalApiBase as string;

  const makeRequest = async (token?: string) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return $fetch.raw(`${baseUrl}${path}`, {
      method: (options.method || "GET") as any,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      ignoreResponseError: true, // We handle errors ourselves
    });
  };

  // 1. Get current access token
  const accessToken = options.noAuth ? undefined : getAccessToken(event);

  // 2. Make the request
  let response = await makeRequest(accessToken);

  // 3. If 401 with INVALID_ACCESS_TOKEN → attempt transparent refresh
  if (response.status === 401 && !options.noAuth) {
    const body = response._data as any;
    if (body?.code === "INVALID_ACCESS_TOKEN") {
      // attemptTokenRefresh returns the NEW access token directly
      // because getCookie() reads from the REQUEST (old cookies),
      // not from the RESPONSE Set-Cookie headers we just wrote.
      const newAccessToken = await attemptTokenRefresh(event, baseUrl);
      if (newAccessToken) {
        response = await makeRequest(newAccessToken);
      }
    }
  }

  // 4. Handle error responses
  if (!response.ok) {
    const errorBody = response._data as any;
    throw new ExternalApiError(response.status, {
      success: false,
      timestamp: errorBody?.timestamp || new Date().toISOString(),
      code: errorBody?.code || "BAD_REQUEST",
      message: errorBody?.message || "An error occurred",
      errors: errorBody?.errors,
    });
  }

  // 5. Unwrap and return data
  const successBody = response._data as ApiSuccessResponse<T>;
  return successBody.data;
}

/**
 * Attempt to refresh tokens using the refresh token cookie.
 * On success: updates both cookies and returns the new access token.
 * On failure: clears all cookies and returns null.
 */
async function attemptTokenRefresh(
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
}
