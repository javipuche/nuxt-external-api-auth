/**
 * Pinia Colada mutation for changing the user's password.
 */
export function usePasswordChange() {
  const { apiFetch } = useApiFetch();

  return useMutation({
    mutation: async (body: PasswordChangeBody) => {
      await apiFetch("/api/auth/password/change", {
        method: "POST",
        body,
      });
    },
  });
}
