export const useSignUp = () => {
  const { post } = useApiClient();
  const { setUser } = useAuthState();

  return useMutation({
    mutation: async (payload: SignUpPayload) => {
      const { user } = await post<AuthUserResponse>("/api/auth/sign-up", {
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
