export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.externalApiBase as string;

  addApiFetchHooks(event, {
    onRequest: ({ options }) => {
      const accessToken = getAccessTokenCookie(event);

      if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    },

    onResponseError: async ({ response, options, retry }) => {
      const data = response.data as any;

      if (response.status === 401 && data?.code === "INVALID_ACCESS_TOKEN") {
        const newAccessToken = await refreshAccessToken(event, baseUrl);

        if (newAccessToken) {
          options.headers["Authorization"] = `Bearer ${newAccessToken}`;
          await retry();
        }
      }
    },
  });
});
