import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import ForgotPassword from '../pages/auth/ForgotPassword.vue';
import VerifyEmailCode from "../pages/auth/VerifyEmailCode.vue";
import ResetPassword from "../pages/auth/ResetPassword.vue";
const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "register",
        name: "Register",
        component: Register,
      },
      { path: "forgot-password", component: ForgotPassword },
      { path: "reset-password", component: ResetPassword },
      { path: "verify-email", component: VerifyEmailCode },
    ],
  },
  // Redirect root to login
  {
    path: "/",
    redirect: "/auth/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
