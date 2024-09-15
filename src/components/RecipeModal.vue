<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="items-center mx-0 px-0">
        <h2 class="modal-title">{{ recipeDetails?.title || 'Loading...' }}</h2>
        <!-- <button @click="close">×</button> -->
      </div>
      <img
        v-if="recipeDetails?.image"
        :src="recipeDetails?.image"
        alt="Recipe Image"
        class="modal-image"
      />
      <p class="modal-description">{{ recipeDetails?.description || '' }}</p>

      <div class="modal-body">
        <!-- <div class="sidebar">
          <button @click="scrollTo('ingredients')">Ingredients</button>
          <button @click="scrollTo('instructions')">Instructions</button>
        </div> -->
        <div class="content">
          <div
            id="ingredients"
            v-if="
              recipeDetails?.extendedIngredients &&
              recipeDetails.extendedIngredients.length
            "
          >
            <h6>Ingredients:</h6>
            <ul>
              <li
                v-for="ingredient in recipeDetails.extendedIngredients"
                :key="ingredient.id"
              >
                {{ ingredient.amount }} {{ ingredient.unit }}
                {{ ingredient.nameClean }}
              </li>
            </ul>
          </div>

          <div id="instructions" v-if="recipeDetails?.instructions">
            <h6>Instructions:</h6>
            <ol>
              <li
                v-for="step in recipeDetails.analyzedInstructions[0]?.steps"
                :key="step.number"
              >
                {{ step.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <button @click="toggleFavorite">
        {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    recipe: Object,
    visible: Boolean,
  },
  data() {
    return {
      recipeDetails: {},
      loading: true,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.fetchRecipeDetails();
      }
    },
  },
  methods: {
    async fetchRecipeDetails() {
      if (!this.recipe?.id) {
        console.error('No recipe ID provided');
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/meal/${this.recipe.id}`
        );
        this.recipeDetails = response.data;
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        this.loading = false;
      }
    },

    close() {
      this.$emit('update:visible', false);
    },

    async fetchUserId() {
      const token = localStorage.getItem('accessToken');

      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/user/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data); // Log response for debugging
          return response.data.id;
        } catch (error) {
          console.error('Failed to fetch user ID:', error);
          return null;
        }
      } else {
        console.error('No access token found');
        return null;
      }
    },

    async toggleFavorite() {
      if (!this.recipe?.id) {
        console.error('No recipe ID provided');
        return;
      }

      const token = localStorage.getItem('accessToken');
      const userId = await this.fetchUserId(); // Ensure you await the async call
      console.log({ token });

      try {
        if (this.isFavorite) {
          // Attempt to delete the favorite
          await axios.delete(
            `http://127.0.0.1:8000/api/favorites/${this.recipe.id}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                user: userId,
              },
            }
          );
          this.isFavorite = false;
        } else {
          // Attempt to add the favorite
          await axios.post(
            'http://127.0.0.1:8000/api/favorites/',
            {
              favorite_recipe_id: this.recipe.id,
              user: userId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.isFavorite = true;
        }
      } catch (error) {
        console.error(
          'Error toggling favorite:',
          error.response?.data || error.message
        );
      }
    },

    scrollTo(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(138, 135, 78, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: rgb(204, 204, 141);
  border-radius: 10px;
  padding: 1rem;
  width: 80%;
  max-width: 800px;
  max-height: 80%;
  position: relative;
  overflow: auto;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-left: 2rem;
}

.modal-description {
  color: #666;
}

.modal-body {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

/* .sidebar {
  width: 150px;
  background: #f0f0f0;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
} */

/* .sidebar button {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  border: none;
  background: #e0e0e0;
  cursor: pointer;
} */

/* .sidebar button:hover {
  background: #d0d0d0;
} */
.modal-image {
  width: 100%; /* Makes the image responsive */
  border-radius: 10px;
  margin-top: 1rem;
}

.content {
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
