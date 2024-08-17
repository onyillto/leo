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

// Function to delete a subscriber
const deleteSubscriber = async (id) => {
  try {
    // Send DELETE request to the server
    await axios.delete(`https://leo-backend-7mm5.onrender.com/api/v1/email/${id}`);
    
    // Update the local state
    subscribers.value = subscribers.value.filter(sub => sub._id !== id);
  } catch (error) {
    console.error('Error deleting subscriber:', error);
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
    <div class="p-4 mb-4">
      <h1 class="text-3xl font-bold">Newsletter Subscribers ({{ subscriberCount }})</h1>
    </div>
    <div class="px-3 py-4">
      <ul class="bg-white shadow-md rounded">
        <li class="flex border-b border-gray-200 p-3 bg-gray-100 text-gray-700 font-medium">
          <span class="flex-1">Index Number</span>
          <span class="flex-1">Email</span>
          <span class="flex-1">Role</span>
          <span class="flex-1 text-right">Actions</span>
        </li>
        <li v-for="(sub, index) in subscribers" :key="sub._id" class="flex items-center border-b border-gray-200 hover:bg-gray-50">
          <span class="flex-1 p-3 bg-green-300">{{ index + 1 }}</span> <!-- Display the index as a count -->
          <span class="flex-1 p-3 bg-blue-300">{{ sub.email }}</span>
          <span class="flex-1 p-3 bg-purple-200">user</span>
          <span class="flex-1 p-3 text-right bg-red-">
            <button 
              @click="deleteSubscriber(sub._id)"
              class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
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


