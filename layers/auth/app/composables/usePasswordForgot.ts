export const usePasswordForgot = () => {
  const { apiFetch } = useApiFetch();

  return useMutation({
    mutation: async (body: PasswordForgotBody) => {
      await apiFetch("/api/auth/password/forgot", {
        method: "POST",
        body,
      });
    },
  });
};
