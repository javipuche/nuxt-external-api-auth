export const AUTH_QUERY_KEYS = {
  root: ['auth'] as const,
  user: () => [...AUTH_QUERY_KEYS.root, 'user'] as const
};
