<template>
  <div class="login-container">
    <div class="login-card-wrapper">
      <div class="login-card">
        <div class="gradient-header"></div>

        <div class="card-content">
          <div class="back-link-container">
            <a href="#" class="back-link">← Back</a>
          </div>

          <div class="header-section">
            <div class="logo-container">
              <img src="/create-account-illustration.png" alt="Login Icon" class="logo-image" />
            </div>
            <h1 class="page-title">Login</h1>
            <p class="page-subtitle">Sign in to access your account</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
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

            <button
              type="submit"
              :disabled="loading"
              class="submit-button"
              :class="{ 'button-loading': loading }"
            >
              <span v-if="loading">Logging in...</span>
              <span v-else>Login</span>
            </button>

            <div class="messages-container">
              <p v-if="message" class="success-message">{{ message }}</p>
              <p v-if="error" class="error-message">{{ error }}</p>
            </div>
          </form>

          <div class="signup-container">
            <p class="signup-text">
              Don't have an account? <a href="/auth/signup" class="signup-link">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emailOrPhone = ref('');
const password = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');
const showPassword = ref(false);



const handleLogin = async () => {
  message.value = '';
  error.value = '';

  if (!emailOrPhone.value || !password.value) {
    error.value = 'Both fields are required.';
    return;
  }

  loading.value = true;

  try {
    // Updated to use the correct API endpoint
    const response = await fetch('https://user.bloomrydes.org/api/v1/interstate/login-user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    emailOrPhone: emailOrPhone.value, // Changed from phone to emailOrPhone
    password: password.value,
  }),
});
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed.');
    }

    // Store token and user info
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    message.value = data.message || 'Login successful!';
    emailOrPhone.value = '';
    password.value = '';
console.log(emailOrPhone.value, password.value);
    // Redirect to dashboard after successful login
    setTimeout(() => {
      router.push('/home');
    }, 1500);
  } catch (err) {
    console.error('Login error:', err);
    error.value = err.message || 'An error occurred during login. Please try again.';
  } finally {
    loading.value = false;
  }
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

/* New signup container styles */
.signup-container {
  margin-top: 24px;
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.signup-text {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}

.signup-link {
  color: #4f46e5;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.signup-link:hover {
  color: #4338ca;
  text-decoration: underline;
}
</style>