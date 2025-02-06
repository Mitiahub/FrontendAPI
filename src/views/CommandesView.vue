<template>
  <div class="container">
    <!-- En-tête -->
    <h1 class="title"><i class="icon">📜</i> Liste des Commandes</h1>

    <!-- Loader pendant le chargement -->
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
              <button class="btn btn-info" @click="voirDetails(commande)">👁 Voir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Message si aucune commande trouvée -->
      <p v-else class="no-command">Aucune commande trouvée pour cet utilisateur.</p>
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
      console.log("🌍 Récupération des commandes pour l'utilisateur...")

      const firebaseUid = localStorage.getItem('uid') // 🔥 Récupérer l'UID Firebase
      console.log('🆔 UID Firebase trouvé :', firebaseUid)

      if (!firebaseUid) {
        console.error('❌ Aucun UID trouvé !')
        this.errorMessage = 'Utilisateur non authentifié.'
        this.loading = false
        return
      }

      // 🔥 Récupération des commandes de l'utilisateur avec son UID
      const response = await apiClient.get(`/commande/utilisateur/${firebaseUid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // ✅ Vérifier le token Firebase
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
      this.loading = false // ✅ Arrêter le chargement une fois que l'API a répondu
    }
  },
  methods: {
    voirDetails(commande) {
      console.log('Voir les détails de la commande', commande)
    },
    getStatusClass(status) {
      switch (status) {
        case 'en attente':
          return 'status-pending'
        case 'en préparation':
          return 'status-preparing'
        case 'livrée':
          return 'status-delivered'
        case 'annulée':
          return 'status-cancelled'
        default:
          return ''
      }
    },
  },
}
</script>

<style scoped>
/* Conteneur principal */
.container {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #333;
}

/* Titre */
.title {
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Loader */
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

/* Tableau */
.command-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}

.command-table th {
  background-color: #007bff;
  color: white;
  padding: 12px;
  text-align: left;
}

.command-table td {
  color: #333;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.command-table tbody tr:hover {
  background-color: #f9f9f9;
}

/* ✅ Responsive pour mobile */
@media (max-width: 768px) {
  .command-table {
    font-size: 14px;
  }
  .command-table th,
  .command-table td {
    padding: 8px;
  }
}

/* Statuts */
.status {
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
}

.status-pending {
  background-color: #f39c12;
  color: #fff;
}

.status-preparing {
  background-color: #3498db;
  color: #fff;
}

.status-delivered {
  background-color: #2ecc71;
  color: #fff;
}

.status-cancelled {
  background-color: #e74c3c;
  color: #fff;
}

/* Boutons */
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn-info {
  background-color: #3498db;
  color: #fff;
}

.btn-info:hover {
  background-color: #2980b9;
}

/* Alerte */
.no-command {
  text-align: center;
  color: #888;
  font-size: 16px;
  margin-top: 20px;
}
</style>
