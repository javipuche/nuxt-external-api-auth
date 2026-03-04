export const usePasswordReset = () => {
  const { post } = useApiClient();

  return useMutation({
    mutation: async (payload: PasswordResetBody) => {
      await post("/api/auth/password/reset", {
        payload,
      });
    },
  });
};
