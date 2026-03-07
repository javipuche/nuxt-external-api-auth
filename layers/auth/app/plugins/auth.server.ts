export default defineNuxtPlugin(async () => {
  const { getAuthUser } = useAuthRepository();
  const { setUser, clear } = useAuthState();

  try {
    const { user } = await getAuthUser();
    setUser(user);
  } catch {
    clear();
  }
});
