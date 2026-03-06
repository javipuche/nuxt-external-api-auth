export default defineEventHandler(async (event): Promise<AuthUserResponse> => {
  const { externalApi } = useRuntimeConfig();

  const data = await apiFetch<{ user: UserDto }>(
    event,
    externalApi.endpoints.auth.user,
  );

  return { user: data.user };
});
