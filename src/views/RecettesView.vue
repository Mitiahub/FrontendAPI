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
      console.log(
        '🌍 Tentative de récupération des recettes depuis:',
        'http://localhost:8000/api/recettes',
      )

      const response = await apiClient.get('http://localhost:8000/api/recettes')

      console.log('✅ Réponse reçue :', response.data)

      // 🔹 Correction de la conversion du temps de cuisson
      this.recettes = response.data.map((recette) => ({
        ...recette,
        temps_cuisson: !isNaN(Number(recette.temps_cuisson)) // ✅ Vérifie que c'est bien un nombre
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
<template>
  <div class="container">
    <h1>Liste des Recettes</h1>

    <!-- Loader pendant le chargement -->
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <!-- Tableau des recettes -->
    <table v-else class="recipe-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Temps de cuisson</th>
          <th>Description</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recette in recettes" :key="recette.id">
          <td>{{ recette.id }}</td>
          <td>{{ recette.nom }}</td>
          <td>{{ recette.temps_cuisson }}</td>
          <td>{{ recette.description }}</td>
          <td>
            <img
              v-if="recette.imageUrl"
              :src="recette.imageUrl"
              alt="Image recette"
              class="recipe-img"
            />
            <span v-else>Aucune image</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Message si aucune recette -->
    <p v-if="!loading && recettes.length === 0" class="no-recipe">Aucune recette disponible.</p>
  </div>
</template>

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

.recipe-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.no-recipe {
  color: #888;
  font-size: 16px;
  margin-top: 20px;
}
</style>
