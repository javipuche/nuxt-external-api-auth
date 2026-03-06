import type { H3Event } from "h3";

const getApiFetchHooks = (event: H3Event) => {
  if (!event.context._apiFetchHooks) {
    event.context._apiFetchHooks = [];
  }
  return event.context._apiFetchHooks as ApiFetchHooks[];
};

const executeOnRequestHooks = async (
  event: H3Event,
  context: ApiFetchOnRequestContext,
) => {
  const hooks = getApiFetchHooks(event);

  for (const hook of hooks) {
    await hook.onRequest?.(context);
  }
};

const executeOnResponseErrorHooks = async (
  event: H3Event,
  context: ApiFetchOnResponseErrorContext,
) => {
  const hooks = getApiFetchHooks(event);

  for (const hook of hooks) {
    await hook.onResponseError?.(context);
  }
};

export const addApiFetchHooks = (event: H3Event, hook: ApiFetchHooks) => {
  const hooks = getApiFetchHooks(event);
  hooks.push(hook);
};

export const apiFetch = async <T>(
  event: H3Event,
  path: string,
  options: Partial<ApiFetchOptions> = {},
): Promise<T> => {
  const config = useRuntimeConfig();
  const baseUrl = config.externalApi.baseURL;

  const defaultOptions: ApiFetchOptions = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body,
  };

  const makeRequest = async (ctx: ApiFetchOptions) => {
    return $fetch.raw(`${baseUrl}${path}`, {
      method: ctx.method as any,
      headers: ctx.headers,
      body: ctx.body ? JSON.stringify(ctx.body) : undefined,
      ignoreResponseError: true,
    });
  };

  // 1. Let ALL onRequest hooks mutate the context
  await executeOnRequestHooks(event, { options: defaultOptions });

  // 2. Make the request
  let response = await makeRequest(defaultOptions);

  // 3. On error, give hooks a chance to handle it via retry()
  if (!response.ok) {
    const retry = async () => {
      response = await makeRequest(defaultOptions);
    };

    await executeOnResponseErrorHooks(event, {
      response: { status: response.status, data: response._data },
      options: defaultOptions,
      retry,
    });
  }

  // 4. Handle error responses
  if (!response.ok) {
    const errorBody = response._data as ExternalApiErrorResponse | undefined;

    throw createError({
      statusCode: response.status,
      statusMessage: errorBody?.message || "An error occurred",
      data: {
        code: errorBody?.code || "BAD_REQUEST",
        message: errorBody?.message || "An error occurred",
        errors: errorBody?.errors,
      } satisfies ExternalApiErrorData,
    });
  }

  // 5. Unwrap and return data
  const successBody = response._data as ExternalApiSuccessResponse<T>;
  return successBody.data;
};
