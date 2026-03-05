<template>
  <div>
    <h1>Bienvenido</h1>

    <nav>
      <template v-if="isLoggedIn">
        <NuxtLink to="/dashboard"> Dashboard </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink to="/login"> Iniciar sesion </NuxtLink>
        &nbsp;|&nbsp;
        <NuxtLink to="/register"> Registrarse </NuxtLink>
      </template>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn } = useAuthState();
</script>
