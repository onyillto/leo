<script setup>
import { ref } from 'vue';

// Dummy data to represent subscribers
const subscribers = ref([
  { index: 1, email: 'user1@example.com', role: 'user' },
  { index: 2, email: 'user2@example.com', role: 'user' },
  { index: 3, email: 'user3@example.com', role: 'user' },
  // Add more subscriber objects as needed
]);

const deleteSubscriber = (index) => {
  subscribers.value = subscribers.value.filter(sub => sub.index !== index);
};
</script>

<template>
  <div class="text-gray-900 bg-gray-200 min-h-screen p-4">
    <div class="p-4 mb-4">
      <h1 class="text-3xl font-bold">News Letter Subscribers</h1>
    </div>
    <div class="px-3 py-4">
      <ul class="bg-white shadow-md rounded">
        <li class="flex border-b border-gray-200 p-3 bg-gray-100 text-gray-700 font-medium">
          <span class="flex-1">Index Number</span>
          <span class="flex-1">Email</span>
          <span class="flex-1">Role</span>
          <span class="flex-1 text-right">Actions</span>
        </li>
        <li v-for="sub in subscribers" :key="sub.index" class="flex items-center border-b border-gray-200 hover:bg-gray-50">
          <span class="flex-1 p-3">{{ sub.index }}</span>
          <span class="flex-1 p-3">{{ sub.email }}</span>
          <span class="flex-1 p-3">{{ sub.role }}</span>
          <span class="flex-1 p-3 text-right">
            <button 
              @click="deleteSubscriber(sub.index)"
              class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling here */
</style>

