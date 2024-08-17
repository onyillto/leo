<template>
  <div class=" bg-gray-900 bg-[url('/bg.jpg')] bg-cover bg-center  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Admin Log In
      </h2>
      <p class="mt-2 text-center text-sm text-white">
        Don't have an account?
        <router-link
          to="/register"
          class="font-medium text-green-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          Register an account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Center the image with flexbox -->
        <div class="flex justify-center">
          <img src="/leo.jpeg" alt="Leo AI" class="h-24 w-24 object-cover rounded-full shadow-lg">
        </div>
        <form @submit.prevent="loginUser">
          <div class="mt-6">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="admin@gmail.com"
              />
            </div>
          </div>

          <div class="mt-6">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Sign In
            </button>
          </div>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-green-600">
            Forgot your password?
            <a href="#" class="font-medium text-green-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              Reset Password
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter();

const loginUser = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await axios.post('http://localhost:3000/api/v1/user/login', {
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (response.status === 200 && response.data.success) {
      const { token, data } = response.data;

      // Store the token and user data in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('user', JSON.stringify(data));

      console.log('User logged in successfully:', data);

      // Redirect based on user role
      router.push(data.role === 'admin' ? '/dashboard' : '/dashboard');
    } else {
      console.error('Login failed:', response.data.message);
      // Handle login error here, such as displaying an error message to the user
    }
  } catch (error) {
    console.error('Login failed:', error);
    // Handle login error here, such as displaying an error message to the user
  }
};
</script>

 