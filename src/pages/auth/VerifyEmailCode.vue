```vue
<template>
  <div class="verification-container">
    <div class="verification-card-wrapper">
      <!-- Card -->
      <div class="verification-card">
        <!-- Gradient header -->
        <div class="gradient-header"></div>

        <div class="card-content">
          <!-- Back link -->
          <div class="back-link-container">
            <a href="#" class="back-link">← Back</a>
          </div>

          <!-- Logo and Title -->
          <div class="header-section">
            <div class="logo-container">
              <img src="/public/key.png" alt="Email Verification Icon" class="logo-image" />
            </div>
            <h1 class="page-title">Verify Your Email</h1>
            <p class="page-subtitle">Enter the 6-digit code sent to your email</p>
          </div>

          <!-- Verification Form -->
          <form @submit.prevent="verifyCode" class="verification-form">
            <!-- Code Field -->
            <div class="form-group">
              <label class="input-label">Verification Code</label>
              <input
                v-model="code"
                type="text"
                maxlength="6"
                placeholder="Enter 6-digit code"
                required
                class="input-field"
                @input="restrictToNumbers"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="submit-button"
              :class="{ 'button-loading': isSubmitting }"
            >
              <span v-if="isSubmitting">Verifying...</span>
              <span v-else>Verify</span>
            </button>

            <!-- Messages -->
            <div class="messages-container">
              <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const code = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const restrictToNumbers = (event) => {
  code.value = event.target.value.replace(/[^0-9]/g, '');
};

const verifyCode = () => {
  // Reset messages
  successMessage.value = '';
  errorMessage.value = '';

  // Validation
  if (code.value.length !== 6) {
    errorMessage.value = 'Please enter a 6-digit code.';
    return;
  }

  isSubmitting.value = true;

  // Simulate verification
  setTimeout(() => {
    if (code.value === '123456') {
      successMessage.value = 'Email verified successfully! You can now log in.';
      code.value = '';
    } else {
      errorMessage.value = 'Invalid verification code.';
    }
    isSubmitting.value = false;
  }, 1000);
};
</script>

<style scoped>
.verification-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  
  padding: 20px;
}

.verification-card-wrapper {
  width: 100%;
  max-width: 420px;
}

.verification-card {

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

.verification-form {
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
  text-align: center;
  letter-spacing: 4px;
  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
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
