<template>
  <div>
    <h1>Welcome</h1>

    <nav>
      <template v-if="isLoggedIn">
        <NuxtLink to="/dashboard"> Dashboard </NuxtLink>
        &nbsp;|&nbsp;
        <NuxtLink to="/user"> Fresh User Data </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink to="/login"> Login </NuxtLink>
        &nbsp;|&nbsp;
        <NuxtLink to="/register"> Register </NuxtLink>
      </template>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn } = useAuthState();
</script>
