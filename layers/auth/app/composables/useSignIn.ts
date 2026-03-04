export const useSignIn = () => {
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
};
