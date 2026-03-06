<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          placeholder="user@example.com"
        />
      </div>

      <div>
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          placeholder="********"
        />
      </div>

      <p v-if="error" style="color: red">
        {{
          (error as any)?.data?.message || error.message || "Error logging in"
        }}
      </p>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Loading..." : "Log in" }}
      </button>
    </form>

    <p>
      <NuxtLink to="/register"> Don't have an account? Register </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "guest" });

const email = ref("user@example.com");
const password = ref("Password123!");

const { mutate: signIn, isLoading, error } = useSignIn();

function handleSubmit() {
  signIn({ email: email.value, password: password.value });
}
</script>
