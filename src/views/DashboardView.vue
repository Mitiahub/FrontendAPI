<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">🍽️ Tableau de Bord du Restaurant</h1>

    <!-- Loader pendant le chargement -->
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <!-- Affichage des statistiques -->
    <div v-else class="stats-grid">
      <div class="stat-card">
        <i class="fas fa-receipt"></i>
        <h2>Total des commandes</h2>
        <p class="stat-value">{{ stats.total_commandes }}</p>
      </div>

      <div class="stat-card">
        <i class="fas fa-euro-sign"></i>
        <h2>Montant total (€)</h2>
        <p class="stat-value">{{ stats.montant_total }}</p>
      </div>

      <div class="stat-card">
        <i class="fas fa-clock"></i>
        <h2>Dernière commande</h2>
        <p class="stat-value">{{ stats.derniere_commande }}</p>
      </div>

      <div class="stat-card large-card">
        <i class="fas fa-chart-pie"></i>
        <h2>Commandes par statut</h2>
        <ul class="status-list">
          <li v-for="(count, statut) in stats.commandes_par_statut" :key="statut">
            <span class="status-label">{{ statut }}</span>
            <span class="status-count">{{ count }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Message d'erreur -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import apiClient from '@/services/api'

export default {
  data() {
    return {
      stats: {
        total_commandes: 0,
        commandes_par_statut: {},
        montant_total: '0.00 €',
        derniere_commande: 'Aucune commande',
      },
      loading: true,
      errorMessage: '',
    }
  },
  async mounted() {
    try {
      console.log('🌍 Récupération des statistiques...')

      const response = await apiClient.get('/commande/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })

      console.log('✅ Statistiques récupérées :', response.data)
      this.stats = response.data
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des statistiques :', error)
      this.errorMessage = 'Erreur lors de la récupération des statistiques.'
    } finally {
      this.loading = false
    }
  },
}
</script>

<style scoped>
/* 🌟 Fond chic et épuré */
.dashboard-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(135deg, #2c3e50, #34495e); /* Bleu foncé classe */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: white;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

/* 🍽️ Titre stylé */
.dashboard-title {
  font-size: 28px;
  color: #ffcc00; /* Or */
  margin-bottom: 25px;
  font-weight: bold;
}

/* 🔄 Loader animé */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #ffcc00;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  animation: spin 1s linear infinite;
}

/* 📊 Grille des statistiques */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* 🏆 Cartes stylées */
.stat-card {
  background: linear-gradient(135deg, #b45f06, #ffcc00); /* Effet doré */
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  color: white;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  font-weight: bold;
  position: relative;
  overflow: hidden;
}

/* 🌟 Effet de survol */
.stat-card:hover {
  transform: scale(1.07);
  box-shadow: 0px 10px 25px rgba(255, 204, 0, 0.6);
}

/* 🏅 Icônes élégantes */
.stat-card i {
  font-size: 32px;
  margin-bottom: 10px;
  color: #fff;
}

/* 🔢 Valeurs */
.stat-value {
  font-size: 22px;
  font-weight: bold;
}

/* 📊 Grande carte pour les statuts */
.large-card {
  grid-column: span 2;
}

/* 📌 Liste des statuts */
.status-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.status-list li {
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 5px;
}

.status-label {
  font-weight: bold;
}

.status-count {
  font-weight: bold;
  background: rgba(255, 204, 0, 0.8);
  padding: 5px 10px;
  border-radius: 6px;
}

/* 🛑 Message d'erreur */
.error-message {
  color: red;
  font-size: 18px;
  margin-top: 20px;
}

/* 🔄 Animation du loader */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
