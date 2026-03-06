export default defineNuxtPlugin(async () => {
  const { setUser, clear } = useAuthState();
  const { get } = useApiClient();

  try {
    const { user } = await get<AuthUserResponse>("/api/auth/user");
    setUser(user);
  } catch {
    clear();
  }
});
