export const useAuthRepository = () => {
  const { post, get } = useApiClient();

  const signIn = async (payload: SignInPayload) => {
    return await post<SignInResponse>("/api/auth/sign-in", {
      payload,
    });
  };

  const signUp = async (payload: SignUpPayload) => {
    return await post<SignUpResponse>("/api/auth/sign-up", {
      payload,
    });
  };

  const signOut = async () => {
    return await post<SignOutResponse>("/api/auth/sign-out");
  };

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    return await post<ForgotPasswordResponse>("/api/auth/password/forgot", {
      payload,
    });
  };

  const resetPassword = async (payload: ResetPasswordPayload) => {
    return await post<ResetPasswordResponse>("/api/auth/password/reset", {
      payload,
    });
  };

  const getAuthUser = async () => {
    return await get<AuthUserResponse>("/api/auth/user");
  };

  return {
    keys: AUTH_QUERY_KEYS,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    getAuthUser,
  };
};
