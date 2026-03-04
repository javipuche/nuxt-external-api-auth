export const useSignOut = () => {
  const { apiFetch } = useApiFetch();
  const { clear } = useAuthState();
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async () => {
      await apiFetch("/api/auth/sign-out", { method: "POST" });
    },
    onSettled() {
      clear();
      queryCache.invalidateQueries({ key: AUTH_QUERY_KEYS.root });
      navigateTo("/login");
    },
  });
};
