# Nuxt External API Auth Boilerplate

A modular Nuxt starter template demonstrating a clean, decoupled architecture for authenticating with external APIs using the **BFF (Backend-For-Frontend)** pattern.

This project showcases how to securely handle authentication, proxy requests to an external backend, and seamlessly refresh tokens, all while keeping the frontend API layer agnostic of authentication logic.

## Key Features

- **BFF (Backend-For-Frontend) Pattern:** Nuxt's server routes act as a proxy between the client and the external API.
- **Secure Token Handling:** Access and refresh tokens are stored securely in `httpOnly` cookies via the server layer, never exposed directly to the client API requests.
- **Silent Token Refresh:** The Nuxt server middleware automatically intercepts `401 Unauthorized` responses from the external API, attempts to refresh the token using the refresh endpoint, and replays the original request silently.
- **Global Client Error Handling:** Client-side interceptors (`api:response-error` hooks) catch unrecoverable 401 errors (when both tokens expire) to clear the session and redirect the user back to the login page.
- **Agnostic API Layer:** The `api` layer is fully decoupled from the `auth` layer. The global `useApiClient` doesn't know about users or sessions; it delegates error handling to registered Nuxt plugins.
- **Modular Layered Architecture:** Leverages Nuxt Layers to strictly separate domain logic (`layers/auth`, `layers/api`).
- **State Management:** Uses **Pinia Colada** for robust async data fetching, caching, and state synchronization.

## Architecture Highlights

### API Hooks (`layers/api/`)

Custom `api:response` and `api:response-error` Nuxt runtime hooks are provided by the `useApiClient` composable. This allows any other layer to inject behavior without polluting the base fetch wrapper.

### Auth Interceptor (`layers/auth/app/plugins/auth.client.ts`)

A dedicated client plugin that listens to `api:response-error`. If a `401 INVALID_ACCESS_TOKEN` is detected (meaning the BFF failed to refresh), it forces a session cleanup and a hard redirect to `/login`.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```
