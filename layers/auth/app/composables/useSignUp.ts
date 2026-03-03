/**
 * Pinia Colada mutation for registering a new user.
 *
 * On success: sets auth state, invalidates queries, navigates to dashboard.
 */
export function useSignUp() {
  const { apiFetch } = useApiFetch();
  const { setUser } = useAuthState();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async (body: SignUpBody) => {
      const { user } = await apiFetch<AuthUserResponse>("/api/auth/sign-up", {
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
