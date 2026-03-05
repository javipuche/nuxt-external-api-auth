// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    externalApi: {
      baseURL: "http://localhost:3005/api",
      endpoints: {
        auth: {
          signIn: "/v1/auth/sign-in",
          signUp: "/v1/auth/sign-up",
          signOut: "/v1/auth/sign-out",
          refresh: "/v1/auth/refresh",
          user: "/v1/auth/user",
        },
      },
      errorCodes: {
        invalidAccessToken: "INVALID_ACCESS_TOKEN",
        invalidRefreshToken: "INVALID_REFRESH_TOKEN",
      },
    },
  },
});
