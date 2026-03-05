<template>
  <div>
    <h1>Dashboard</h1>

    <AuthState v-slot="{ user, isLoggedIn }">
      <div v-if="isLoggedIn && user">
        <p>
          Hola, <strong>{{ user.displayName }}</strong>
        </p>
        <p>Email: {{ user.email }}</p>
        <p v-if="user.username">Username: @{{ user.username }}</p>
      </div>
    </AuthState>

    <button :disabled="isLoading" @click="signOut()">
      {{ isLoading ? "Cerrando sesion..." : "Cerrar sesion" }}
    </button>

    <hr />

    <p>
      <NuxtLink to="/"> Volver al inicio </NuxtLink>
    </p>
    <pre>
      {{ authUser }}
    </pre>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const { mutate: signOut, isLoading } = useSignOut();
const authUser = useAuthUser();
</script>
