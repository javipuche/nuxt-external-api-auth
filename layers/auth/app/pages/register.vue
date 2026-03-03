<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

const email = ref('')
const password = ref('')
const displayName = ref('')
const username = ref('')

const { mutate: signUp, status, error } = useSignUp()

function handleSubmit() {
  signUp({
    email: email.value,
    password: password.value,
    displayName: displayName.value,
    username: username.value,
  })
}
</script>

<template>
  <div>
    <h1>Registrarse</h1>

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="displayName">Nombre</label>
        <input
          id="displayName"
          v-model="displayName"
          type="text"
          required
          placeholder="John Doe"
        >
      </div>

      <div>
        <label for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
          minlength="3"
          maxlength="20"
          pattern="^[a-zA-Z0-9_]+$"
          placeholder="johndoe"
        >
      </div>

      <div>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          placeholder="user@example.com"
        >
      </div>

      <div>
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          minlength="8"
          autocomplete="new-password"
          placeholder="********"
        >
      </div>

      <p v-if="error" style="color: red;">
        {{ (error as any)?.data?.message || error.message || 'Error al registrarse' }}
      </p>

      <button type="submit" :disabled="status === 'pending'">
        {{ status === 'pending' ? 'Cargando...' : 'Crear cuenta' }}
      </button>
    </form>

    <p>
      <NuxtLink to="/login">
        Ya tienes cuenta? Inicia sesion
      </NuxtLink>
    </p>
  </div>
</template>
