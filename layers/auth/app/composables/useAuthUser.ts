export const useAuthUser = () => {
  const { getAuthUser, keys } = useAuthRepository();
  const { setUser, isLoggedIn } = useAuthState();

  return useQuery({
    key: keys.user(),
    enabled: () => isLoggedIn.value,
    staleTime: 1000 * 60 * 5,
    gcTime: Infinity,
    query: async () => {
      const { user } = await getAuthUser();
      setUser(user);
      return user;
    },
  });
};
