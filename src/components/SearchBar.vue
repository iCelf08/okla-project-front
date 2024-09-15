<template>
  <div class="search-bar-container">
    <input
      v-model="ingredient"
      @keyup.enter="addIngredient"
      type="text"
      placeholder="Enter an ingredient and press Enter"
      class="ingredient-input"
    />
    <div class="ingredient-list">
      <span
        v-for="(ing, index) in ingredients"
        :key="index"
        class="ingredient-item"
      >
        {{ ing }}
        <button @click="removeIngredient(index)" class="remove-button">
          x
        </button>
      </span>
    </div>
    <button @click="searchRecipes" class="search-button">Search Recipes</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ingredient: '',
      ingredients: [],
    };
  },
  methods: {
    addIngredient() {
      const trimmedIngredient = this.ingredient.trim();
      if (trimmedIngredient && !this.ingredients.includes(trimmedIngredient)) {
        this.ingredients.push(trimmedIngredient);
        this.ingredient = '';
      }
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    async searchRecipes() {
      try {
        const token = localStorage.getItem('accessToken');
        const ingredientsQuery = this.ingredients.join(','); // Join ingredients with commas
        const response = await fetch(
          `http://127.0.0.1:8000/api/search-by-ingredients/?ingredients=${encodeURIComponent(
            ingredientsQuery
          )}&number=18`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.$emit('update:recipes', data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },
  },
};
</script>

<style scoped>
.search-bar-container {
  background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.ingredient-input {
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 5px;
  width: calc(100% - 1rem);
  margin-bottom: 1rem;
}

.ingredient-list {
  margin-bottom: 1rem;
}

.ingredient-item {
  display: inline-block;
  background-color: #ddd;
  padding: 0.5rem;
  border-radius: 5px;
  margin: 0.5rem;
}

.remove-button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}

.search-button {
  background-color: #87a319;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>
