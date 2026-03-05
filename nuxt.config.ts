// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-03-05",
  devtools: { enabled: true },
  ssr: true,
  modules: ["@pinia/nuxt", "@pinia/colada-nuxt"],
});
