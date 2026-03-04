export const usePasswordReset = () => {
  const { apiFetch } = useApiFetch();

  return useMutation({
    mutation: async (body: PasswordResetBody) => {
      await apiFetch("/api/auth/password/reset", {
        method: "POST",
        body,
      });
    },
  });
};
