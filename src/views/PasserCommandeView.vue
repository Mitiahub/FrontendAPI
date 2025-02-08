<template>
  <div class="commande-container">
    <h1 class="title">📦 Passer une Commande</h1>

    <!-- Loader pendant le chargement -->
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <!-- Liste des recettes avec case à cocher -->
    <div v-else class="recipe-grid">
      <div v-for="recette in recettes" :key="recette.id" class="recipe-card">
        <div class="recipe-content">
          <h2>{{ recette.nom }}</h2>
          <p class="price">💰 {{ recette.prix }}</p>
          <p class="cook-time">⏳ {{ formatTempsCuisson(recette.temps_cuisson) }}</p>
          <p class="description">{{ recette.description }}</p>

          <!-- Sélection de la recette -->
          <div class="selection-container">
            <input
              type="checkbox"
              v-model="recetteSelectionnees"
              :value="recette.id"
              class="recipe-checkbox"
            />
            <label>Sélectionner</label>
          </div>

          <!-- Quantité -->
          <input
            type="number"
            v-model.number="quantites[recette.id]"
            :disabled="!recetteSelectionnees.includes(recette.id)"
            min="1"
            class="quantity-input"
          />
        </div>
      </div>
    </div>

    <!-- Messages -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <!-- Bouton de confirmation -->
    <button
      type="submit"
      class="commande-button"
      :disabled="recetteSelectionnees.length === 0"
      @click.prevent="passerCommande"
    >
      ✅ Confirmer la Commande
    </button>
  </div>
</template>

<script>
import apiClient from '@/services/api'

export default {
  data() {
    return {
      recettes: [],
      loading: true,
      recetteSelectionnees: [],
      quantites: {},
      errorMessage: '',
      successMessage: '',
    }
  },
  async mounted() {
    try {
      const response = await apiClient.get('http://localhost:8000/api/recettes/')
      this.recettes = response.data
      this.recettes.forEach((recette) => {
        this.quantites[recette.id] = 1
      })
    } catch (error) {
      console.error('Erreur API Recettes:', error)
      this.errorMessage = 'Impossible de charger les recettes.'
    } finally {
      this.loading = false
    }
  },
  methods: {
    async passerCommande() {
      this.errorMessage = ''
      this.successMessage = ''

      if (this.recetteSelectionnees.length === 0) {
        this.errorMessage = 'Veuillez sélectionner au moins une recette.'
        return
      }

      const idToken = localStorage.getItem('token')

      if (!idToken) {
        this.errorMessage = 'Utilisateur non authentifié.'
        return
      }

      try {
        const recettesACommander = this.recetteSelectionnees.map((recetteId) => ({
          recette_id: recetteId,
          quantite: this.quantites[recetteId] || 1,
        }))

        const response = await apiClient.post(
          'http://localhost:8000/api/commande/passer',
          { recettes: recettesACommander },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
              'Content-Type': 'application/json',
            },
          },
        )

        this.successMessage = response.data.message
        this.recetteSelectionnees = []
      } catch (error) {
        console.error('Erreur lors du passage de la commande:', error)
        this.errorMessage = 'Erreur lors du passage de la commande.'
      }
    },
    formatTempsCuisson(temps) {
      return Math.floor(temps / 60) + ' min'
    },
  },
}
</script>

<style scoped>
/* 🍽️ Fond élégant et raffiné */
.commande-container {
  min-height: 100vh;
  text-align: center;
  padding: 40px;
  width: 85vw;
  margin: auto;
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0); /* Dégradé doux */
  color: #333;
  font-family: 'Poppins', sans-serif;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* 📌 Titre */
.title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #8b4513; /* Marron élégant */
}

/* 🔄 Loader */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loader {
  border: 5px solid #ddd;
  border-top: 5px solid #8b4513;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

/* 🍽️ Disposition des recettes */
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* 🍷 Cartes de recettes */
.recipe-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* 🏆 Effet au survol */
.recipe-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
}

/* 🍔 Image */
.recipe-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

/* 💰 Prix */
.price {
  font-size: 18px;
  font-weight: bold;
  color: #8b4513;
  margin: 5px 0;
}

/* ⏳ Temps de cuisson */
.cook-time {
  font-size: 15px;
  color: #555;
}

/* 📝 Description */
.description {
  font-size: 14px;
  color: #777;
  margin: 10px 0;
}

/* 🎯 Sélection & quantité */
.selection-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.recipe-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* 🔢 Input Quantité */
.quantity-input {
  width: 70px;
  padding: 8px;
  border: 1px solid #8b4513;
  border-radius: 5px;
  text-align: center;
}

/* 🎮 Bouton */
.commande-button {
  background: #8b4513;
  color: white;
  font-size: 18px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.2s ease;
  margin-top: 20px;
}

.commande-button:hover {
  background: #5a3210;
  transform: scale(1.1);
}
</style>
