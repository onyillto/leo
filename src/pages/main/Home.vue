<template>
  <v-container>
    <!-- Filter Bar -->
    <v-row class="mb-4">
      <v-col cols="6">
        <v-select
          v-model="startingLocation"
          :items="locations"
          label="Starting Location"
          outlined
          clearable
          color="blue"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="destination"
          :items="locations"
          label="Destination"
          outlined
          clearable
          color="blue"
        />
      </v-col>
    </v-row>

    <!-- Bookings Header -->
    <h2 class="text-h6 font-weight-medium mb-4">Bookings</h2>
    <p class="grey--text mb-6">
      {{ startingLocation || 'Lagos (Iyana Ipaja)' }} => {{ destination || 'FCT Abuja (Utako)' }} May 15, 2025. 1 Adult(s)
    </p>

    <!-- Trip Listings -->
    <v-card
      v-for="(trip, index) in trips"
      :key="index"
      class="mb-4"
      outlined
      :color="index % 2 === 0 ? '#f5f5f5' : 'white'"
    >
      <v-card-text>
        <v-row align="center">
          <v-col cols="2">
            <v-img
              :src="trip.image"
              alt="Vehicle"
              height="80"
              width="100%"
              class="vehicle-image"
            />
          </v-col>
          <v-col cols="6">
            <h3 class="text-h6">{{ trip.vehicle }}</h3>
            <p class="grey--text">
              Departure: {{ trip.departure }} - Arrival: {{ trip.arrival }}<br />
              {{ trip.seats }} seats (available) @ {{ trip.time }}
            </p>
            <p class="grey--text">Adult: 1</p>
          </v-col>
          <v-col cols="2" class="text-right">
            <h3 class="text-h6">₦{{ trip.price.toLocaleString() }}</h3>
            <p class="blue--text">CashBack: ₦{{ trip.cashback.toLocaleString() }}</p>
          </v-col>
          <v-col cols="2" class="text-right">
            <v-btn
              color="blue"
              dark
              @click="viewSeats(trip)"
            >
              Book Trip
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

// Filter data
const startingLocation = ref(null);
const destination = ref(null);
const locations = [
  "Lagos (Iyana Ipaja)",
  "FCT Abuja (Utako)",
  "Port Harcourt",
  "Enugu",
  "Kano",
];

// Trip data with public images (using placeholder public paths)
const trips = ref([
  {
    vehicle: "Toyota (Hiace X)",
    departure: "Lagos (Iyana Ipaja)",
    arrival: "FCT Abuja (Utako)",
    seats: "11",
    time: "05:30 AM",
    price: 49000,
    cashback: 980,
    image: "/honda.jpeg", // Public image path
  },
  {
    vehicle: "Toyota Camry",
    departure: "Port Harcourt",
    arrival: "Enugu",
    seats: "3",
    time: "06:30 AM",
    price: 45000,
    cashback: 900,
    image: "/venza.jpeg", // Public image path
  },
  {
    vehicle: "Honda Accord",
    departure: "Kano",
    arrival: "Lagos (Iyana Ipaja)",
    seats: "3",
    time: "07:00 AM",
    price: 48000,
    cashback: 950,
    image: "/honda.jpeg", // Public image path
  },
  {
    vehicle: "Toyota Venza",
    departure: "FCT Abuja (Utako)",
    arrival: "Port Harcourt",
    seats: "3",
    time: "08:00 AM",
    price: 50000,
    cashback: 1000,
    image: "/venzaa.jpeg", // Public image path
  },
  {
    vehicle: "Honda Accord",
    departure: "Enugu",
    arrival: "Kano",
    seats: "3",
    time: "09:00 AM",
    price: 47000,
    cashback: 920,
    image: "/hiace.jpeg", // Public image path
  },
]);

// Placeholder function for booking a trip
const viewSeats = (trip) => {
  console.log("Booking trip:", trip);
  // Add navigation or modal logic here
};
</script>

<style scoped>
/* Ensure consistent spacing and styling */
.v-card {
  border-radius: 8px !important;
}

/* Style the filter bar labels */
.v-select .v-label {
  color: #1976d2 !important;
}

/* Ensure text readability */
.grey--text {
  color: #757575 !important;
}

.blue--text {
  color: #1976d2 !important;
}

/* Ensure images take full width and have fixed height */
.vehicle-image {
  width: 100% !important;
  height: 80px !important;
  object-fit: cover !important;
}
</style>