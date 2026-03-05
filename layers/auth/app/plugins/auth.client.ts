export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("api:response-error", async ({ response }) => {
    const data = response._data?.data || response._data;
    const status = response.status;
    const codes = ["INVALID_ACCESS_TOKEN", "INVALID_REFRESH_TOKEN"];

    if (status === 401 && codes.includes(data?.code)) {
      await nuxtApp.runWithContext(() => {
        navigateTo("/login", { replace: true });
      });
    }
  });
});
