<template>
  <div class="login-container">
    <div class="login-card-wrapper">
      <!-- Card -->
      <div class="login-card">
        <!-- Gradient header -->
        <div class="gradient-header"></div>

        <div class="card-content">
          <!-- Back to previous page link -->
          <div class="back-link-container">
            <a href="#" class="back-link">← Back</a>
          </div>

          <!-- Logo and Title -->
          <div class="header-section">
            <div class="logo-container">
              <img src="/create-account-illustration.png" alt="Login Icon" class="logo-image" />
            </div>
            <h1 class="page-title">Login</h1>
            <p class="page-subtitle">Sign in to access your account</p>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="login-form">
            <!-- Email/Phone Field -->
            <div class="form-group">
              <label class="input-label">Email or Phone</label>
              <input
                v-model.trim="emailOrPhone"
                type="text"
                placeholder="Enter your email or phone"
                required
                class="input-field"
              />
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <label class="input-label">Password</label>
              <div class="password-input-container">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  required
                  class="input-field"
                />
                <button
                  @click.prevent="showPassword = !showPassword"
                  type="button"
                  class="visibility-toggle"
                >
                  <span v-if="showPassword">Hide</span>
                  <span v-else>Show</span>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="submit-button"
              :class="{ 'button-loading': loading }"
            >
              <span v-if="loading">Logging in...</span>
              <span v-else>Login</span>
            </button>

            <!-- Messages -->
            <div class="messages-container">
              <p v-if="message" class="success-message">{{ message }}</p>
              <p v-if="error" class="error-message">{{ error }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emailOrPhone = ref('');
const password = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');
const showPassword = ref(false);

const handleLogin = async () => {
  // Reset messages
  message.value = '';
  error.value = '';

  // Validation
  if (!emailOrPhone.value || !password.value) {
    error.value = 'Both fields are required.';
    return;
  }

  loading.value = true;

  // Simulate login delay
  setTimeout(() => {
    // Example login success condition
    if (emailOrPhone.value === 'user@example.com' && password.value === 'password') {
      message.value = 'Login successful!';
      emailOrPhone.value = '';
      password.value = '';
    } else {
      error.value = 'Invalid credentials.';
    }
    loading.value = false;
  }, 1000);
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  
  padding: 20px;
}

.login-card-wrapper {
  width: 100%;
  max-width: 420px;
}

.login-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.gradient-header {
  height: 8px;
  background: linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6);
}

.card-content {
  padding: 32px;
}

.back-link-container {
  margin-bottom: 16px;
}

.back-link {
  color: #4f46e5;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #4338ca;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.logo-container {
  background-color: #e0e7ff;
  padding: 12px;
  border-radius: 50%;
  margin-bottom: 16px;
}

.logo-image {
  width: 40px;
  height: 40px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.page-subtitle {
  color: #6b7280;
  text-align: center;
  font-size: 14px;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
}

.input-field {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.password-input-container {
  position: relative;
}

.visibility-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 14px;
}

.visibility-toggle:hover {
  color: #374151;
}

.submit-button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #4338ca;
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.4);
}

.submit-button:disabled {
  background-color: #818cf8;
  cursor: not-allowed;
}

.button-loading {
  opacity: 0.8;
}

.messages-container {
  margin-top: 16px;
}

.success-message {
  background-color: #ecfdf5;
  color: #047857;
  text-align: center;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin: 0;
}

.error-message {
  background-color: #fef2f2;
  color: #b91c1c;
  text-align: center;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin: 0;
}
</style>
