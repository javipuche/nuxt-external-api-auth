import type { AuthUserResponse } from '~~/shared/types/auth'

/**
 * Pinia Colada query for the currently authenticated user.
 *
 * - Controlled by `enabled`: only fetches when `isLoggedIn` is true
 *   (the server plugin sets the initial state, so guests never trigger this)
 * - staleTime of 5min prevents excessive re-fetches
 * - Syncs query result back to useAuthState for consistency
 */
export function useAuthUser() {
  const { apiFetch } = useApiFetch()
  const { setUser, clear, isLoggedIn } = useAuthState()

  const query = useQuery({
    key: AUTH_QUERY_KEYS.user(),
    query: async () => {
      const { user } = await apiFetch<AuthUserResponse>('/api/auth/user')
      return user
    },
    enabled: () => isLoggedIn.value,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Keep useAuthState in sync with query results
  watch(() => query.data.value, (user) => {
    if (user) setUser(user)
  })

  watch(() => query.error.value, (error) => {
    if (error) clear()
  })

  return query
}
