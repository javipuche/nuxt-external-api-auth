export const useSignUp = () => {
  const { post } = useApiClient();
  const { setUser } = useAuthState();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async (payload: SignUpBody) => {
      const { user } = await post<AuthUserResponse>("/api/auth/sign-up", {
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
