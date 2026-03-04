import { appendResponseHeader } from "h3";

export const useApiFetch = () => {
  const requestFetch = useRequestFetch();
  const event = useRequestEvent();

  const apiFetch = async <T>(
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

  return { apiFetch };
};
