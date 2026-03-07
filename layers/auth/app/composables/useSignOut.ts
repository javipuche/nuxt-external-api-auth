export const useSignOut = () => {
  const { signOut } = useAuthRepository();
  const { clear } = useAuthState();

  return useMutation({
    mutation: async () => {
      await signOut();
    },
    onSettled() {
      clear();
      navigateTo("/login");
    },
  });
};
