/**
 * Server-only plugin that initializes auth state from cookies.
 *
 * Runs before any page renders during SSR. If the browser sent valid
 * token cookies, this fetches the user profile and populates `useState`.
 * The client then hydrates with the same value — no flash, no re-fetch.
 *
 * Why a plugin and not middleware?
 * - Plugins run once per SSR render, before middleware
 * - This is a global concern, not a per-route concern
 * - Middleware is for redirects; this is for state initialization
 */
export default defineNuxtPlugin(async () => {
  const { setUser, clear } = useAuthState()
  const { apiFetch } = useApiFetch()

  try {
    // useApiFetch wraps useRequestFetch, which forwards the browser's
    // httpOnly cookies to our BFF during SSR
    const { user } = await apiFetch<{ user: any }>('/api/auth/user')
    setUser(user)
  }
  catch {
    // No valid session — user is a guest
    clear()
  }
})
