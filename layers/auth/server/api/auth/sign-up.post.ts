export default defineEventHandler(async (event): Promise<AuthUserResponse> => {
  const { externalApi } = useRuntimeConfig();
  const body = await readBody<SignUpPayloadDto>(event);

  const data = await apiFetch<AuthResponseDto>(
    event,
    externalApi.endpoints.auth.signUp,
    {
      method: "POST",
      body,
    },
  );

  setAuthCookies(event, data.accessToken, data.refreshToken);

  return { user: data.user };
});
