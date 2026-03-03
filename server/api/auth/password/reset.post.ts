import type { PasswordResetBody } from '~~/shared/types/auth'

/**
 * POST /api/auth/password/reset
 *
 * Resets the user password with a valid reset token. Public endpoint.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<PasswordResetBody>(event)

  try {
    await apiFetch<null>(event, '/v1/auth/password/reset', {
      method: 'POST',
      body,
      noAuth: true,
    })

    return { success: true }
  }
  catch (error) {
    if (error instanceof ExternalApiError) {
      throwApiError(error)
    }
    throw error
  }
})
