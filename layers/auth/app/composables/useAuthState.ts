export const useAuthState = () => {
  const user = useState<User | null>("auth:user", () => null);

  const isLoggedIn = computed(() => user.value !== null);

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  const clear = () => {
    user.value = null;
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
