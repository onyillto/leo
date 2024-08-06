<template>
  <div class=" bg-gray-900 bg-[url('/bg.jpg')] bg-cover bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="relative isolate overflow-hidden px-6 py-12 shadow-2xl rounded-xl sm:rounded-xl xl:py-24 w-full text-center bg-gray-900 bg-opacity-75">
      <!-- Image Section -->
      <div class="flex justify-center mb-4">
        <img src="/leo.jpeg" alt="Leo AI" class="h-24 w-24 object-cover rounded-full shadow-lg">
      </div>

      <!-- Title -->
      <h2 class="mx-auto max-w-xl text-center text-3xl font-bold tracking-tight text-green-500 sm:text-4xl">
        Leo Ai
      </h2>

      <h5 class="mx-auto max-w-xl text-center text-xl font-bold tracking-tight text-white sm:text-xl mt-6 mb-6">
        Enter your Email to Receive FREE valuable knowledge on how to quit your 9-5 and make 10k/month using Ai Automation
      </h5>

      <!-- Description -->
      <p class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-red-500">
        You’re doing yourself a very large favor by joining this mailing list. Good for you.
      </p>

      <!-- Form -->
      <form class="mx-auto mt-8 flex max-w-md gap-x-4">
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required="true" class="min-w-0 flex-auto rounded-md border-0 bg-gray-200 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6" placeholder="Enter your email">
        <button type="submit" class="flex-none rounded-md bg-yellow-400 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">Subscribe</button>
      </form>

      <!-- Background SVG -->
    </div>
  </div>
</template>


