<template>
  <div>
    <h1>Fresh User Data</h1>

    <div v-if="user">
      <p>
        Hello, <strong>{{ user.displayName }}</strong>
      </p>
      <p>Email: {{ user.email }}</p>
      <p v-if="user.username">Username: @{{ user.username }}</p>
    </div>

    <hr />

    <p>
      <NuxtLink to="/"> Back to home </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const { data: user } = useAuthUser();
</script>
