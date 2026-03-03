/**
 * Route middleware that protects authenticated pages.
 *
 * Usage in pages:
 * ```
 * definePageMeta({ middleware: 'auth' })
 * ```
 *
 * Reads `isLoggedIn` from `useAuthState()`, which was populated by
 * the server plugin during SSR. No async calls, no latency.
 */
export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuthState()

  if (!isLoggedIn.value) {
    return navigateTo('/login', { replace: true })
  }
})
