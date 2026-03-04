export default defineEventHandler(async (event): Promise<AuthUserResponse> => {
  const body = await readBody<SignInBody>(event);

  try {
    const data = await apiFetch<AuthResponse>(event, "/v1/auth/sign-in", {
      method: "POST",
      body,
    });

    // Store tokens server-side — client never sees them
    setAuthCookies(event, data.accessToken, data.refreshToken);

    return { user: data.user };
  } catch (error) {
    if (error instanceof ExternalApiError) {
      throwExternalApiError(error);
    }
    throw error;
  }
});
