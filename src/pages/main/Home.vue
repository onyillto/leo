<template>
  <div>
    <BloomRydesModal :isOpen="true" />
  </div>
  <v-container>
    <!-- Filter Bar -->
    <v-row class="mb-4">
      <v-col cols="4">
        <v-select
          v-model="pickupLocation"
          :items="locations"
          label="Pick Up Location"
          outlined
          clearable
          color="blue"
          @change="filterDrivers"
        />
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="destinationLocation"
          :items="locations"
          label="Destination"
          outlined
          clearable
          color="blue"
          @change="filterDrivers"
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
          @change="filterDrivers"
        />
      </v-col>
    </v-row>

    <!-- Available Drivers Header -->
    <h2 class="text-h6 font-weight-medium mb-4">Available Drivers</h2>

    <!-- Loading State -->
    <v-progress-circular 
      v-if="loading" 
      indeterminate 
      color="blue"
      class="d-block mx-auto my-8"
    ></v-progress-circular>

    <!-- No Results State -->
    <v-alert
      v-else-if="displayedDrivers.length === 0"
      type="info"
      class="mb-4"
    >
      No available drivers found for the selected criteria. Please try different filters.
    </v-alert>

    <!-- Driver Listings -->
    <v-card
      v-else
      v-for="(driver, index) in displayedDrivers"
      :key="driver.driver_id"
      class="mb-4"
      outlined
      :color="index % 2 === 0 ? '#f5f5f5' : 'white'"
    >
      <v-card-text>
        <v-row align="center">
          <v-col cols="2">
            <v-img
              :src="getVehicleImage(driver.vehicle_maker, driver.vehicle_model)"
              alt="Vehicle"
              height="80"
              width="100%"
              class="vehicle-image"
            />
          </v-col>
          <v-col cols="6">
            <h3 class="text-h6">{{ driver.driver_name }}</h3>
            <p class="grey--text">
              {{ driver.vehicle_maker }} {{ driver.vehicle_model }} ({{ driver.vehicle_color }})
            </p>
            <p class="grey--text">
              From: {{ driver.pickup }} - To: {{ driver.destination }}<br />
              Plate Number: {{ driver.vehicle_plate_number }} @ {{ formatDateTime(driver.date_time) }}
            </p>
          </v-col>
          <v-col cols="2" class="text-right">
            <h3 class="text-h6">₦{{ Number(driver.budget).toLocaleString() }}</h3>
            <p class="blue--text">Trip Budget</p>
          </v-col>
          <v-col cols="2" class="text-right">
            <v-btn
              color="blue"
              dark
              @click="openModal(driver)"
            >
              Book Trip
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Modal for Booking Confirmation -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Booking</v-card-title>
        <v-card-text>
          <p v-if="selectedDriver">
            You are about to book a trip with {{ selectedDriver.driver_name }}.<br>
            From: {{ selectedDriver.pickup }}<br>
            To: {{ selectedDriver.destination }}<br>
            Vehicle: {{ selectedDriver.vehicle_maker }} {{ selectedDriver.vehicle_model }}<br>
            Budget: ₦{{ Number(selectedDriver.budget).toLocaleString() }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue" dark @click="confirmBooking">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BloomRydesModal from '@/components/Banner.vue';

// State
const pickupLocation = ref(null);
const destinationLocation = ref(null);
const selectedDate = ref(null);
const dialog = ref(false);
const loading = ref(false);
const availableDrivers = ref([]);
const selectedDriver = ref(null);
const error = ref(null);

// Mock locations - to be replaced with API data in a real implementation
const locations = [
  "Abuja",
  "Lagos",
  "Port Harcourt",
  "Enugu",
  "Kano",
  "Ibadan",
  "Benin",
  "Owerri"
];

// Function to get a vehicle image based on vehicle maker and model
const getVehicleImage = (maker, model) => {
  const makerLower = maker.toLowerCase();
  const modelLower = model.toLowerCase();
  
  if (makerLower.includes('toyota') && modelLower.includes('hiace')) return '/hiace.jpeg';
  if (makerLower.includes('toyota') && modelLower.includes('camry')) return '/camry.jpeg';
  if (makerLower.includes('honda')) return '/honda.jpeg';
  if (makerLower.includes('toyota') && modelLower.includes('venza')) return '/venza.jpeg';
  if (makerLower.includes('mercedes')) return '/mercedes.jpeg';
  if (makerLower.includes('lexus')) return '/lexus.jpeg';
  
  // Default image based on vehicle type
  if (modelLower.includes('bus')) return '/bus.jpg';
  if (modelLower.includes('suv')) return '/suv.jpeg';
  
  return '/default-car.jpg'; // Default fallback image
};

// Format date and time
const formatDateTime = (dateTimeStr) => {
  try {
    // Assuming the date_time is already formatted or can be displayed directly
    return dateTimeStr;
  } catch (err) {
    console.error('Error formatting date:', err);
    return dateTimeStr; // Return original if formatting fails
  }
};

// Fetch available drivers from API
const fetchAvailableDrivers = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch('https://user.bloomrydes.org/api/v1/all/pending/web', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to fetch available drivers');
    }

    const data = await response.json();
    availableDrivers.value = data.drivers || [];
  } catch (err) {
    console.error('Error fetching available drivers:', err);
    error.value = err.message;
    availableDrivers.value = [];
  } finally {
    loading.value = false;
  }
};

// Filter drivers from API
const filterDrivers = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Build query parameters
    const params = new URLSearchParams();
    if (pickupLocation.value) {
      params.append('pickup', pickupLocation.value);
    }
    if (destinationLocation.value) {
      params.append('destination', destinationLocation.value);
    }
    if (selectedDate.value) {
      params.append('date', selectedDate.value);
    }

    const response = await fetch(`https://user.bloomrydes.org/api/v1/driver/available/filter?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to filter drivers');
    }

    const data = await response.json();
    availableDrivers.value = data.drivers || [];
  } catch (err) {
    console.error('Error filtering drivers:', err);
    error.value = err.message;
    // Don't clear drivers on error, maintain current view
  } finally {
    loading.value = false;
  }
};

// Computed property for displayed drivers
const displayedDrivers = computed(() => {
  return availableDrivers.value;
});

// Modal and booking functions
const openModal = (driver) => {
  dialog.value = true;
  selectedDriver.value = driver;
};

const confirmBooking = async () => {
  try {
    // In a real implementation, you would make an API call to book the trip
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log("Booking trip with driver:", selectedDriver.value);
    
    // TODO: Replace with actual booking API call
    // const response = await fetch('https://user.bloomrydes.org/api/v1/driver/trips/book', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     driver_id: selectedDriver.value.driver_id,
    //     pickup: selectedDriver.value.pickup,
    //     destination: selectedDriver.value.destination,
    //     date_time: selectedDriver.value.date_time
    //   })
    // });

    // Close dialog
    dialog.value = false;
    
    // Show success message
    alert(`Trip booked successfully with ${selectedDriver.value.driver_name}!`);
  } catch (err) {
    console.error('Error booking trip:', err);
    alert(err.message || 'Failed to book trip');
  }
};

// Fetch drivers on component mount
onMounted(() => {
  fetchAvailableDrivers();
});
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

