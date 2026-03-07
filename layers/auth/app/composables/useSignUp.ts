export const useSignUp = () => {
  const { signUp } = useAuthRepository();
  const { setUser } = useAuthState();

  return useMutation({
    mutation: async (payload: SignUpPayload) => {
      const { user } = await signUp(payload);
      return user;
    },
    onSuccess(user) {
      setUser(user);
      navigateTo("/dashboard");
    },
  });
};
