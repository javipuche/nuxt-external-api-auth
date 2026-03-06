<template>
  <div>
    <h1>Dashboard</h1>

    <AuthState v-slot="{ user, isLoggedIn }">
      <div v-if="isLoggedIn && user">
        <p>
          Hello, <strong>{{ user.displayName }}</strong>
        </p>
        <p>Email: {{ user.email }}</p>
        <p v-if="user.username">Username: @{{ user.username }}</p>
      </div>
    </AuthState>

    <button :disabled="isLoading" @click="signOut()">
      {{ isLoading ? "Logging out..." : "Log out" }}
    </button>

    <hr />

    <p>
      <NuxtLink to="/"> Back to home </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const { mutate: signOut, isLoading } = useSignOut();
</script>
