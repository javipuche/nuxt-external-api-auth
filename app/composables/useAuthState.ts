import type { User } from '~~/shared/types/auth'

/**
 * SSR-safe reactive auth state.
 *
 * Uses Nuxt's `useState` so the value is:
 * - Populated during SSR by the auth plugin
 * - Serialized into the hydration payload
 * - Restored on the client without an extra fetch
 *
 * This is the single source of truth for "is the user logged in?"
 * across middleware, components, and Pinia Colada queries.
 */
export function useAuthState() {
  const user = useState<User | null>('auth:user', () => null)

  const isLoggedIn = computed(() => user.value !== null)

  function setUser(newUser: User) {
    user.value = newUser
  }

  function clear() {
    user.value = null
  }

  return {
    /** The current user (readonly to prevent external mutation) */
    user: readonly(user),
    /** Whether the user is authenticated */
    isLoggedIn,
    /** Update the current user */
    setUser,
    /** Clear auth state (logout) */
    clear,
  }
}
