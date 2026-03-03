import type { H3Event } from "h3";

interface ApiFetchOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
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
  // const accessToken = options.noAuth ? undefined : getAccessToken(event);
  const accessToken = event.context.auth.accessToken;

  // 2. Make the request
  let response = await makeRequest(accessToken);

  // 3. If 401 with INVALID_ACCESS_TOKEN → attempt transparent refresh
  // if (response.status === 401 && !options.noAuth) {
  //   const body = response._data as any;
  //   if (body?.code === "INVALID_ACCESS_TOKEN") {
  //     // attemptTokenRefresh returns the NEW access token directly
  //     // because getCookie() reads from the REQUEST (old cookies),
  //     // not from the RESPONSE Set-Cookie headers we just wrote.
  //     const newAccessToken = await attemptTokenRefresh(event, baseUrl);
  //     if (newAccessToken) {
  //       response = await makeRequest(newAccessToken);
  //     }
  //   }
  // }
  if (response.status === 401) {
    const body = response._data as any;
    if (body?.code === "INVALID_ACCESS_TOKEN") {
      const newAccessToken = await event.context.auth.refreshAccessToken();
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
