<template>
  <v-app>
    <!-- Navigation Drawer with Blue Background -->
    <v-navigation-drawer v-model="drawer" app permanent color="blue">
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
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
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
    segment: "dashboard",
    title: "Dashboard",
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
/* Ensure the navigation drawer's background is blue */
:deep(.v-navigation-drawer) {
  background-color: #1976d2 !important; /* Vuetify's default blue, override if needed */
}

/* Ensure all text and icons in the sidebar are white */
:deep(.v-list-item__title),
:deep(.v-list-item__prepend .v-icon) {
  color: white !important;
}

/* Optional: Style active item (e.g., highlight when selected) */
:deep(.v-list-item--active) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Skeleton loader styling (if used in child components) */
.v-skeleton-loader {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.11);
}

/* Theme-specific styles for skeleton loaders */
:deep(.v-theme--light) .v-skeleton-loader {
  background-color: rgba(0, 0, 0, 0.11);
}

:deep(.v-theme--dark) .v-skeleton-loader {
  background-color: rgba(255, 255, 255, 0.11);
}
</style>