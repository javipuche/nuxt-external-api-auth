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
      const data = response.data as any;

      if (
        response.status === 401 &&
        data?.code === externalApi.errorCodes.invalidAccessToken
      ) {
        const newAccessToken = await refreshAccessToken(
          event,
          externalApi.endpoints.auth.refresh,
        );

        if (newAccessToken) {
          options.headers["Authorization"] = `Bearer ${newAccessToken}`;
          await retry();
        }
      }
    },
  });
});
