<template>
  <form @submit.prevent="handleRegister">
    <h2>Register</h2>
    <input v-model="name" type="text" placeholder="Full Name" required />
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Register</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = () => {
  console.log('Registering:', name.value, email.value);
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
