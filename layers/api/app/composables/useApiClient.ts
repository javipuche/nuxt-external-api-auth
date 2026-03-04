import { appendResponseHeader } from "h3";
import type { FetchOptions } from "ofetch";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method?: HttpMethod;
  payload?: FetchOptions["body"];
  headers?: FetchOptions["headers"];
  query?: FetchOptions["query"];
}

export const useApiClient = () => {
  const requestFetch = useRequestFetch();
  const event = useRequestEvent();

  const _fetch = async <T>(
    url: string,
    options?: Parameters<typeof $fetch>[1],
  ): Promise<T> => {
    return requestFetch(url, {
      ...options,
      onResponse({ response }) {
        if (event) {
          const cookies = response.headers.getSetCookie();
          for (const cookie of cookies) {
            appendResponseHeader(event, "set-cookie", cookie);
          }
        }
      },
    }) as unknown as T;
  };

  const request = <T>(url: string, options: RequestOptions = {}) => {
    const { payload, method, ...rest } = options;
    return _fetch<T>(url, { ...rest, method, body: payload });
  };

  const get = <T>(url: string, options: RequestOptions = {}) => {
    return request<T>(url, { ...options, method: "GET" });
  };

  const post = <T>(url: string, options: RequestOptions = {}) => {
    return request<T>(url, { ...options, method: "POST" });
  };

  const put = <T>(url: string, options: RequestOptions = {}) => {
    return request<T>(url, { ...options, method: "PUT" });
  };

  const patch = <T>(url: string, options: RequestOptions = {}) => {
    return request<T>(url, { ...options, method: "PATCH" });
  };

  const del = <T>(url: string, options: RequestOptions = {}) => {
    return request<T>(url, { ...options, method: "DELETE" });
  };

  return { request, get, post, put, patch, del };
};
