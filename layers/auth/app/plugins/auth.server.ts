export default defineNuxtPlugin(async () => {
  const { setUser, clear } = useAuthState();
  const { apiFetch } = useApiFetch();

  try {
    const { user } = await apiFetch<{ user: any }>("/api/auth/user");
    setUser(user);
  } catch {
    clear();
  }
});
