export default defineEventHandler(async (event) => {
  const body = await readBody<PasswordForgotBody>(event);

  try {
    await apiFetch<null>(event, "/v1/auth/password/forgot", {
      method: "POST",
      body,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof ExternalApiError) {
      throwApiError(error);
    }
    throw error;
  }
});
