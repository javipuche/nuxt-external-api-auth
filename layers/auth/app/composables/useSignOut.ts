/**
 * Pinia Colada mutation for signing out.
 *
 * Uses `onSettled` (not `onSuccess`) to guarantee cleanup happens
 * even if the external API sign-out call fails. Cookies are cleared
 * server-side; client-side we clear state and redirect.
 */
export function useSignOut() {
  const { apiFetch } = useApiFetch()
  const { clear } = useAuthState()
  const queryCache = useQueryCache()

  return useMutation({
    mutation: async () => {
      await apiFetch('/api/auth/sign-out', { method: 'POST' })
    },
    onSettled() {
      clear()
      queryCache.invalidateQueries({ key: AUTH_QUERY_KEYS.root })
      navigateTo('/login')
    },
  })
}
