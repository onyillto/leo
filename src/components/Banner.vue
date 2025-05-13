<template>
  <section class="main bg-blue-700 text-white py-16 px-4">
    <div class="container mx-auto max-w-4xl text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        Grab a free ryde today! download the app
      </h2>
      <p class="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
        Cut down on the hassle. Cut down on the price. Let's take your Safety a notch up. Improve your Style. Ryde in Comfort.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button
          @click="showModal = true"
          class="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Download the App
        </button>
        <a
          href="https://bloomrydes.com"
          target="_blank"
          class="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105"
        >
          Learn More
        </a>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl text-center w-80 relative">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          @click="showModal = false"
        >
          &times;
        </button>
        <h3 class="text-2xl font-semibold mb-4">Download the App</h3>
        <div class="flex justify-center gap-4">
          <a
            href="https://apps.apple.com/us/app/bloomrydes/id1491366935" target="_blank"
            class="hover:scale-105 transition"
          >
            <img src="/appstore.png" alt="App Store" class="h-12" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.bloomrydes.bloom&pli=1" target="_blank"
            class="hover:scale-105 transition"
          >
            <img src="/googleplay.png" alt="Google Play" class="h-12" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<style scoped>
.main{
    background-color: #0c00f0;
}

.container {
  background-color: #0c00f0; /* Vuetify's default blue */
}
</style>
