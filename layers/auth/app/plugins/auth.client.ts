export default defineNuxtPlugin((nuxtApp) => {
  const { clear } = useAuthState();

  nuxtApp.hook("api:response-error", async ({ response }) => {
    const codes = Object.values(API_ERROR_CODES);

    if (
      response.status === 401 &&
      (codes as string[]).includes(response.data.code)
    ) {
      await nuxtApp.runWithContext(() => {
        clear();
        return navigateTo("/login", { replace: true });
      });
    }
  });
});
