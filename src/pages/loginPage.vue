<template>
  <div class="login-page">
    <!-- Navigation Bar -->
    <div class="navbar">
      <div class="title-container">
        <span class="title-english">OkLa</span>
        <span class="title-arabic">أوكلا</span>
      </div>
      <div class="nav-links">
        <a href="/home" class="nav-link">Home</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/contact" class="nav-link">Contact Us</a>
      </div>
    </div>

    <div class="login-container">
      <div
        class="background-image"
        :style="{ backgroundImage: `url(${currentImage})` }"
      ></div>
      <div class="description-heading">
        <h2>Welcome Back! Please Login to Your Account</h2>
      </div>
      <q-form
        @submit.prevent="handleLogin"
        class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 form-container"
      >
        <q-input class="mb-5" v-model="username" label="Username" />
        <q-input
          class="mb-5"
          v-model="password"
          type="password"
          label="Password"
        />
        <q-btn
          class="submit-button"
          type="submit"
          label="Login"
          color="orange"
        />
      </q-form>
    </div>
  </div>
</template>

<script>
import { loginUser as apiLoginUser } from 'src/services/apiService';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      imageUrls: [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        // Add more URLs as needed
      ],
      currentImage: '',
    };
  },
  created() {
    this.setRandomBackgroundImage();
    setInterval(this.setRandomBackgroundImage, 5000); // Change image every 5 seconds
  },
  methods: {
    async handleLogin() {
      try {
        const userData = {
          username: this.username,
          password: this.password,
        };
        const result = await apiLoginUser(userData);
        console.log(result);
        // Handle successful login, maybe navigate or show a message
        this.$router.push('/home'); // Example: navigate to the home page
      } catch (error) {
        console.error('Login error:', error);
        // Handle login error, maybe show a user-friendly message
        this.$q.notify({
          type: 'negative',
          message: 'Login failed. Please check your credentials and try again.',
        });
      }
    },
    setRandomBackgroundImage() {
      const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
      this.currentImage = this.imageUrls[randomIndex];
    },
  },
};
</script>

<style scoped>
.login-page {
  /* position: relative; */
  height: 100vh; /* Full viewport height */
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* overflow: hidden; */
  width: 100vmax;
  flex-direction: column;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1; /* Ensure background is behind the form */
  transition: background-image 1s ease-in-out;
}

.description-heading {
  font-size: 28px;
  font-weight: bolder;
  color: #ffffff; /* Text color */
  font-family: '', serif; /* Use an attractive font */
  margin-top: 100px;
  background: linear-gradient(
    to right,
    #0a4605,
    #0a4605
  ); /* Gradient background */
  -webkit-background-clip: text; /* Clip the background to text */
  -webkit-text-fill-color: transparent; /* Make text color transparent for gradient effect */
  text-align: center;
  margin-left: 50px;
  padding: 10px; /* Add padding for better appearance */
  border-radius: 5px; /* Optional: Rounded corners */
  transition: background 0.3s ease; /* Smooth transition for hover effect */
}

.description-heading:hover {
  background: linear-gradient(
    to right,
    #e73827,
    #e73827
  ); /* Hover gradient effect */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-container {
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow effect */
  background: rgba(255, 255, 255, 0.9); /* Slightly transparent background */
  font-family: 'Roboto', sans-serif; /* Beautiful font */
  z-index: 1; /* Ensure form is above the background image */
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-left: 150px;
}

.input-field {
  margin-bottom: 1rem; /* Space between inputs */
}

.submit-button {
  width: 100%; /* Full width button */
  font-weight: bold; /* Bold text */
  background: linear-gradient(
    to right,
    #c53916,
    #feb47b
  ); /* Gradient background */
  color: white; /* Text color */
  border: none; /* Remove default border */
  padding: 10px 20px; /* Padding for better appearance */
  border-radius: 5px; /* Rounded corners */
  text-align: center; /* Center text */
  cursor: pointer; /* Pointer cursor on hover */
  transition: transform 0.3s ease, background 0.3s ease; /* Smooth transitions */
}
.submit-button:hover {
  background: linear-gradient(
    to right,
    #f85032,
    #e73827
  ); /* Hover gradient effect */
  transform: scale(1.05); /* Slightly enlarge button on hover */
}

.navbar {
  background-color: #da6837;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100vmax;
  height: 75px;
}

.title-container {
  display: flex;
}

.title-english,
.title-arabic {
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
}

.title-arabic {
  margin-right: 20px; /* Space between titles */
  direction: rtl; /* Right-to-left text direction */
}

.nav-links {
  display: flex;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-left: 15px;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Google Font import in the global CSS (or you can include it in your global stylesheet) */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
</style>
