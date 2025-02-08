<template>
  <div class="ingredient-container">
    <h1 class="ingredient-title">🧑‍🍳 Gestion des Ingrédients</h1>

    <!-- Loader animé -->
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <!-- Liste des ingrédients -->
    <div v-else class="ingredient-grid">
      <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-card">
        <!-- Affichage de l'image -->
        <img
          v-if="ingredient.imageUrl"
          :src="ingredient.imageUrl"
          alt="Image"
          class="ingredient-image"
        />
        <h2>{{ ingredient.nom }}</h2>
        <p :class="getStockClass(ingredient.quantite_stock, ingredient.seuil_minimum)">
          🛒 Stock: {{ ingredient.quantite_stock }}
        </p>
        <p class="threshold">⚠️ Seuil Min: {{ ingredient.seuil_minimum }}</p>
        <button class="ingredient-button">📌 Voir Détails</button>
      </div>
    </div>

    <!-- Message si aucun ingrédient -->
    <p v-if="!loading && ingredients.length === 0" class="no-ingredient">
      Aucun ingrédient disponible.
    </p>
  </div>
</template>

<script>
import apiClient from '@/services/api'

export default {
  data() {
    return {
      ingredients: [],
      loading: true,
    }
  },
  async mounted() {
    try {
      const response = await apiClient.get('/ingredients/')
      this.ingredients = response.data.map((ingredient) => ({
        ...ingredient,
        imageUrl: ingredient.imageUrl ? `http://localhost:8000/${ingredient.imageUrl}` : null,
      }))
    } catch (error) {
      console.error('Erreur lors de la récupération des ingrédients :', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    getStockClass(stock, seuil) {
      return stock < seuil ? 'low-stock' : 'high-stock'
    },
  },
}
</script>

<style scoped>
/* 🍽️ Conteneur principal */
.ingredient-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
  color: rgb(0, 0, 0);
  text-align: center;
  font-family: 'Playfair Display', serif;
}

/* 🏆 Titre */
.ingredient-title {
  font-size: 28px;
  font-weight: bold;
  color: #ffcc00;
  margin-bottom: 20px;
}

/* 🔄 Loader */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loader {
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid #ffcc00;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

/* 📋 Grid des ingrédients */
.ingredient-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  padding: 20px;
}

/* 🎨 Cartes des ingrédients */
.ingredient-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.ingredient-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 25px rgba(255, 204, 0, 0.6);
}

/* 📸 Image des ingrédients */
.ingredient-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

/* 📊 Stock */
.low-stock {
  color: #e74c3c;
  font-weight: bold;
}

.high-stock {
  color: #2ecc71;
  font-weight: bold;
}

/* 🚨 Seuil minimum */
.threshold {
  font-size: 14px;
  color: #000000;
  margin: 5px 0;
}

/* 🎯 Bouton */
.ingredient-button {
  background: #ffcc00;
  color: #333;
  font-size: 16px;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition:
    background 0.3s ease,
    transform 0.2s ease;
}

.ingredient-button:hover {
  background: #ffaa00;
  transform: scale(1.1);
}

/* 🛑 Message si aucun ingrédient */
.no-ingredient {
  color: #ffcc00;
  font-size: 18px;
  margin-top: 20px;
}

/* 🔄 Animation Loader */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
