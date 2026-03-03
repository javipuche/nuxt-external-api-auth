export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.externalApiBase as string;
  const accessToken = getAccessToken(event);

  // Initialize the auth context object
  event.context.auth = {};

  if (accessToken) {
    event.context.auth.accessToken = accessToken;
  }

  event.context.auth.refreshAccessToken = async () =>
    await refreshToken(event, baseUrl);
});
