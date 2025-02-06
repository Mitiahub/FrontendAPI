<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Connexion</h2>

      <form @submit.prevent="login">
        <!-- Email -->
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <!-- Mot de passe -->
        <div class="input-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <!-- Bouton de connexion -->
        <button type="submit" class="btn">Se connecter</button>

        <!-- Message d'erreur -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from '@/services/api'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('/auth/login', {
          email: this.email,
          password: this.password,
        })

        // 🔥 Stocke le token et le Refresh Token
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)

        // 🔥 🔍 Décoder le token Firebase pour extraire l'UID utilisateur
        const tokenParts = response.data.idToken.split('.')
        const tokenPayload = JSON.parse(atob(tokenParts[1])) // 🛠 Décode la partie payload du JWT

        const userUid = tokenPayload.user_id || tokenPayload.sub // 🔑 UID Firebase
        console.log('🆔 UID extrait du token:', userUid)

        if (userUid) {
          localStorage.setItem('uid', userUid) // ✅ Stocke l'UID Firebase
        }

        // ✅ Rediriger après connexion
        this.$router.push('/accueil')
      } catch (error) {
        console.error('❌ Erreur de connexion :', error)
        this.errorMessage = 'Email ou mot de passe incorrect.'
      }
    },
  },
}
</script>

<style scoped>
/* 🔥 Style général */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
}

/* 📌 Formulaire */
.login-box {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

/* ✅ Inputs */
.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

/* 🔵 Bouton */
.btn {
  width: 100%;
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background: #2980b9;
}

/* 🚨 Erreur */
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
