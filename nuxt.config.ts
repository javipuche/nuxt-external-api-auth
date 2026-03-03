// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  ssr: true,

  modules: [
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
  ],

  imports: {
    dirs: [
      // Auto-import composables from nested directories
      'composables/**',
    ],
  },

  runtimeConfig: {
    // Server-only — never exposed to client
    externalApiBase: process.env.NUXT_EXTERNAL_API_BASE || 'http://localhost:3005/api',
  },
})
