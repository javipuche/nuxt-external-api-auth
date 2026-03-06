import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const currentDir = dirname(fileURLToPath(import.meta.url));

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
    },
  },
  imports: {
    dirs: [
      join(currentDir, "./shared/types/**"),
      join(currentDir, "./shared/constants/**"),
    ],
  },
  nitro: {
    imports: {
      dirs: [
        join(currentDir, "./shared/types/**"),
        join(currentDir, "./shared/constants/**"),
      ],
    },
  },
});
