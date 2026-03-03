import type { PasswordResetBody } from '~~/shared/types/auth'

/**
 * Pinia Colada mutation for resetting the password with a token.
 */
export function usePasswordReset() {
  const { apiFetch } = useApiFetch()

  return useMutation({
    mutation: async (body: PasswordResetBody) => {
      await apiFetch('/api/auth/password/reset', {
        method: 'POST',
        body,
      })
    },
  })
}
