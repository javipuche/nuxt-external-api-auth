export const useSignOut = () => {
  const { post } = useApiClient();
  const { clear } = useAuthState();

  return useMutation({
    mutation: async () => {
      await post("/api/auth/sign-out");
    },
    onSettled() {
      clear();
      navigateTo("/login");
    },
  });
};
