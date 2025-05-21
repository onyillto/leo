// First, add the missing email field to your form
<template>
  <div class="register-container">
    <span class="back-arrow" @click="goBack">←</span>
    <img src="/create-account-illustration.png" alt="Create Account" class="illustration" />
    <h2 class="title">Create Account</h2>

    <form @submit.prevent="handleRegister" class="register-form">
      <input v-model.trim="name" type="text" placeholder="Full Name" required />
      <input v-model.trim="email" type="email" placeholder="Email Address" required /> <!-- Added email field -->
      <input v-model.trim="phone" type="tel" placeholder="Phone Number" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Registering...' : 'Continue' }}
      </button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <div class="signin-container">
      <p class="signin-text">
        Already have an account? <a href="/login" class="signin-link">Sign in</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref(''); // Added email ref
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');

const goBack = () => {
  router.go(-1);
};

const handleRegister = async () => {
  // Reset error and message
  error.value = '';
  message.value = '';

  // Validate form
  if (!name.value || !email.value || !phone.value || !password.value || !confirmPassword.value) {
    error.value = 'All fields are required.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  loading.value = true;

  try {
    const response = await fetch('https://user.bloomrydes.org/api/v1/interstate/register-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value, // Include email
        phone: phone.value,
        password: password.value,
        confirmPassword: confirmPassword.value, // Include confirmPassword
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed.');
    }

    message.value = data.message || 'Registration successful!';
    
    // Clear form after successful registration
    name.value = '';
    email.value = '';
    phone.value = '';
    password.value = '';
    confirmPassword.value = '';
    
    // Redirect to login page after successful registration
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (err) {
    console.error('Registration error:', err);
    error.value = err.message || 'An error occurred during registration. Please try again.';
  } finally {
    loading.value = false;
  }
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

/* Sign In link styles */
.signin-container {
  margin-top: 1.5rem;
  text-align: center;
}

.signin-text {
  color: #6b7280;
  font-size: 0.875rem;
}

.signin-link {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.signin-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}
</style>

