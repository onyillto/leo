<template>
  <v-app>
    <!-- Desktop Sidebar Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      app
      permanent
      color="blue"
      class="d-none d-md-flex"
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
    <v-main class="main-content">
      <router-view />
    </v-main>

    <!-- Mobile Bottom Navigation -->
    <v-bottom-navigation
      color="blue"
      class="d-md-none bottom-nav"
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
import { ref } from "vue";

const drawer = ref(true);

const navigation = [
  {
    segment: "",
    title: "Home",
    icon: "mdi-home",
  },
  {
    segment: "transaction",
    title: "Transaction",
    icon: "mdi-view-dashboard",
  },
  {
    segment: "profile",
    title: "Profile",
    icon: "mdi-account",
  },
  {
    segment: "logout",
    title: "Logout",
    icon: "mdi-logout",
  },
];
</script>

<style scoped>
/* Desktop sidebar styles */
:deep(.v-navigation-drawer) {
  background-color: #1976d2 !important;
}

:deep(.v-list-item__title),
:deep(.v-list-item__prepend .v-icon) {
  color: white !important;
}

:deep(.v-list-item--active) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Full width main content */
.main-content {
  padding: 0 !important;
  margin: 0 !important;
}

/* Ensure container is full width and padding-free on mobile */
@media (max-width: 960px) {
  :deep(.v-container) {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
  }
}

/* Mobile bottom navigation styles */
:deep(.v-bottom-navigation) {
  background-color: #1976d2 !important;
}

:deep(.v-bottom-navigation .v-btn) {
  color: white !important;
}

:deep(.v-bottom-navigation .v-btn--active) {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Fix bottom nav to screen bottom */
:deep(.bottom-nav) {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
}

/* Push main content above bottom nav on mobile */
:deep(.v-main__wrap) {
  padding-bottom: 56px; /* height of bottom nav */
}

/* Skeleton loader styling */
.v-skeleton-loader {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.11);
}

:deep(.v-theme--light) .v-skeleton-loader {
  background-color: rgba(0, 0, 0, 0.11);
}

:deep(.v-theme--dark) .v-skeleton-loader {
  background-color: rgba(255, 255, 255, 0.11);
}
</style>
