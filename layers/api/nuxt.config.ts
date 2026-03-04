// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    api: {
      baseURL: "http://localhost:3005/api",
      endpoints: {
        auth: {
          signIn: "/v1/auth/sign-in",
          signUp: "/v1/auth/sign-up",
          signOut: "/v1/auth/sign-out",
          refresh: "/v1/auth/refresh",
          user: "/v1/auth/user",
          password: {
            forgot: "/v1/auth/password/forgot",
            reset: "/v1/auth/password/reset",
            change: "/v1/auth/password/change",
          },
        },
      },
      errorCodes: {
        invalidAccessToken: "INVALID_ACCESS_TOKEN",
        invalidRefreshToken: "INVALID_REFRESH_TOKEN",
      },
    },
  },
});
