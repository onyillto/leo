<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const subscribers = ref([]);

// Function to fetch subscribers from the API
const fetchSubscribers = async () => {
  try {
    const response = await axios.get('https://leo-backend-7mm5.onrender.com/api/v1/email/mails');
    subscribers.value = response.data.data; // Assuming the API returns { data: [...] }
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    // Handle error, maybe set an error message or notify the user
  }
};

// Function to toggle the active status of a subscriber
const toggleActiveStatus = async (id, isActive) => {
  try {
    // Send PATCH request to update the subscriber's status
    await axios.patch(`https://leo-backend-7mm5.onrender.com/api/v1/email/toggle-status/${id}`, { status: !isActive });
    
    // Update the local state
    const subscriber = subscribers.value.find(sub => sub._id === id);
    if (subscriber) {
      subscriber.active = !isActive;
    }
  } catch (error) {
    console.error('Error updating subscriber status:', error);
    // Optionally, handle error by notifying the user
  }
};

// Computed property to get the number of subscribers
const subscriberCount = computed(() => subscribers.value.length);

onMounted(() => {
  fetchSubscribers();
});
</script>

<template>
  <div class="text-gray-900 bg-gray-200 min-h-screen p-4">
    <div class="p-4 mb-4 text-center">
      <h1 class="text-2xl sm:text-3xl font-bold">Newsletter Subscribers ({{ subscriberCount }})</h1>
    </div>
    <div class="px-2 py-4">
      <ul class="bg-white shadow-md rounded">
        <li class="flex flex-wrap justify-between border-b border-gray-200 p-3 bg-gray-100 text-gray-700 font-medium">
          <span class="w-1/4 lg:w-1/12 text-center">Index</span>
          <span class="w-1/2 lg:w-5/12 text-center">Email</span>
          <span class="hidden lg:inline-block lg:w-3/12 text-center">Role</span> <!-- Hidden on mobile, visible on larger screens -->
          <span class="w-1/4 lg:w-3/12 text-center">Actions</span>
        </li>
        <li v-for="(sub, index) in subscribers" :key="sub._id" class="flex flex-wrap items-center justify-between border-b border-gray-200 hover:bg-gray-50">
          <span class="w-1/4 lg:w-1/12 p-3 text-center bg-green-300">{{ index + 1 }}</span>
          <span class="w-1/2 lg:w-5/12 p-3 text-center bg-blue-300 break-words">{{ sub.email }}</span>
          <span class="hidden lg:inline-block lg:w-3/12 p-3 text-center bg-purple-200">Subscribed</span> <!-- Hidden on mobile, visible on larger screens -->
          <span class="w-1/4 lg:w-3/12 p-3 text-center">
            <button 
              @click="toggleActiveStatus(sub._id, sub.active)"
              :class="sub.active ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'"
              class="text-sm text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              {{ sub.active ? 'Active' : 'Non-Active' }}
            </button>
          </span>
        </li>
        <li v-if="subscriberCount === 0" class="text-center p-3">
          No subscribers found.
        </li>
      </ul>
    </div>
  </div>
</template>








