export default defineEventHandler(async (event): Promise<SignInResponse> => {
  const { externalApi } = useRuntimeConfig();
  const body = await readBody<SignInPayloadDto>(event);

  const data = await apiFetch<AuthResponseDto>(
    event,
    externalApi.endpoints.auth.signIn,
    {
      method: "POST",
      body,
    },
  );

  setAuthCookies(event, data.accessToken, data.refreshToken);

  return { user: data.user };
});
