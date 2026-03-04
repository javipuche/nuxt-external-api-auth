import type { ApiFetchHooks } from "../../../api/shared/types/api-fetch";

/**
 * Server middleware that registers auth hooks into the apiFetchHooks array.
 * This keeps all auth logic (token injection, refresh) inside the auth layer.
 */
export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.externalApiBase as string;

  // Initialize the hooks array if it doesn't exist yet
  if (!event.context.apiFetchHooks) {
    event.context.apiFetchHooks = [];
  }

  const authHooks: ApiFetchHooks = {
    onRequest: (ctx) => {
      const token = getAccessTokenCookie(event);
      if (token) {
        ctx.options.headers["Authorization"] = `Bearer ${token}`;
      }
    },

    onResponseError: async (ctx) => {
      const data = ctx.response._data as any;
      if (
        ctx.response.status === 401 &&
        data?.code === "INVALID_ACCESS_TOKEN"
      ) {
        const newToken = await refreshToken(event, baseUrl);
        if (newToken) {
          ctx.options.headers["Authorization"] = `Bearer ${newToken}`;
          await ctx.retry();
        }
      }
    },
  };

  (event.context.apiFetchHooks as ApiFetchHooks[]).push(authHooks);
});
