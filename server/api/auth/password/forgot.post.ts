import type { PasswordForgotBody } from '~~/shared/types/auth'

/**
 * POST /api/auth/password/forgot
 *
 * Requests a password reset email. Public endpoint (no auth required).
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<PasswordForgotBody>(event)

  try {
    await apiFetch<null>(event, '/v1/auth/password/forgot', {
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
