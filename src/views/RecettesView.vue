<template>
  <div class="restaurant-container">
    <h1 class="restaurant-title">🍽️ Découvrez Notre Sélection Gastronomique</h1>

    <!-- Loader animé -->
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <!-- Liste des recettes -->
    <div v-else class="recipe-grid">
      <div v-for="recette in recettes" :key="recette.id" class="recipe-card">
        <img v-if="recette.imageUrl" :src="recette.imageUrl" alt="Recette" class="recipe-img" />
        <div class="recipe-content">
          <h2 class="recipe-title">{{ recette.nom }}</h2>
          <p class="price">💰 {{ recette.prix }}</p>
          <p class="cook-time">⏳ Préparation : {{ recette.temps_cuisson }}</p>
          <p class="description">{{ recette.description }}</p>
          <button class="detail-button">Voir Détails</button>
        </div>
      </div>
    </div>

    <!-- Message si aucune recette -->
    <p v-if="!loading && recettes.length === 0" class="no-recipe">Aucune recette disponible.</p>
  </div>
</template>

<script>
import apiClient from '@/services/api'

export default {
  data() {
    return {
      recettes: [],
      loading: true,
    }
  },
  async mounted() {
    try {
      console.log('🌍 Récupération des recettes depuis:', 'http://localhost:8000/api/recettes')

      const response = await apiClient.get('http://localhost:8000/api/recettes')

      console.log('✅ Réponse reçue :', response.data)

      this.recettes = response.data.map((recette) => ({
        ...recette,
        prix: recette.prix ? `${recette.prix} €` : 'Prix non disponible',
        temps_cuisson: !isNaN(Number(recette.temps_cuisson))
          ? Math.floor(Number(recette.temps_cuisson) / 60) + ' min'
          : 'Indisponible',
        imageUrl: recette.imageUrl ? `http://localhost:8000/images/${recette.imageUrl}` : null,
      }))
    } catch (error) {
      console.error(
        '❌ Erreur API Recettes :',
        error.response ? error.response.data : error.message,
      )
    } finally {
      this.loading = false
    }
  },
}
</script>

<style scoped>
/* 🍷 Interface premium inspirée des restaurants étoilés */
.restaurant-container {
  max-width: 1200px;
  margin: auto;
  padding: 50px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  text-align: center;
  font-family: 'Merriweather', serif; /* Typographie raffinée */
  color: #2c3e50;
}

/* 🍽️ Titre principal */
.restaurant-title {
  font-size: 32px;
  color: #d35400;
  margin-bottom: 30px;
  font-weight: bold;
  text-transform: uppercase;
}

/* 🥘 Grille de disposition */
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

/* 🍷 Cartes des recettes */
.recipe-card {
  background: rgba(255, 255, 255, 0.8); /* Effet verre */
  backdrop-filter: blur(8px);
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

/* ✨ Effet au survol */
.recipe-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 15px 30px rgba(211, 84, 0, 0.5);
}

/* 🍔 Image des recettes */
.recipe-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

/* 🏆 Titre des recettes */
.recipe-title {
  font-size: 20px;
  font-weight: bold;
  color: #e67e22;
}

/* 💰 Prix */
.price {
  font-size: 18px;
  font-weight: bold;
  color: #2ecc71;
  margin: 5px 0;
}

/* ⏳ Temps de cuisson */
.cook-time {
  font-size: 16px;
  color: #d35400;
  font-style: italic;
}

/* 📝 Description */
.description {
  font-size: 14px;
  color: #555;
  margin: 15px 0;
}

/* 🎯 Bouton Voir Détails */
.detail-button {
  background: #e67e22;
  color: #fff;
  font-size: 16px;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition:
    background 0.3s ease,
    transform 0.2s ease;
}

.detail-button:hover {
  background: #d35400;
  transform: scale(1.1);
}

/* ❌ Message si aucune recette */
.no-recipe {
  color: #e74c3c;
  font-size: 18px;
  margin-top: 20px;
}

/* 🔄 Loader animé */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loader {
  border: 6px solid #ecf0f1;
  border-top: 6px solid #d35400;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

/* 🔄 Animation de rotation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
