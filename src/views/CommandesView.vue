<template>
  <div class="commandes-container">
    <h1 class="commandes-title">📜 Suivi des Commandes</h1>

    <!-- Loader animé -->
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <!-- Tableau des commandes -->
    <div v-else>
      <table v-if="commandes.length > 0" class="command-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Statut</th>
            <th>Montant (€)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="commande in commandes" :key="commande.id">
            <td>{{ commande.id }}</td>
            <td>
              <span class="status" :class="getStatusClass(commande.status)">
                {{ commande.status }}
              </span>
            </td>
            <td>{{ commande.montant_total }}€</td>
            <td>{{ commande.created_at }}</td>
            <td>
              <button class="btn btn-details" @click="voirDetails(commande)">👁 Voir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Message si aucune commande trouvée -->
      <p v-else class="no-command">Aucune commande trouvée.</p>
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
      commandes: [],
      loading: true,
      errorMessage: '',
    }
  },
  async mounted() {
    try {
      console.log("🌍 Récupération des commandes de l'utilisateur...")

      const firebaseUid = localStorage.getItem('uid') // 🔥 Récupérer l'UID Firebase
      console.log('🆔 UID Firebase trouvé :', firebaseUid)

      if (!firebaseUid) {
        console.error('❌ Aucun UID trouvé !')
        this.errorMessage = 'Utilisateur non authentifié.'
        this.loading = false
        return
      }

      // 🔥 Récupération des commandes
      const response = await apiClient.get(`/commande/utilisateur/${firebaseUid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })

      console.log('✅ Commandes récupérées :', response.data)
      this.commandes = response.data
    } catch (error) {
      console.error(
        '❌ Erreur API Commandes :',
        error.response ? error.response.data : error.message,
      )
      this.errorMessage = 'Erreur lors de la récupération des commandes.'
    } finally {
      this.loading = false
    }
  },
  methods: {
    voirDetails(commande) {
      console.log('🔍 Voir les détails de la commande', commande)
    },
    getStatusClass(status) {
      return (
        {
          'en attente': 'status-pending',
          'en préparation': 'status-preparing',
          livrée: 'status-delivered',
          annulée: 'status-cancelled',
        }[status] || ''
      )
    },
  },
}
</script>

<style scoped>
/* 🎨 Conteneur principal */
.commandes-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  font-family: 'Playfair Display', serif;
}

/* 📜 Titre */
.commandes-title {
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

/* 📊 Tableau des commandes */
.command-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  overflow: hidden;
}

/* 🏆 En-têtes */
.command-table th {
  background-color: #8b4513;
  color: white;
  padding: 15px;
  text-align: left;
  font-size: 18px;
}

/* 📝 Cellules */
.command-table td {
  padding: 15px;
  color: rgb(0, 0, 0);
  border-bottom: 1px solid rgba(28, 26, 26, 0.2);
}

.command-table tbody tr:hover {
  background: rgba(20, 20, 20, 0.2);
}

/* 🟢 Statuts */
.status {
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
}

.status-pending {
  background-color: #f39c12;
  color: white;
}

.status-preparing {
  background-color: #3498db;
  color: white;
}

.status-delivered {
  background-color: #2ecc71;
  color: white;
}

.status-cancelled {
  background-color: #e74c3c;
  color: white;
}

/* 🎯 Boutons */
.btn {
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition:
    transform 0.2s,
    background 0.3s;
}

.btn-details {
  background: #ffcc00;
  color: #333;
  font-weight: bold;
}

.btn-details:hover {
  background: #ffaa00;
  transform: scale(1.1);
}

/* 🚀 Message si aucune commande */
.no-command {
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
