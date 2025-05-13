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
      <v-col cols="12" sm="3">
        <v-select
          v-model="statusFilter"
          :items="['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled']"
          label="Booking Status"
          outlined
          clearable
          color="blue"
          dense
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="paymentStatusFilter"
          :items="['All', 'Paid', 'Pending', 'Failed']"
          label="Payment Status"
          outlined
          clearable
          color="blue"
          dense
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="paymentMethodFilter"
          :items="['All', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Cash']"
          label="Payment Method"
          outlined
          clearable
          color="blue"
          dense
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="dateFilter"
          label="Booking Date"
          type="date"
          outlined
          clearable
          color="blue"
          dense
        />
      </v-col>
    </v-row>

    <!-- Transaction History Table -->
    <v-data-table
      :headers="headers"
      :items="filteredBookings"
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
              <strong>Payment Method:</strong> {{ selectedBooking.paymentMethod }}
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
import { ref, computed } from 'vue';

// State
const bookings = ref([]);
const statusFilter = ref(null);
const paymentStatusFilter = ref(null);
const paymentMethodFilter = ref(null);
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

// Summary statistics
const summary = computed(() => {
  const totalBookings = bookings.value.length;
  const totalSpent = bookings.value.reduce((sum, booking) => sum + booking.price, 0);
  const pendingPayments = bookings.value.filter(booking => booking.paymentStatus === 'Pending').length;
  const completedTrips = bookings.value.filter(booking => booking.status === 'Completed').length;
  return { totalBookings, totalSpent, pendingPayments, completedTrips };
});

// Filtering
const filteredBookings = computed(() => {
  return bookings.value.filter(booking => {
    const matchesStatus = !statusFilter.value ||
      (statusFilter.value === 'All') ||
      (booking.status === statusFilter.value);
    const matchesPaymentStatus = !paymentStatusFilter.value ||
      (paymentStatusFilter.value === 'All') ||
      (booking.paymentStatus === paymentStatusFilter.value);
    const matchesPaymentMethod = !paymentMethodFilter.value ||
      (paymentMethodFilter.value === 'All') ||
      (booking.paymentMethod === paymentMethodFilter.value);
    const matchesDate = !dateFilter.value ||
      booking.date === dateFilter.value;
    return matchesStatus && matchesPaymentStatus && matchesPaymentMethod && matchesDate;
  });
});

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

// Fetch data
const fetchBookings = async () => {
  loading.value = true;
  try {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Dummy data
    const dummyData = [
      {
        id: 1,
        vehicle: 'Toyota Corolla',
        origin: 'Lagos',
        destination: 'Abuja',
        date: '2024-05-01',
        time: '10:00 AM',
        seats: 2,
        price: 15000,
        status: 'Completed',
        name: 'Jane Doe',
        driverName: 'Ahmed Musa',
        driverPhone: '08012345678',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        transactionId: 'TXN-001',
        paymentDate: '2024-05-01',
      },
      {
        id: 2,
        vehicle: 'Honda Accord',
        origin: 'Ibadan',
        destination: 'Lagos',
        date: '2024-05-03',
        time: '8:00 AM',
        seats: 1,
        price: 10000,
        status: 'Pending',
        name: 'John Smith',
        driverName: 'Chinedu Obi',
        driverPhone: '08098765432',
        paymentMethod: 'Bank Transfer',
        paymentStatus: 'Pending',
        transactionId: 'TXN-002',
        paymentDate: '2024-05-03',
      },
      {
        id: 3,
        vehicle: 'Kia Rio',
        origin: 'Abuja',
        destination: 'Kaduna',
        date: '2024-05-05',
        time: '12:00 PM',
        seats: 3,
        price: 20000,
        status: 'Cancelled',
        name: 'Amaka Eze',
        driverName: 'Baba Tunde',
        driverPhone: '08033445566',
        paymentMethod: 'Cash',
        paymentStatus: 'Failed',
        transactionId: 'TXN-003',
        paymentDate: '2024-05-05',
      }
    ];

    bookings.value = dummyData;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    bookings.value = [];
  } finally {
    loading.value = false;
  }
};


// Lifecycle
fetchBookings();
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