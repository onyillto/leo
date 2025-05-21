<template>
  <v-container class="py-8">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Transaction History</h2>

    <!-- Summary Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="3">
        <v-card class="pa-4" outlined>
          <v-row align="center">
            <v-col cols="3">
              <v-icon large color="blue">mdi-car</v-icon>
            </v-col>
            <v-col cols="9">
              <h3 class="text-lg font-semibold text-gray-700">Total Bookings</h3>
              <p class="text-2xl font-bold text-gray-900">{{ summary.totalBookings }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="pa-4" outlined>
          <v-row align="center">
            <v-col cols="3">
              <v-icon large color="green">mdi-currency-ngn</v-icon>
            </v-col>
            <v-col cols="9">
              <h3 class="text-lg font-semibold text-gray-700">Total Spent</h3>
              <p class="text-2xl font-bold text-gray-900">₦{{ summary.totalSpent.toLocaleString() }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="pa-4" outlined>
          <v-row align="center">
            <v-col cols="3">
              <v-icon large color="orange">mdi-clock-outline</v-icon>
            </v-col>
            <v-col cols="9">
              <h3 class="text-lg font-semibold text-gray-700">Pending Payments</h3>
              <p class="text-2xl font-bold text-gray-900">{{ summary.pendingPayments }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="pa-4" outlined>
          <v-row align="center">
            <v-col cols="3">
              <v-icon large color="purple">mdi-check-circle</v-icon>
            </v-col>
            <v-col cols="9">
              <h3 class="text-lg font-semibold text-gray-700">Completed Trips</h3>
              <p class="text-2xl font-bold text-gray-900">{{ summary.completedTrips }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filter Bar -->
    <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <v-select
          v-model="statusFilter"
          :items="['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled']"
          label="Booking Status"
          outlined
          clearable
          color="blue"
          dense
          @change="fetchTransactions"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="paymentStatusFilter"
          :items="['All', 'Paid', 'Pending', 'Failed']"
          label="Payment Status"
          outlined
          clearable
          color="blue"
          dense
          @change="fetchTransactions"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="dateFilter"
          label="Booking Date"
          type="date"
          outlined
          clearable
          color="blue"
          dense
          @change="fetchTransactions"
        />
      </v-col>
    </v-row>

    <!-- Transaction History Table -->
    <v-data-table
      :headers="headers"
      :items="bookings"
      class="elevation-1 rounded-lg"
      :items-per-page="10"
      :loading="loading"
      loading-text="Loading transactions..."
    >
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="getStatusColor(item.status)"
          dark
          small
          class="font-semibold"
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.price="{ item }">
        <span>₦{{ item.price.toLocaleString() }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          small
          color="blue"
          @click="viewBookingDetails(item)"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Transaction Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="600">
      <v-card v-if="selectedBooking" class="rounded-lg">
        <v-card-title class="text-xl font-bold text-gray-800 bg-gray-50">
          Transaction Details
        </v-card-title>
        <v-card-text class="pt-4">
          <v-row>
            <v-col cols="12">
              <h3 class="text-lg font-semibold text-gray-700 mb-2">Booking Information</h3>
            </v-col>
            <v-col cols="6">
              <strong>Vehicle:</strong> {{ selectedBooking.vehicle }}
            </v-col>
            <v-col cols="6">
              <strong>Status:</strong>
              <v-chip
                :color="getStatusColor(selectedBooking.status)"
                dark
                small
                class="ml-2 font-semibold"
              >
                {{ selectedBooking.status }}
              </v-chip>
            </v-col>
            <v-col cols="6">
              <strong>Pickup:</strong> {{ selectedBooking.origin }}
            </v-col>
            <v-col cols="6">
              <strong>Dropoff:</strong> {{ selectedBooking.destination }}
            </v-col>
            <v-col cols="6">
              <strong>Date:</strong> {{ selectedBooking.date }}
            </v-col>
            <v-col cols="6">
              <strong>Time:</strong> {{ selectedBooking.time }}
            </v-col>
            <v-col cols="6">
              <strong>Passengers:</strong> {{ selectedBooking.seats }}
            </v-col>
            <v-col cols="6">
              <strong>Traveler:</strong> {{ selectedBooking.name }}
            </v-col>
            <v-col cols="6">
              <strong>Driver:</strong> {{ selectedBooking.driverName }}
            </v-col>
            <v-col cols="6">
              <strong>Driver Phone:</strong> {{ selectedBooking.driverPhone }}
            </v-col>
            <v-col cols="12">
              <v-divider class="my-4"></v-divider>
              <h3 class="text-lg font-semibold text-gray-700 mb-2">Payment Information</h3>
            </v-col>
            <v-col cols="6">
              <strong>Total Price:</strong> ₦{{ selectedBooking.price.toLocaleString() }}
            </v-col>
            <v-col cols="6">
              <strong>Payment Status:</strong>
              <v-chip
                :color="getPaymentStatusColor(selectedBooking.paymentStatus)"
                dark
                small
                class="ml-2 font-semibold"
              >
                {{ selectedBooking.paymentStatus }}
              </v-chip>
            </v-col>
            <v-col cols="6">
              <strong>Transaction ID:</strong> {{ selectedBooking.transactionId }}
            </v-col>
            <v-col cols="6">
              <strong>Payment Date:</strong> {{ selectedBooking.paymentDate }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="bg-gray-50">
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            text
            @click="detailsDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// State
const bookings = ref([]);
const summary = ref({
  totalBookings: 0,
  totalSpent: 0,
  pendingPayments: 0,
  completedTrips: 0
});
const statusFilter = ref(null);
const paymentStatusFilter = ref(null);
const dateFilter = ref(null);
const detailsDialog = ref(false);
const selectedBooking = ref(null);
const loading = ref(false);

// Table headers
const headers = [
  { text: 'Vehicle', value: 'vehicle' },
  { text: 'Pickup', value: 'origin' },
  { text: 'Dropoff', value: 'destination' },
  { text: 'Date', value: 'date' },
  { text: 'Passengers', value: 'seats' },
  { text: 'Price', value: 'price' },
  { text: 'Status', value: 'status', sortable: false },
  { text: 'Actions', value: 'actions', sortable: false },
];

// Helper methods
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'orange';
    case 'Confirmed': return 'green';
    case 'Completed': return 'blue';
    case 'Cancelled': return 'red';
    default: return 'grey';
  }
};

const getPaymentStatusColor = (status) => {
  switch (status) {
    case 'Paid': return 'green';
    case 'Pending': return 'orange';
    case 'Failed': return 'red';
    default: return 'grey';
  }
};

const viewBookingDetails = (booking) => {
  selectedBooking.value = booking;
  detailsDialog.value = true;
};

// API calls
const fetchTransactions = async () => {
  loading.value = true;
  try {
    // Build query parameters for filtering
    const params = new URLSearchParams();
    if (statusFilter.value && statusFilter.value !== 'All') {
      params.append('status', statusFilter.value);
    }
    if (paymentStatusFilter.value && paymentStatusFilter.value !== 'All') {
      params.append('paymentStatus', paymentStatusFilter.value);
    }
    if (dateFilter.value) {
      params.append('date', dateFilter.value);
    }

    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Fetch transactions from API
    const response = await fetch(`https://user.bloomrydes.org/api/v1/interstate/transactions?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch transactions');
    }

    // Update state with fetched data
    bookings.value = data.transactions;
    summary.value = data.summary;
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    // Handle error state
  } finally {
    loading.value = false;
  }
};

// Fetch transaction details
const fetchTransactionDetails = async (id) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`https://user.bloomrydes.org/api/v1/interstate/transactions/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch transaction details');
    }

    return data.transaction;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

// Load data on component mount
onMounted(() => {
  fetchTransactions();
});
</script>



<style scoped>
.v-data-table {
  border-radius: 8px;
  background-color: #fff;
}

.v-data-table >>> .v-data-table__wrapper tbody tr:hover {
  background-color: #f5f5f5;
}

.v-chip {
  font-weight: 600;
}

.v-card {
  transition: all 0.3s;
}

.v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-select .v-label,
.v-text-field .v-label {
  color: #1976d2 !important;
}

.text-gray-700 {
  color: #374151;
}

.text-gray-900 {
  color: #111827;
}
</style>