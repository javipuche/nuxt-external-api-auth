import { appendResponseHeader } from "h3";

/**
 * Client-side fetch wrapper for calling BFF routes.
 *
 * During SSR, uses `useRequestFetch()` to forward the browser's
 * httpOnly cookies to the Nuxt server routes. On the client,
 * cookies are sent automatically by the browser.
 *
 * The `onResponse` hook captures Set-Cookie headers from internal
 * SSR sub-responses and forwards them to the main browser response.
 * Without this, cookies set during SSR (e.g. token refresh) would
 * be lost because they are set on a sub-event, not the main event.
 *
 * All Pinia Colada queries and mutations should use this
 * instead of raw `$fetch` to ensure cookies travel correctly.
 */
export function useApiFetch() {
  const requestFetch = useRequestFetch();
  const event = useRequestEvent();

  async function apiFetch<T>(
    url: string,
    options?: Parameters<typeof $fetch>[1],
  ): Promise<T> {
    return requestFetch(url, {
      ...options,
      onResponse({ response }) {
        // During SSR, forward Set-Cookie headers from internal API responses
        // to the main SSR response so they reach the browser.
        if (event) {
          const cookies = response.headers.getSetCookie();
          for (const cookie of cookies) {
            appendResponseHeader(event, "set-cookie", cookie);
          }
        }
      },
    }) as unknown as T;
  }

  return { apiFetch };
}
