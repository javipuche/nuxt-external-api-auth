import { appendResponseHeader } from "h3";

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

        await nuxtApp.callHook("api:response", context);
      },
      onResponseError: async (context) => {
        await nuxtApp.callHook("api:response-error", context);
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
