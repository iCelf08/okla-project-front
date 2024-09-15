<template>
  <div>
    <div class="recipe-list">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="recipe-card"
        @click="openModal(recipe)"
      >
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
        <h3 class="recipe-title">{{ recipe.title }}</h3>
        <p class="recipe-description">
          {{ recipe.missedIngredients[0]?.aisle || 'No description available' }}
        </p>
      </div>
    </div>
    <RecipeModal
      :recipe="selectedRecipe"
      :visible="isModalVisible"
      @update:visible="isModalVisible = $event"
    />
  </div>
</template>

<script>
import RecipeModal from './RecipeModal.vue';

export default {
  components: {
    RecipeModal,
  },
  props: {
    recipes: Array,
  },
  data() {
    return {
      selectedRecipe: null,
      isModalVisible: false,
    };
  },
  methods: {
    openModal(recipe) {
      this.selectedRecipe = recipe;
      this.isModalVisible = true;
    },
  },
};
</script>

<style scoped>
.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.recipe-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  cursor: pointer; /* Indicate that the card is clickable */
}

.recipe-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.recipe-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.recipe-description {
  padding: 0 1rem;
  font-size: 0.9rem;
  color: #666;
}
</style>
