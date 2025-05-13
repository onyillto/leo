<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="profile-card elevation-12">
          <!-- Profile Header -->
          <v-card-title class="profile-header">
            <v-avatar size="100" class="profile-avatar elevation-6 mb-4">
              <img 
                src="/bus.jpg" 
                alt="Profile Picture" 
                class="profile-image"
              />
              <v-btn 
                fab 
                x-small
                color="blue" 
                dark 
                class="edit-avatar-btn"
                @click="openAvatarUpload"
              >
                <v-icon size="small">mdi-pencil</v-icon>
              </v-btn>
            </v-avatar>
            <div class="profile-name text-center">
              <h2 class="text-h6 md-text-h5">Adebayo Oluwaseun</h2>
              <p class="text-caption md:text-subtitle-1 text-muted">Premium Member</p>
            </div>
          </v-card-title>

          <!-- Profile Details -->
          <v-card-text>
            <v-form ref="profileForm" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="profile.firstName"
                    label="First Name"
                    prepend-icon="mdi-account"
                    outlined
                    dense
                    :rules="[v => !!v || 'First name is required']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="profile.lastName"
                    label="Last Name"
                    prepend-icon="mdi-account"
                    outlined
                    dense
                    :rules="[v => !!v || 'Last name is required']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="profile.email"
                    label="Email"
                    prepend-icon="mdi-email"
                    outlined
                    dense
                    :rules="[v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="profile.phone"
                    label="Phone Number"
                    prepend-icon="mdi-phone"
                    outlined
                    dense
                    type="tel"
                    :rules="[v => !!v || 'Phone number is required']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="profile.gender"
                    :items="['Male', 'Female', 'Other']"
                    label="Gender"
                    prepend-icon="mdi-gender-transgender"
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <!-- Membership & Rewards -->
          <v-card-text class="px-2 px-sm-6">
            <v-row>
              <v-col cols="4">
                <v-card outlined class="text-center stat-card">
                  <v-card-text class="px-1 px-sm-3 py-2 py-sm-4">
                    <v-icon color="blue" size="32" class="mb-1">mdi-wallet-membership</v-icon>
                    <h3 class="text-caption text-sm-subtitle-1">Membership</h3>
                    <p class="text-body-2 text-sm-h6 blue--text">Premium</p>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card outlined class="text-center stat-card">
                  <v-card-text class="px-1 px-sm-3 py-2 py-sm-4">
                    <v-icon color="green" size="32" class="mb-1">mdi-currency-ngn</v-icon>
                    <h3 class="text-caption text-sm-subtitle-1">Cashback</h3>
                    <p class="text-body-2 text-sm-h6 green--text">₦5,980</p>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card outlined class="text-center stat-card">
                  <v-card-text class="px-1 px-sm-3 py-2 py-sm-4">
                    <v-icon color="orange" size="32" class="mb-1">mdi-map-marker</v-icon>
                    <h3 class="text-caption text-sm-subtitle-1">Trips</h3>
                    <p class="text-body-2 text-sm-h6 orange--text">12</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Action Buttons -->
          <v-card-actions class="px-4 px-sm-6 pb-4 pb-sm-6">
            <v-btn 
              color="blue" 
              dark 
              block 
              @click="updateProfile"
            >
              Update Profile
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Password Change Modal -->
        <v-dialog v-model="passwordDialog" max-width="500">
          <v-card>
            <v-card-title>Change Password</v-card-title>
            <v-card-text>
              <v-form ref="passwordForm">
                <v-text-field
                  v-model="password.current"
                  label="Current Password"
                  type="password"
                  outlined
                  dense
                  prepend-icon="mdi-lock"
                ></v-text-field>
                <v-text-field
                  v-model="password.new"
                  label="New Password"
                  type="password"
                  outlined
                  dense
                  prepend-icon="mdi-lock-plus"
                  :rules="[v => v.length >= 8 || 'Password must be at least 8 characters']"
                ></v-text-field>
                <v-text-field
                  v-model="password.confirm"
                  label="Confirm New Password"
                  type="password"
                  outlined
                  dense
                  prepend-icon="mdi-lock-check"
                  :rules="[v => v === password.new || 'Passwords must match']"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="passwordDialog = false">Cancel</v-btn>
              <v-btn color="blue" dark @click="changePassword">Change Password</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <!-- Change Password Button -->
    <v-row justify="center" class="mt-2 mt-sm-4">
      <v-col cols="12" md="8" lg="6">
        <v-btn 
          outlined 
          color="blue" 
          block 
          @click="passwordDialog = true"
        >
          Change Password
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Profile Data
const profile = reactive({
  firstName: 'Adebayo',
  lastName: 'Oluwaseun',
  email: 'adebayo.oluwaseun@example.com',
  phone: '+234 810 123 4567',
  gender: 'Male'
});

// Password Change Data
const password = reactive({
  current: '',
  new: '',
  confirm: ''
});

// State Management
const profileForm = ref(null);
const passwordForm = ref(null);
const passwordDialog = ref(false);

// Methods
const updateProfile = () => {
  // Validate form
  const isValid = profileForm.value.validate();
  
  if (isValid) {
    // Simulate profile update
    console.log('Profile Updated:', profile);
    // In a real app, you would call an API here
  }
};

const changePassword = () => {
  // Validate password form
  const isValid = passwordForm.value.validate();
  
  if (isValid) {
    // Simulate password change
    console.log('Password Changed');
    passwordDialog.value = false;
    // In a real app, you would call an API here
  }
};

const openAvatarUpload = () => {
  // Implement avatar upload logic
  console.log('Open Avatar Upload');
};
</script>

<style scoped>
.profile-card {
  border-radius: 16px !important;
  overflow: hidden;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  color: white;
}

.profile-avatar {
  position: relative;
  border: 4px solid white;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(25%, 25%);
}

.text-muted {
  color: rgba(255, 255, 255, 0.7);
}

.stat-card {
  height: 100%;
}

/* Responsive styles */
@media (max-width: 600px) {
  .profile-header {
    padding: 12px;
  }
  
  .profile-avatar {
    border-width: 3px;
  }
  
  .v-card-text {
    padding: 12px;
  }
}
</style>