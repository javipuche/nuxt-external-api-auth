export default defineEventHandler(async (event) => {
  const refreshToken = getRefreshTokenCookie(event);

  try {
    if (refreshToken) {
      await apiFetch(event, "/v1/auth/sign-out", {
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
