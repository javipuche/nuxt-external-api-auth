import type { User, AuthUserResponse } from '~~/shared/types/auth'

/**
 * GET /api/auth/user
 *
 * Returns the currently authenticated user.
 * The BFF injects the Bearer token from httpOnly cookies automatically.
 */
export default defineEventHandler(async (event): Promise<AuthUserResponse> => {
  try {
    const data = await apiFetch<{ user: User }>(event, '/v1/auth/user')
    return { user: data.user }
  }
  catch (error) {
    if (error instanceof ExternalApiError) {
      throwApiError(error)
    }
    throw error
  }
})
