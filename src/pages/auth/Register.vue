<template>
  <div class="register-container">
    <!-- Back arrow -->
    <span class="back-arrow">←</span>

    <!-- Illustration image -->
    <img src="/create-account-illustration.png" alt="Create Account" class="illustration" />

    <!-- Title -->
    <h2 class="title">Create Account</h2>

    <!-- Registration Form -->
    <form @submit.prevent="handleRegister" class="register-form">
      <input
        v-model.trim="name"
        type="text"
        placeholder="Full Name"
        required
      />
      <input
        v-model.trim="email"
        type="tel"
        placeholder="Phone Number"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Registering...' : 'Continue' }}
      </button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'All fields are required.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  loading.value = true;
  error.value = '';
  message.value = '';

  setTimeout(() => {
    message.value = 'Registration successful!';
    loading.value = false;

    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
  }, 1000);
};
</script>

<style scoped>
.register-container {
  max-width: auto;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
}

.back-arrow {
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
}

.illustration {
  display: block;
  width: 120px;
  margin: 3rem auto 1.5rem;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.register-form input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.75rem;
  width: 100%;
  border: 1px solid #2563eb; /* blue border */
  border-radius: 0.5rem;
  font-size: 1rem;
}

button {
  display: block;
  width: 100%;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.75rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  background-color: #93c5fd;
}

.success {
  color: green;
  text-align: center;
  margin-top: 1rem;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>

