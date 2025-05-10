<template>
  <div class="auth-layout">
    <h1>Welcome to Tix</h1>
    <div class="auth-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// No special logic needed
</script>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
.auth-container {
  width: 100%;
  max-width: 400px;
  margin-top: 1rem;
}
</style>
