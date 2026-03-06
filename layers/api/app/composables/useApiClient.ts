import { appendResponseHeader } from "h3";

const extractErrorData = (
  raw: unknown,
): ExternalApiErrorData => {
  const obj = raw as Record<string, unknown> | null;
  const data = (obj?.data ?? obj) as ExternalApiErrorData | null;

  return {
    code: data?.code ?? "UNKNOWN_ERROR",
    message: data?.message ?? "An error occurred",
    errors: data?.errors,
  };
};

export const useApiClient = () => {
  const requestFetch = useRequestFetch();
  const event = useRequestEvent();
  const nuxtApp = useNuxtApp();

  const _fetch = async <T>(
    url: string,
    options?: ApiClientFetchOptions,
  ): Promise<T> => {
    return requestFetch(url, {
      ...options,
      onResponse: async (context) => {
        const cookies = context.response.headers.getSetCookie();

        for (const cookie of cookies) {
          appendResponseHeader(event!, "set-cookie", cookie);
        }

        await nuxtApp.callHook("api:response", {
          response: {
            status: context.response.status,
            data: context.response._data,
          },
        });
      },
      onResponseError: async (context) => {
        const errorData = extractErrorData(context.response._data);

        await nuxtApp.callHook("api:response-error", {
          response: {
            status: context.response.status,
            data: errorData,
          },
        });

        throw new ApiClientError(context.response.status, errorData);
      },
    }) as Promise<T>;
  };

  const request = <T>(url: string, options: ApiClientRequestOptions) => {
    const { payload, method = "GET", ...rest } = options || {};
    return _fetch<T>(url, { ...rest, method, body: payload });
  };

  const get = <T>(url: string, options?: ApiClientRequestOptions) => {
    return request<T>(url, { ...options, method: "GET" });
  };

  const post = <T>(url: string, options?: ApiClientRequestOptions) => {
    return request<T>(url, { ...options, method: "POST" });
  };

  const put = <T>(url: string, options?: ApiClientRequestOptions) => {
    return request<T>(url, { ...options, method: "PUT" });
  };

  const patch = <T>(url: string, options?: ApiClientRequestOptions) => {
    return request<T>(url, { ...options, method: "PATCH" });
  };

  const del = <T>(url: string, options?: ApiClientRequestOptions) => {
    return request<T>(url, { ...options, method: "DELETE" });
  };

  return { request, get, post, put, patch, del };
};
