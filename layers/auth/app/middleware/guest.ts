/**
 * Route middleware that redirects authenticated users away from guest pages.
 *
 * Usage in pages:
 * ```
 * definePageMeta({ middleware: 'guest' })
 * ```
 *
 * Prevents logged-in users from seeing login/register forms.
 */
export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuthState()

  if (isLoggedIn.value) {
    return navigateTo('/dashboard', { replace: true })
  }
})
