export default defineEventHandler((event) => {
  const { externalApi } = useRuntimeConfig();

  addApiFetchHooks(event, {
    onRequest: ({ options }) => {
      const accessToken = getAccessTokenCookie(event);

      if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    },

    onResponseError: async ({ response, options, retry }) => {
      const data = response.data as ExternalApiErrorResponse | undefined;

      if (
        response.status === 401 &&
        data?.code === API_ERROR_CODES.INVALID_ACCESS_TOKEN
      ) {
        const newAccessToken = await refreshAccessToken(
          event,
          `${externalApi.baseURL}${externalApi.endpoints.auth.refresh}`,
        );

        if (newAccessToken) {
          options.headers["Authorization"] = `Bearer ${newAccessToken}`;
          await retry();
        }
      }
    },
  });
});
