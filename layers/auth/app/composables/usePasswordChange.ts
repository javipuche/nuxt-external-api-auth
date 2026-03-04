export const usePasswordChange = () => {
  const { apiFetch } = useApiFetch();

  return useMutation({
    mutation: async (body: PasswordChangeBody) => {
      await apiFetch("/api/auth/password/change", {
        method: "POST",
        body,
      });
    },
  });
};
