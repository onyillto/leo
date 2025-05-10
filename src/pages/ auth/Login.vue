<template>
  <form @submit.prevent="handleLogin">
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('Logging in with:', email.value, password.value);
  // Simulate API call
};
</script>

<style scoped>
input {
  display: block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
}
button {
  padding: 0.5rem;
  width: 100%;
  margin-top: 1rem;
}
</style>
