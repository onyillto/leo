<template>
  <v-app>
    <!-- Desktop Sidebar Navigation - Hidden on "/" and "/path" -->
    <v-navigation-drawer
      v-if="!hideNavigation && isAuthenticated"
      v-model="drawer"
      app
      permanent
      color="blue"
      class="d-none d-md-flex app-navigation-drawer"
    >
      <v-list>
        <v-list-item
          v-for="item in navigation"
          :key="item.segment"
          :to="item.segment === '' ? '/' : `/${item.segment}`"
          :prepend-icon="item.icon"
          :title="item.title"
          color="white"
        />
      </v-list>
    </v-navigation-drawer>
    
    <!-- Main Content -->
    <v-main class="app-main-content" :class="{ 'no-sidebar': hideNavigation || !isAuthenticated }">
      <router-view />
    </v-main>
    
    <!-- Mobile Bottom Navigation - Hidden on "/" and "/path" -->
    <v-bottom-navigation
      v-if="!hideNavigation && isAuthenticated"
      v-model="activeNav"
      color="blue"
      class="d-md-none app-bottom-nav"
      grow
      app
    >
      <v-btn
        v-for="item in navigation"
        :key="item.segment"
        :to="item.segment === '' ? '/' : `/${item.segment}`"
        :value="item.segment"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span class="text-caption d-none d-sm-block">{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const drawer = ref(true);
const activeNav = ref('');
const isAuthenticated = ref(false);

// Hide navigation on specific routes
const hideNavigation = computed(() => {
  return route.path === '/' || route.path === '/path';
});

const navigation = [
  { segment: "home", title: "Home", icon: "mdi-home" },
  { segment: "transaction", title: "Transaction", icon: "mdi-view-dashboard" },
  { segment: "profile", title: "Profile", icon: "mdi-account" },
  { segment: "logout", title: "Logout", icon: "mdi-logout" },
];

// Check if user is authenticated by verifying token
const checkAuthentication = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    isAuthenticated.value = false;
    // Redirect to login if not authenticated and not on a public route
    if (!isPublicRoute(route.path)) {
      router.push('/auth/login');
    }
    return;
  }
  
  // Token exists, update authenticated state
  isAuthenticated.value = true;
  
  // Handle logout navigation item click
  if (route.path === '/logout') {
    logout();
  }
};

// Determine if route is public (doesn't require authentication)
const isPublicRoute = (path) => {
  const publicRoutes = ['/', '/path', '/auth/login', '/auth/signup'];
  return publicRoutes.some(route => path.startsWith(route));
};

// Logout function
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  isAuthenticated.value = false;
  router.push('/auth/login');
};

const updateActiveNav = () => {
  const path = route.path.replace('/', '');
  activeNav.value = path || '';
};

// Update active nav & bottom nav padding on route change
onMounted(() => {
  checkAuthentication();
  updateActiveNav();
  // Delay to ensure DOM is rendered
  nextTick(() => {
    handleResize();
  });
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

watch(() => route.path, () => {
  // Check authentication on each route change
  checkAuthentication();
  updateActiveNav();
  // Delay to ensure DOM updates before measuring
  nextTick(() => {
    handleResize();
  });
});

const handleResize = () => {
  const bottomNav = document.querySelector('.app-bottom-nav');
  const mainWrap = document.querySelector('.app-main-content > .v-main__wrap');
  
  if (mainWrap) {
    if (hideNavigation.value || !isAuthenticated.value) {
      // Reset padding completely for hidden navigation routes
      mainWrap.style.paddingLeft = '0';
      mainWrap.style.paddingBottom = '0';
    } else {
      // Set padding for routes with navigation
      if (bottomNav && window.innerWidth < 960) {
        const navHeight = bottomNav.offsetHeight;
        mainWrap.style.paddingBottom = `${navHeight}px`;
      }
    }
  }
};
</script>

<style scoped>
.app-main-content {
  padding: 16px !important;
}

.no-sidebar {
  padding-left: 0 !important; /* Use 0 instead of 16px to avoid conflicts */
}

@media (min-width: 960px) {
  .app-main-content:not(.no-sidebar) {
    padding-left: 256px !important;
  }
}

@media (max-width: 960px) {
  :deep(.v-container) {
    padding: 8px !important;
    margin: 0 !important;
    max-width: 100% !important;
  }
}

/* Use more specific selectors to avoid style conflicts */
:deep(.app-navigation-drawer) {
  background-color: #1976d2 !important;
}

:deep(.app-navigation-drawer .v-list-item__title), 
:deep(.app-navigation-drawer .v-list-item__prepend .v-icon) {
  color: white !important;
}

:deep(.app-navigation-drawer .v-list-item--active) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.app-bottom-nav) {
  background-color: #1976d2 !important;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
}

:deep(.app-bottom-nav .v-btn) {
  color: white !important;
}

:deep(.app-bottom-nav .v-btn--active) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
