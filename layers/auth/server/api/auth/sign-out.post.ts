export default defineEventHandler(async (event) => {
  const { externalApi } = useRuntimeConfig();
  const refreshToken = getRefreshTokenCookie(event);

  try {
    if (refreshToken) {
      await apiFetch(event, externalApi.endpoints.auth.signOut, {
        method: "POST",
        body: { refreshToken },
      });
    }
  } catch {
    // Swallow errors — we clear cookies regardless
  } finally {
    clearAuthCookies(event);
  }

  return { success: true };
});
