export default defineEventHandler(async (event) => {
  const body = await readBody<PasswordResetBody>(event);

  try {
    await apiFetch<null>(event, "/v1/auth/password/reset", {
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
