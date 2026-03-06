export const useAuthUser = () => {
  const { get } = useApiClient();
  const { setUser, isLoggedIn } = useAuthState();

  return useQuery({
    key: AUTH_QUERY_KEYS.user(),
    enabled: () => isLoggedIn.value,
    query: async () => {
      const { user } = await get<AuthUserResponse>("/api/auth/user");
      setUser(user);
      return user;
    },
  });
};
