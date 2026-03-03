<script setup lang="ts">
const { isLoggedIn } = useAuthState()
</script>

<template>
  <div>
    <h1>OverGaming</h1>
    <p>Bienvenido a OverGaming</p>

    <nav>
      <template v-if="isLoggedIn">
        <NuxtLink to="/dashboard">
          Dashboard
        </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink to="/login">
          Iniciar sesion
        </NuxtLink>
        &nbsp;|&nbsp;
        <NuxtLink to="/register">
          Registrarse
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>
