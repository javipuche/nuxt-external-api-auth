import type { H3Event } from "h3";
import type {
  ApiFetchHooks,
  ApiFetchRequestContext,
} from "../../shared/types/api-fetch";

interface ApiFetchOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Generic fetch wrapper for the External API.
 *
 * - Supports extensible hooks via `event.context.apiFetchHooks` (array)
 *   Multiple layers can push hooks — all are executed
 * - Returns the unwrapped `data` field from the API success envelope
 */
export async function apiFetch<T>(
  event: H3Event,
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const config = useRuntimeConfig();
  const baseUrl = config.externalApiBase as string;

  // Read ALL registered hooks (multiple layers can push)
  const hooksList = (event.context.apiFetchHooks ?? []) as ApiFetchHooks[];

  // Build the mutable request context
  const ctx: ApiFetchRequestContext = {
    options: {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body,
    },
  };

  const makeRequest = async (reqCtx: ApiFetchRequestContext) => {
    return $fetch.raw(`${baseUrl}${path}`, {
      method: reqCtx.options.method as any,
      headers: reqCtx.options.headers,
      body: reqCtx.options.body
        ? JSON.stringify(reqCtx.options.body)
        : undefined,
      ignoreResponseError: true,
    });
  };

  // 1. Let ALL onRequest hooks mutate the context
  for (const hooks of hooksList) {
    hooks.onRequest?.(ctx);
  }

  // 2. Make the request
  let response = await makeRequest(ctx);

  // 3. On error, give hooks a chance to handle it via retry()
  if (!response.ok) {
    const retry = async () => {
      response = await makeRequest(ctx);
    };

    for (const hooks of hooksList) {
      if (hooks.onResponseError) {
        await hooks.onResponseError({
          response: { status: response.status, _data: response._data },
          options: ctx.options,
          retry,
        });
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
