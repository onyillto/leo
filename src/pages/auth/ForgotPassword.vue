<template>
  <div class="reset-container">
    <form @submit.prevent="handleReset" class="reset-form">
      <div class="image-container">
        <img src="/public/key.png" alt="Key Icon" class="center-image" />
      </div>
      <h2>Reset Password</h2>
      <p>Please enter your new password below.</p>
      
      <div class="input-group">
        <label>New Password</label>
        <div class="password-field">
          <input 
            v-model="password" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Enter new password" 
            required 
          />
          <button 
            type="button" 
            class="toggle-button" 
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>
      
      <div class="input-group">
        <label>Confirm Password</label>
        <input 
          v-model="confirmPassword" 
          :type="showPassword ? 'text' : 'password'" 
          placeholder="Confirm new password" 
          required 
        />
      </div>
      
      <div v-if="password" class="strength-meter">
        <div class="strength-bar" :style="{ width: passwordStrength + '%' }" :class="strengthClass"></div>
        <span class="strength-text">Password strength: {{ strengthLabel }}</span>
      </div>
      
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Processing...' : 'Reset Password' }}
      </button>
      
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const message = ref('');
const error = ref('');
const isSubmitting = ref(false);

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

const strengthClass = computed(() => {
  if (passwordStrength.value < 50) return 'weak';
  if (passwordStrength.value < 75) return 'medium';
  return 'strong';
});

const strengthLabel = computed(() => {
  if (passwordStrength.value < 50) return 'Weak';
  if (passwordStrength.value < 75) return 'Medium';
  return 'Strong';
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
  
  setTimeout(() => {
    message.value = 'Password reset successfully. You can now log in.';
    password.value = '';
    confirmPassword.value = '';
    isSubmitting.value = false;
  }, 1000);
};
</script>

<style scoped>
.reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 1rem;
}

.reset-form {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.center-image {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 8px;
  background-color: #f0f7ff;
}

.reset-form h2 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.reset-form p {
  text-align: center;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  color: #555;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.password-field {
  position: relative;
}

.toggle-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #2563eb;
  font-size: 0.85rem;
  cursor: pointer;
}

.reset-form input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.reset-form input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.strength-meter {
  margin-bottom: 1.5rem;
}

.strength-bar {
  height: 6px;
  border-radius: 3px;
  margin-bottom: 6px;
  transition: width 0.3s, background-color 0.3s;
}

.strength-bar.weak {
  background-color: #ef4444;
}

.strength-bar.medium {
  background-color: #f59e0b;
}

.strength-bar.strong {
  background-color: #10b981;
}

.strength-text {
  font-size: 0.8rem;
  color: #666;
}

.reset-form button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reset-form button[type="submit"]:hover {
  background-color: #1e40af;
}

.reset-form button[type="submit"]:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.success {
  color: green;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.error {
  color: #dc2626;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
