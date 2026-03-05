export const useAuthState = () => {
  const user = useState<User | null>("auth:user", () => null);
  const queryCache = useQueryCache();

  const isLoggedIn = computed(() => user.value !== null);

  const setUser = (userData: User) => {
    user.value = userData;
    queryCache.setQueryData(AUTH_QUERY_KEYS.user(), userData);
  };

  const clear = () => {
    user.value = null;
    queryCache.setQueryData(AUTH_QUERY_KEYS.user(), null);
    queryCache.invalidateQueries({ key: AUTH_QUERY_KEYS.user() });
  };

  return {
    /** The current user (readonly to prevent external mutation) */
    user: readonly(user),
    /** Whether the user is authenticated */
    isLoggedIn,
    /** Update the current user */
    setUser,
    /** Clear auth state (logout) */
    clear,
  };
};
