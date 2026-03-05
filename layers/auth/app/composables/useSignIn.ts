export const useSignIn = () => {
  const { post } = useApiClient();
  const { setUser } = useAuthState();

  return useMutation({
    mutation: async (payload: SignInPayload) => {
      const { user } = await post<AuthUserResponse>("/api/auth/sign-in", {
        payload,
      });
      return user;
    },
    onSuccess(user) {
      setUser(user);
      navigateTo("/dashboard");
    },
  });
};
