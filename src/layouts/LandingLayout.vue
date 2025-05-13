<template>
  <div class="landing-layout">
    <!-- Navigation Header -->
    <header class="landing-header" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <div class="header-content">
          <div class="brand">
            <img src="/logo.png" alt="Bloomrydes Logo" class="logo" />
            <h1 class="brand-name">Bloomrydes</h1>
          </div>
          
          <!-- Desktop Navigation -->
          <nav class="desktop-nav d-none d-md-flex">
            <ul class="nav-links">
              <li v-for="link in navLinks" :key="link.path">
                <router-link :to="link.path">{{ link.label }}</router-link>
              </li>
            </ul>
          </nav>
          
          <!-- Action Buttons -->
          <div class="header-actions">
            <v-btn
              variant="text"
              color="primary"
              to="/auth/login"
              class="login-btn"
            >
              Log In
            </v-btn>
            <v-btn
              color="primary"
              to="/auth/register"
              class="register-btn"
            >
              Get Started
            </v-btn>
            
            <!-- Mobile Menu Trigger -->
            <v-btn
              icon
              variant="text"
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="menu-trigger d-md-none"
            >
              <v-icon>{{ mobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Mobile Navigation Menu -->
    <div class="mobile-menu d-md-none" v-if="mobileMenuOpen">
      <div class="container">
        <nav>
          <ul class="mobile-nav-links">
            <li v-for="link in navLinks" :key="link.path">
              <router-link 
                :to="link.path" 
                @click="mobileMenuOpen = false"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
          <div class="mobile-actions">
            <v-btn
              block
              variant="outlined"
              color="primary"
              to="/auth/login"
              class="mb-3"
              @click="mobileMenuOpen = false"
            >
              Log In
            </v-btn>
            <v-btn
              block
              color="primary"
              to="/auth/register"
              @click="mobileMenuOpen = false"
            >
              Get Started
            </v-btn>
          </div>
        </nav>
      </div>
    </div>
    
    <!-- Main Content -->
    <main class="landing-content">
      <router-view />
    </main>
    
    <!-- Footer -->
    <footer class="landing-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <img src="/logo.png" alt="Bloomrydes Logo" class="footer-logo" />
            <p class="footer-tagline">
              Seamless transportation and logistics services across Nigeria
            </p>
            <div class="social-links">
              <a href="#" aria-label="Facebook">
                <v-icon>mdi-facebook</v-icon>
              </a>
              <a href="#" aria-label="Twitter">
                <v-icon>mdi-twitter</v-icon>
              </a>
              <a href="#" aria-label="Instagram">
                <v-icon>mdi-instagram</v-icon>
              </a>
              <a href="#" aria-label="LinkedIn">
                <v-icon>mdi-linkedin</v-icon>
              </a>
            </div>
          </div>
          
          <div class="footer-links">
            <div class="footer-section">
              <h3>Services</h3>
              <ul>
                <li><a href="#">Interstate Travel</a></li>
                <li><a href="#">Cargo Delivery</a></li>
                <li><a href="#">Bus Booking</a></li>
                <li><a href="#">Taxi Services</a></li>
              </ul>
            </div>
            
            <div class="footer-section">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>
            
            <div class="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} Bloomrydes. All rights reserved.</p>
          <div class="language-selector">
            <v-select
              :items="['English', 'Yoruba', 'Igbo', 'Hausa']"
              label="Language"
              density="compact"
              variant="plain"
              hide-details
              class="language-select"
            ></v-select>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Navigation links
const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// Mobile menu state
const mobileMenuOpen = ref(false);

// Scroll state for header styling
const isScrolled = ref(false);

// Handle scroll event to change header style
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// Add and remove scroll listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header Styles */
.landing-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: transparent;
  transition: all 0.3s ease;
  padding: 1rem 0;
}

.landing-header.scrolled {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
}

.logo {
  height: 36px;
  width: auto;
  margin-right: 0.75rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976d2;
  margin: 0;
}

/* Desktop Navigation */
.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
}

.nav-links a {
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 0.5rem 0;
  position: relative;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #1976d2;
}

.nav-links a.router-link-active:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1976d2;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 99;
  padding: 1.5rem 0;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
}

.mobile-nav-links {
  list-style: none;
  margin: 0 0 1.5rem 0;
  padding: 0;
}

.mobile-nav-links li {
  margin-bottom: 0.75rem;
}

.mobile-nav-links a {
  display: block;
  padding: 0.75rem 0;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.125rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-nav-links a.router-link-active {
  color: #1976d2;
}

/* Main Content */
.landing-content {
  min-height: 500px; /* Adjust based on your content needs */
}

/* Footer Styles */
.landing-footer {
  background-color: #f5f7fa;
  padding: 4rem 0 1.5rem;
  margin-top: 2rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-brand {
  flex: 1;
  min-width: 250px;
}

.footer-logo {
  height: 32px;
  width: auto;
  margin-bottom: 1rem;
}

.footer-tagline {
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(25, 118, 210, 0.1);
  color: #1976d2;
  transition: all 0.2s ease;
}

.social-links a:hover {
  background-color: #1976d2;
  color: white;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  flex: 2;
}

.footer-section {
  flex: 1;
  min-width: 160px;
}

.footer-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: rgba(0, 0, 0, 0.9);
}

.footer-section ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.75rem;
}

.footer-section a {
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-section a:hover {
  color: #1976d2;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.footer-bottom p {
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
}

.language-select {
  max-width: 120px;
  font-size: 0.875rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 2.5rem;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>