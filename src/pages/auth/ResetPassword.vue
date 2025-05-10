<template>
  <div class="password-reset-container">
    <div class="reset-card-wrapper">
      <!-- Card -->
      <div class="reset-card">
        <!-- Card header with gradient -->
        <div class="gradient-header"></div>
        
        <div class="card-content">
          <!-- Logo and Title -->
          <div class="header-section">
            <div class="logo-container">
              <img src="/public/key.png" alt="Key Icon" class="logo-image" />
            </div>
            <h1 class="page-title">Reset Password</h1>
            <p class="page-subtitle">Please create a secure password for your account</p>
          </div>
          
          <!-- Form -->
          <form @submit.prevent="handleReset" class="reset-form">
            <!-- Password Field -->
            <div class="form-group">
              <label class="input-label">New Password</label>
              <div class="password-input-container">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your new password"
                  required
                  class="password-input"
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
              <p class="input-hint">Must be at least 8 characters</p>
            </div>
            
            <!-- Confirm Password Field -->
            <div class="form-group">
              <label class="input-label">Confirm Password</label>
              <input
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Confirm your new password"
                required
                class="password-input"
              />
            </div>
            
            <!-- Password Strength Indicator (optional) -->
            <div v-if="password" class="strength-meter-container">
              <div 
                class="strength-meter"
                :class="passwordStrengthClass"
                :style="{ width: passwordStrength + '%' }"
              ></div>
            </div>
            
            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="submit-button"
              :class="{ 'button-loading': isSubmitting }"
            >
              <span v-if="isSubmitting">Processing...</span>
              <span v-else>Reset Password</span>
            </button>
          </form>
          
          <!-- Messages -->
          <div class="messages-container">
            <p v-if="message" class="success-message">{{ message }}</p>
            <p v-if="error" class="error-message">{{ error }}</p>
          </div>
        </div>
      </div>
      
      <!-- Back to login link -->
      <div class="login-link-container">
        <a href="#" class="login-link">Return to login</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const password = ref('');
const confirmPassword = ref('');
const message = ref('');
const error = ref('');
const showPassword = ref(false);
const isSubmitting = ref(false);

// Password strength calculation
const passwordStrength = computed(() => {
  if (!password.value) return 0;
  
  let strength = 0;
  // Length check
  if (password.value.length >= 8) strength += 25;
  // Contains number
  if (/\d/.test(password.value)) strength += 25;
  // Contains lowercase
  if (/[a-z]/.test(password.value)) strength += 25;
  // Contains uppercase or special char
  if (/[A-Z]/.test(password.value) || /[^a-zA-Z0-9]/.test(password.value)) strength += 25;
  
  return strength;
});

// CSS class based on password strength
const passwordStrengthClass = computed(() => {
  if (passwordStrength.value < 50) return 'strength-weak';
  if (passwordStrength.value < 75) return 'strength-medium';
  return 'strength-strong';
});

const handleReset = () => {
  // Reset previous messages
  message.value = '';
  error.value = '';
  
  // Validation
  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters long';
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }
  
  // Submit form
  isSubmitting.value = true;
  console.log('Resetting password...');
  
  // Simulate API call
  setTimeout(() => {
    message.value = 'Password reset successfully! You can now log in.';
    password.value = '';
    confirmPassword.value = '';
    isSubmitting.value = false;
  }, 1000);
};
</script>

<style scoped>
.password-reset-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
}

.reset-card-wrapper {
  width: 100%;
  max-width: 420px;
}

.reset-card {
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

.reset-form {
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

.password-input-container {
  position: relative;
}

.password-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
}

.password-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
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

.input-hint {
  font-size: 12px;
  color: #6b7280;
  margin: 4px 0 0 0;
}

.strength-meter-container {
  width: 100%;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.strength-meter {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s, background-color 0.3s;
}

.strength-meter.strength-weak {
  background-color: #ef4444;
}

.strength-meter.strength-medium {
  background-color: #f59e0b;
}

.strength-meter.strength-strong {
  background-color: #10b981;
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

.login-link-container {
  text-align: center;
  margin-top: 16px;
}

.login-link {
  color: #4f46e5;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
}

.login-link:hover {
  color: #4338ca;
}
</style>
