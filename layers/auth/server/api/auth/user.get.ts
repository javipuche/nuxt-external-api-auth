export default defineEventHandler(async (event): Promise<AuthUserResponse> => {
  try {
    const data = await apiFetch<{ user: User }>(event, "/v1/auth/user");
    return { user: data.user };
  } catch (error) {
    if (error instanceof ExternalApiError) {
      throwApiError(error);
    }
    throw error;
  }
});
