<template>
  <slot :user="user" :is-logged-in="isLoggedIn" :clear="clear" />
</template>

<script setup lang="ts">
const { user, isLoggedIn, clear } = useAuthState();
</script>
