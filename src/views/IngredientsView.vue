<template>
  <div class="container">
    <h1>Liste des Ingrédients</h1>

    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <table v-else class="ingredient-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Stock</th>
          <th>Seuil Minimum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in ingredients" :key="ingredient.id">
          <td>{{ ingredient.id }}</td>
          <td>{{ ingredient.nom }}</td>
          <td>{{ ingredient.quantite_stock }}</td>
          <td>{{ ingredient.seuil_minimum }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && ingredients.length === 0">Aucun ingrédient disponible.</p>
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
      this.ingredients = response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des ingrédients :', error)
    } finally {
      this.loading = false
    }
  },
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.ingredient-table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
