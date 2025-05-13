<template>
     <div>
    <BloomRydesModal :isOpen="true" />
  </div>
  <v-container>


    <!-- Filter Bar -->
    <v-row class="mb-4">
      <v-col cols="4">
        <v-select
          v-model="startingLocation"
          :items="locations"
          label="Starting Location"
          outlined
          clearable
          color="blue"
          @change="filterTrips"
        />
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="destination"
          :items="locations"
          label="Destination"
          outlined
          clearable
          color="blue"
          @change="filterTrips"
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="selectedDate"
          label="Date"
          type="date"
          outlined
          clearable
          color="blue"
          @change="filterTrips"
        />
      </v-col>
    </v-row>

    <!-- Bookings Header -->
    <h2 class="text-h6 font-weight-medium mb-4">Bookings</h2>
    <!-- <p class="grey--text mb-6">
      {{ startingLocation || 'Lagos (Iyana Ipaja)' }} => {{ destination || 'FCT Abuja (Utako)' }} {{ selectedDate || 'May 15, 2025' }}. {{ selectedSeats || 1 }} Adult(s)
    </p> -->

    <!-- Trip Listings -->
    <v-card
      v-for="(trip, index) in filteredTrips"
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
            <p class="grey--text">Adult: {{ selectedSeats || 1 }}</p>
          </v-col>
          <v-col cols="2" class="text-right">
            <h3 class="text-h6">₦{{ trip.price.toLocaleString() }}</h3>
            <p class="blue--text">CashBack: ₦{{ trip.cashback.toLocaleString() }}</p>
          </v-col>
          <v-col cols="2" class="text-right">
            <v-btn
              color="blue"
              dark
              @click="openModal(trip)"
            >
              Book Trip
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Modal for Seat Selection -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Select Number of Adults</v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedSeats"
            :items="seatOptions"
            label="Number of Adults"
            outlined
            color="blue"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue" dark @click="confirmSeats">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import BloomRydesModal from '@/components/Banner.vue';
// Filter data
const startingLocation = ref(null);
const destination = ref(null);
const selectedDate = ref(null);
const selectedSeats = ref(1);
const dialog = ref(false);
const seatOptions = [1, 2, 3, 4, 5];

const locations = [
  "Lagos (Iyana Ipaja)",
  "FCT Abuja (Utako)",
  "Port Harcourt",
  "Enugu",
  "Kano",
];

// Trip data with public images
const trips = ref([
  {
    vehicle: "Toyota (Hiace X)",
    departure: "Lagos (Iyana Ipaja)",
    arrival: "FCT Abuja (Utako)",
    seats: "11",
    time: "05:30 AM",
    price: 49000,
    cashback: 980,
    image: "/honda.jpeg",
  },
  {
    vehicle: "Toyota Camry",
    departure: "Port Harcourt",
    arrival: "Enugu",
    seats: "3",
    time: "06:30 AM",
    price: 45000,
    cashback: 900,
    image: "/venza.jpeg",
  },
  {
    vehicle: "Honda Accord",
    departure: "Kano",
    arrival: "Lagos (Iyana Ipaja)",
    seats: "3",
    time: "07:00 AM",
    price: 48000,
    cashback: 950,
    image: "/honda.jpeg",
  },
  {
    vehicle: "Toyota Venza",
    departure: "FCT Abuja (Utako)",
    arrival: "Port Harcourt",
    seats: "3",
    time: "08:00 AM",
    price: 50000,
    cashback: 1000,
    image: "/venzaa.jpeg",
  },
  {
    vehicle: "Honda Accord",
    departure: "Enugu",
    arrival: "Kano",
    seats: "3",
    time: "09:00 AM",
    price: 47000,
    cashback: 920,
    image: "/hiace.jpeg",
  },
]);

// Filtering logic
const filteredTrips = computed(() => {
  return trips.value.filter(trip => {
    const matchesStart = !startingLocation.value || trip.departure === startingLocation.value;
    const matchesDest = !destination.value || trip.arrival === destination.value;
    const matchesDate = !selectedDate.value || trip.time.split(' ')[0] === selectedDate.value.split('-')[2]; // Simple date matching with day
    return matchesStart && matchesDest && matchesDate;
  });
});

// Modal and booking functions
const openModal = (trip) => {
  dialog.value = true;
  // Store the selected trip for reference if needed
  selectedTrip.value = trip;
};

const confirmSeats = () => {
  console.log("Booking trip with", selectedSeats.value, "adults:", selectedTrip.value);
  dialog.value = false;
  // Add booking logic here
};

const selectedTrip = ref(null);
</script>

<style scoped>
/* Ensure consistent spacing and styling */
.v-card {
  border-radius: 8px !important;
}

/* Style the filter bar labels */
.v-select .v-label, .v-text-field .v-label {
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


