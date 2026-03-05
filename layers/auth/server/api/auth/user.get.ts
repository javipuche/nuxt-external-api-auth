export default defineEventHandler(async (event): Promise<AuthUserResponse> => {
  const { externalApi } = useRuntimeConfig();

  try {
    const data = await apiFetch<{ user: UserDto }>(
      event,
      externalApi.endpoints.auth.user,
    );
    return { user: data.user };
  } catch (error) {
    if (error instanceof ExternalApiError) {
      throwExternalApiError(error);
    }
    throw error;
  }
});
