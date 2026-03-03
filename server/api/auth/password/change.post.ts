import type { PasswordChangeBody } from '~~/shared/types/auth'

/**
 * POST /api/auth/password/change
 *
 * Changes the password for the authenticated user.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<PasswordChangeBody>(event)

  try {
    await apiFetch<null>(event, '/v1/auth/password/change', {
      method: 'POST',
      body,
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
