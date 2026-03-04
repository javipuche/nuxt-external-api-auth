export const useSignOut = () => {
  const { post } = useApiClient();
  const { clear } = useAuthState();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async () => {
      await post("/api/auth/sign-out");
    },
    onSettled() {
      clear();
      queryCache.invalidateQueries({ key: AUTH_QUERY_KEYS.root });
      navigateTo("/login");
    },
  });
};
