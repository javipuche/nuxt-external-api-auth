/**
 * Pinia Colada mutation for signing in.
 *
 * On success:
 * 1. Updates reactive auth state (immediate UI feedback)
 * 2. Invalidates user query (ensures fresh data if re-fetched)
 * 3. Navigates to dashboard
 */
export function useSignIn() {
  const { apiFetch } = useApiFetch();
  const { setUser } = useAuthState();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async (body: SignInBody) => {
      const { user } = await apiFetch<AuthUserResponse>("/api/auth/sign-in", {
        method: "POST",
        body,
      });
      return user;
    },
    onSuccess(user) {
      setUser(user);
      queryCache.invalidateQueries({ key: AUTH_QUERY_KEYS.user() });
      navigateTo("/dashboard");
    },
  });
}
