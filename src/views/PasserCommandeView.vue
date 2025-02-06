<template>
  <div class="container">
    <h1>Passer une Commande</h1>

    <!-- Loader pendant le chargement -->
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <!-- Liste des recettes avec case à cocher -->
    <form v-else @submit.prevent="passerCommande">
      <table class="recipe-table">
        <thead>
          <tr>
            <th>Sélection</th>
            <th>Nom</th>
            <th>Temps de cuisson</th>
            <th>Description</th>
            <th>Quantité</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recette in recettes" :key="recette.id">
            <td>
              <input type="checkbox" v-model="recetteSelectionnees" :value="recette.id" />
            </td>
            <td>{{ recette.nom }}</td>
            <td>{{ formatTempsCuisson(recette.temps_cuisson) }}</td>
            <td>{{ recette.description }}</td>
            <td>
              <input
                type="number"
                v-model.number="quantites[recette.id]"
                :disabled="!recetteSelectionnees.includes(recette.id)"
                min="1"
                class="quantity-input"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Bouton de validation -->
      <button type="submit" class="btn" :disabled="recetteSelectionnees.length === 0">
        Passer Commande
      </button>
    </form>

    <!-- Message d'erreur -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import apiClient from '@/services/api'

export default {
  data() {
    return {
      recettes: [],
      loading: true,
      recetteSelectionnees: [], // ✅ Stocke les recettes sélectionnées
      quantites: {}, // ✅ Stocke les quantités par recette
      errorMessage: '',
      successMessage: '',
    }
  },
  async mounted() {
    try {
      console.log('🌍 Chargement des recettes depuis API...')
      const response = await apiClient.get('http://localhost:8000/api/recettes/') // ✅ Correction de l'URL API
      console.log('✅ Réponse API Recettes:', response.data)
      this.recettes = response.data

      // ✅ Initialisation des quantités pour chaque recette
      this.recettes.forEach((recette) => {
        this.quantites[recette.id] = 1
      })
    } catch (error) {
      console.error('❌ Erreur API Recettes:', error)
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

      // ✅ Récupérer uniquement l'ID Token Firebase
      const idToken = localStorage.getItem('token')

      console.log('🔑 Token Firebase récupéré:', idToken)

      if (!idToken) {
        this.errorMessage = 'Utilisateur non authentifié.'
        return
      }

      try {
        // ✅ Préparer les données de commande
        const recettesACommander = this.recetteSelectionnees.map((recetteId) => ({
          recette_id: recetteId,
          quantite: this.quantites[recetteId] || 1,
        }))

        console.log('📦 Envoi des données de commande:', {
          recettes: recettesACommander,
        })

        const response = await apiClient.post(
          'http://localhost:8000/api/commande/passer',
          {
            recettes: recettesACommander, // ✅ On envoie seulement les recettes
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`, // ✅ Envoi du token Firebase
              'Content-Type': 'application/json',
            },
          },
        )

        console.log('✅ Réponse API Commande:', response.data)
        this.successMessage = response.data.message
        this.recetteSelectionnees = [] // 🔄 Réinitialisation après commande
      } catch (error) {
        console.error(
          '❌ Erreur lors de la commande:',
          error.response ? error.response.data : error.message,
        )
        this.errorMessage = 'Erreur lors du passage de la commande.'
      }
    },
    // ✅ Convertit le temps de cuisson en minutes
    formatTempsCuisson(temps) {
      return Math.floor(temps / 60) + ' min'
    },
  },
}
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

.recipe-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #007bff;
  color: white;
}

.quantity-input {
  width: 50px;
  padding: 5px;
}

.btn {
  margin-top: 20px;
  padding: 10px 15px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:disabled {
  background: gray;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
