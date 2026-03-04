/**
 * POST /api/auth/sign-up
 *
 * Proxies registration to the External API.
 * Stores tokens as httpOnly cookies — returns only the user to the client.
 */
export default defineEventHandler(async (event): Promise<AuthUserResponse> => {
  const body = await readBody<SignUpBody>(event);

  try {
    const data = await apiFetch<AuthResponse>(event, "/v1/auth/sign-up", {
      method: "POST",
      body,
    });

    setAuthCookies(event, data.accessToken, data.refreshToken);

    return { user: data.user };
  } catch (error) {
    if (error instanceof ExternalApiError) {
      throwApiError(error);
    }
    throw error;
  }
});
