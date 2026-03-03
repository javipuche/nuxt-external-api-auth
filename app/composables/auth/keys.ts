/**
 * Centralized query key factories for the auth domain.
 *
 * Hierarchical keys allow both targeted and broad invalidation:
 * - invalidateQueries({ key: AUTH_QUERY_KEYS.root })  → all auth queries
 * - invalidateQueries({ key: AUTH_QUERY_KEYS.user() }) → only user query
 */
export const AUTH_QUERY_KEYS = {
  root: ['auth'] as const,
  user: () => [...AUTH_QUERY_KEYS.root, 'user'] as const,
}
