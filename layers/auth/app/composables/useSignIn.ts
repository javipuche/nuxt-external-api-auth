export const useSignIn = () => {
  const { post } = useApiClient();
  const { setUser } = useAuthState();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async (payload: SignInPayload) => {
      const { user } = await post<AuthUserResponse>("/api/auth/sign-in", {
        payload,
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
