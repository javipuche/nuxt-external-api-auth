<script setup lang="ts">
/**
 * Renderless component that exposes auth state via scoped slots.
 *
 * Useful in templates where you want conditional rendering without
 * importing the composable directly. Perfect for layouts and nav bars.
 *
 * Usage:
 * ```vue
 * <AuthState v-slot="{ isLoggedIn, user, clear }">
 *   <span v-if="isLoggedIn">{{ user?.displayName }}</span>
 *   <button v-if="isLoggedIn" @click="clear">Logout</button>
 *   <NuxtLink v-else to="/login">Login</NuxtLink>
 * </AuthState>
 * ```
 */
const { user, isLoggedIn, clear } = useAuthState()
</script>

<template>
  <slot
    :user="user"
    :is-logged-in="isLoggedIn"
    :clear="clear"
  />
</template>
