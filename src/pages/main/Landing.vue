<template>
  <div class="download-app-page">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="logo">
        <img src="/logo.png" alt="BloomRyde Logo" />
        <span>BloomRyde</span>
      </div>
      
      <div class="nav-links">
        <router-link to="/auth/login" class="nav-link">Sign In</router-link>
        <router-link to="/auth/signup" class="get-started-btn">Get Started</router-link>
      </div>
    </nav>
    
    <!-- Main Content -->
    <div class="content-container">
      <div class="app-info">
        <h1>Your Interstate Travel<br />Just Got Easier</h1>
        <p>Download the BloomRyde app to book bus, taxi, and cargo services across Nigeria with over 200+ routes.</p>
        
        <div class="app-badges">
          <a href="https://apps.apple.com/us/app/bloomrydes/id1491366935" class="app-badge">
            <img src="/appstore.png" alt="Download on App Store" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.bloomrydes.bloom" class="app-badge">
            <img src="/googleplay.png" alt="Get it on Google Play" />
          </a>
        </div>
        
        <div class="app-features">
          <div class="feature">
            <div class="feature-icon">
              <v-icon>mdi-map-marker</v-icon>
            </div>
            <span>200+ Routes</span>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <v-icon>mdi-shield-check</v-icon>
            </div>
            <span>Secure Booking</span>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <v-icon>mdi-wallet</v-icon>
            </div>
            <span>Easy Payment</span>
          </div>
        </div>
      </div>
      
      <div class="app-preview">
        <img src="/app-preview.jpeg" alt="BloomRyde App Preview" class="phone-mockup" />
      </div>
    </div>
  </div>
</template>

<script setup>
// No complex logic needed for this page
</script>

<style scoped>
.download-app-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
  color: white;
  font-family: 'Inter', sans-serif;
}

/* Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 2.5rem;
  width: auto;
  margin-right: 0.75rem;
}

.logo span {
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  opacity: 0.8;
}

.get-started-btn {
  background-color: white;
  color: #1976d2;
  padding: 0.6rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.get-started-btn:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

/* Main Content */
.content-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: calc(100vh - 5rem);
}

.app-info {
  max-width: 550px;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.25rem;
  line-height: 1.5;
  opacity: 0.9;
  margin-bottom: 2.5rem;
}

.app-badges {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.app-badge img {
  height: 3rem;
  transition: transform 0.2s ease;
}

.app-badge:hover img {
  transform: translateY(-5px);
}

.app-features {
  display: flex;
  gap: 2rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.feature span {
  font-weight: 500;
}

.app-preview {
  position: relative;
}

.phone-mockup {
  max-height: 600px;
  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.3));
}

/* Responsive Design */
@media (max-width: 992px) {
  .content-container {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
  
  .app-badges {
    justify-content: center;
  }
  
  .app-features {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }
  
  .logo img {
    height: 2rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  .phone-mockup {
    max-height: 400px;
  }
}

@media (max-width: 480px) {
  .app-features {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .app-badges {
    flex-direction: column;
    align-items: center;
  }
  
  .get-started-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
  
  h1 {
    font-size: 1.75rem;
  }
}
</style>