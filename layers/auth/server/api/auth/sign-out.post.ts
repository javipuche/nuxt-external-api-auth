/**
 * POST /api/auth/sign-out
 *
 * Invalidates the session on the External API and clears httpOnly cookies.
 * Always clears cookies even if the external call fails.
 */
export default defineEventHandler(async (event) => {
  const refreshToken = getRefreshToken(event)

  try {
    if (refreshToken) {
      await apiFetch(event, '/v1/auth/sign-out', {
        method: 'POST',
        body: { refreshToken },
      })
    }
  }
  catch {
    // Swallow errors — we clear cookies regardless
  }
  finally {
    clearTokenCookies(event)
  }

  return { success: true }
})
