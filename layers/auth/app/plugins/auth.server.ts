export default defineNuxtPlugin(async () => {
  const { setUser, clear } = useAuthState();
  const { get } = useApiClient();

  try {
    const { user } = await get<{ user: any }>("/api/auth/user");
    setUser(user);
  } catch {
    clear();
  }
});
