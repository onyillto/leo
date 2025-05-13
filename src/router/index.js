import { createRouter, createWebHistory } from "vue-router";

// Layouts
import AuthLayout from "../layouts/AuthLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";

// Auth pages
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import ForgotPassword from "../pages/auth/ForgotPassword.vue";
import VerifyEmailCode from "../pages/auth/VerifyEmailCode.vue";
import ResetPassword from "../pages/auth/ResetPassword.vue";

// Main pages
import Home from "../pages/main/Home.vue";
import Dashboard from "../pages/main/Dashboard.vue";
import Profile from "../pages/main/Profile.vue";

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", name: "Login", component: Login },
      { path: "register", name: "Register", component: Register },
      { path: "forgot-password", component: ForgotPassword },
      { path: "reset-password", component: ResetPassword },
      { path: "verify-email", component: VerifyEmailCode },
    ],
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "transaction", name: "Dashboard", component: Dashboard },
      { path: "profile", name: "Profile", component: Profile },
    ],
  },
  {
    path: "/logout",
    name: "Logout",
    beforeEnter: (to, from, next) => {
      // Simulate logout action (e.g., clear session or token)
      console.log("Logging out...");
      localStorage.removeItem("authToken"); // Example: Clear auth token
      next("/auth/login");
    },
  },
  // Catch-all fallback to login
  {
    path: "/:pathMatch(.*)*",
    redirect: "/auth/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
