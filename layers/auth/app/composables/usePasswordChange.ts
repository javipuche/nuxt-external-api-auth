export const usePasswordChange = () => {
  const { post } = useApiClient();

  return useMutation({
    mutation: async (payload: PasswordChangeBody) => {
      await post("/api/auth/password/change", {
        payload,
      });
    },
  });
};
