export const useAuthUser = () => {
  const { get } = useApiClient();
  const { setUser, clear, isLoggedIn } = useAuthState();

  const query = useQuery({
    key: AUTH_QUERY_KEYS.user(),
    query: async () => {
      const { user } = await get<AuthUserResponse>("/api/auth/user");
      return user;
    },
    enabled: () => isLoggedIn.value,
  });

  watch(
    () => query.data.value,
    (user) => {
      if (user) setUser(user);
    },
  );

  watch(
    () => query.error.value,
    (error) => {
      if (error) clear();
    },
  );

  return query;
};
