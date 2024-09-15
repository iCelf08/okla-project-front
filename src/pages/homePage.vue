<template>
  <div class="homepage">
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

    <div class="homepage-content">
      <div
        class="background-image"
        :style="{ backgroundImage: `url(${currentImage})` }"
      ></div>
      <div class="description-heading">
        <h2>Choose Your Ingredients and Find Your Recipe</h2>
      </div>
      <SearchBar @update:recipes="updateRecipes" />
      <RecipeList :recipes="recipes" />
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import RecipeList from '../components/RecipeList.vue';

export default {
  components: {
    SearchBar,
    RecipeList,
  },
  data() {
    return {
      recipes: [],
      imageUrls: [
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/1448721/pexels-photo-1448721.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',

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
    updateRecipes(recipes) {
      this.recipes = recipes;
    },
    setRandomBackgroundImage() {
      const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
      this.currentImage = this.imageUrls[randomIndex];
    },
  },
};
</script>

<style scoped>
.homepage {
  font-family: 'Roboto', sans-serif;
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
  flex-direction: column;
  transition: background-image 1s ease-in-out;
}

.navbar {
  background-color: #da6837;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100vw;
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

.description-heading {
  font-size: 28px;
  font-weight: bold;
  color: #ffffff; /* Text color */
  font-family: 'Merriweather', serif; /* Use an attractive font */
  margin-bottom: 20px;
  background: linear-gradient(
    to right,
    #ff7e5f,
    #feb47b
  ); /* Gradient background */
  -webkit-background-clip: text; /* Clip the background to text */
  -webkit-text-fill-color: transparent; /* Make text color transparent for gradient effect */
  text-align: center;
  padding: 10px; /* Add padding for better appearance */
  border-radius: 5px; /* Optional: Rounded corners */
  transition: background 0.3s ease; /* Smooth transition for hover effect */
}

.description-heading:hover {
  background: linear-gradient(
    to right,
    #f85032,
    #e73827
  ); /* Hover gradient effect */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-arabic {
  margin-right: 20px;
  direction: rtl;
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

.homepage-content {
  padding: 2rem;
}
</style>
