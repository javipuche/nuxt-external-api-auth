export const usePasswordForgot = () => {
  const { post } = useApiClient();

  return useMutation({
    mutation: async (payload: PasswordForgotBody) => {
      await post("/api/auth/password/forgot", {
        payload,
      });
    },
  });
};
