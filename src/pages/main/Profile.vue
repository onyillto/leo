<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="profile-card elevation-12">
          <!-- Profile Header -->
          <v-card-title class="profile-header">
            <v-avatar size="100" class="profile-avatar elevation-6 mb-4">
              <img 
                :src="profile.photo || '/bus.jpg'" 
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
              <h2 class="text-h6 md-text-h5">{{ profile.name }}</h2>
              <p class="text-caption md:text-subtitle-1 text-muted">User</p>
            </div>
          </v-card-title>

          <!-- Profile Details -->
          <v-card-text>
            <v-form ref="profileForm" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="profile.name"
                    label="Full Name"
                    prepend-icon="mdi-account"
                    outlined
                    dense
                    :rules="[v => !!v || 'Full name is required']"
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
import { ref, reactive, onMounted } from 'vue';

// Profile Data
const profile = reactive({
  name: '',
  email: '',
  phone: '',
  gender: '',
  photo: '/bus.jpg'
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

// Load user data from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      profile.name = user.name || '';
      profile.email = user.email || '';
      profile.phone = user.phone || '';
      profile.gender = user.gender || '';
      if (user.photo) {
        profile.photo = user.photo;
      }
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
  }
};

// Methods
const updateProfile = async () => {
  // Validate form
  const isValid = profileForm.value.validate();
  
  if (isValid) {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authentication required');
        return;
      }

      // Prepare data
      const userData = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        gender: profile.gender
      };

      // Update profile
      const response = await fetch('https://user.bloomrydes.org/api/v1/interstate/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await response.json();

      // Update localStorage with new user data
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { 
        ...currentUser, 
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        gender: profile.gender
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Show success message
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile');
    }
  }
};

const changePassword = async () => {
  // Validate password form
  const isValid = passwordForm.value.validate();
  
  if (isValid) {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authentication required');
        return;
      }

      // Verify passwords match
      if (password.new !== password.confirm) {
        alert('Passwords do not match');
        return;
      }

      // Update password
      const response = await fetch('https://user.bloomrydes.org/api/v1/interstate/user/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: password.current,
          newPassword: password.new
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to change password');
      }

      // Reset form and close dialog
      password.current = '';
      password.new = '';
      password.confirm = '';
      passwordDialog.value = false;
      
      // Show success message
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error.message || 'Failed to change password');
    }
  }
};

const openAvatarUpload = async () => {
  // Implementation would typically open a file dialog
  // and upload the selected image to the server
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  
  fileInput.addEventListener('change', async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('avatar', file);
      
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authentication required');
          return;
        }
        
        // Upload the avatar
        const response = await fetch('https://user.bloomrydes.org/api/v1/interstate/user/profile/photo', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload avatar');
        }
        
        // Update photo URL in user localStorage
        const data = await response.json();
        if (data.photo) {
          profile.photo = data.photo;
          
          // Update localStorage
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          currentUser.photo = data.photo;
          localStorage.setItem('user', JSON.stringify(currentUser));
        }
        
        // Show success message
        alert('Avatar updated successfully');
      } catch (error) {
        console.error('Error uploading avatar:', error);
        alert(error.message || 'Failed to upload avatar');
      }
    }
  });
  
  fileInput.click();
};

// Load user data when component mounts
onMounted(() => {
  loadUserFromLocalStorage();
});
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