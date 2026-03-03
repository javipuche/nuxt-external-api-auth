import type { PasswordForgotBody } from '~~/shared/types/auth'

/**
 * Pinia Colada mutation for requesting a password reset email.
 */
export function usePasswordForgot() {
  const { apiFetch } = useApiFetch()

  return useMutation({
    mutation: async (body: PasswordForgotBody) => {
      await apiFetch('/api/auth/password/forgot', {
        method: 'POST',
        body,
      })
    },
  })
}
