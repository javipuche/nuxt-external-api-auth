export const useSignIn = () => {
  const { signIn } = useAuthRepository();
  const { setUser } = useAuthState();

  return useMutation({
    mutation: async (payload: SignInPayload) => {
      const { user } = await signIn(payload);
      return user;
    },
    onSuccess(user) {
      setUser(user);
      navigateTo("/dashboard");
    },
  });
};
