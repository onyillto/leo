<template>
  <div class="auth-layout">
    <!-- Left branding section -->
    <div class="auth-branding">
      <div class="branding-content">
        <img src="/logo.png" alt="Ngbuka Logo" class="logo" />
        <h2 class="title">Welcome to Bloomrydes</h2>
        <p class="subtitle">Connect with vendors seamlessly.</p>
      </div>
    </div>
    <!-- Right form section -->
    <div class="auth-form">
      <div class="auth-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic needed for layout
</script>

<style scoped>
.auth-layout {
  display: flex;
  min-height: 100vh;
}

.auth-branding {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2563eb; /* Ngbuka blue */
  padding: 2rem;
  color: white;
}

.branding-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 300px;
}

.logo {
  width: 140px;
  height: auto;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.subtitle {
  font-size: 0.875rem;
  margin-top: 0.5rem;
  opacity: 0.9;
}

.auth-form {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6; /* Light gray */
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

/* Mobile: Hide branding section and adjust form */
@media (max-width: 768px) {
  .auth-branding {
    display: none;
  }
  .auth-form {
    flex: none;
    width: 100%;
    padding: 1rem;
  }
}
</style>
