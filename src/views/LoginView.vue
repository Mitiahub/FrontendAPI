<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Bienvenue chez <span class="highlight">Digital Restau</span></h2>
      <p class="subtitle">Connectez-vous pour gérer vos commandes et vos recettes !</p>

      <form @submit.prevent="login">
        <!-- Email -->
        <div class="input-group">
          <label for="email">✉️ Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <!-- Mot de passe -->
        <div class="input-group">
          <label for="password">🔑 Mot de passe</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <!-- Bouton de connexion -->
        <button type="submit" class="btn">🚀 Se connecter</button>

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

        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)

        const tokenParts = response.data.idToken.split('.')
        const tokenPayload = JSON.parse(atob(tokenParts[1]))
        const userUid = tokenPayload.user_id || tokenPayload.sub
        console.log('🆔 UID extrait du token:', userUid)

        if (userUid) {
          localStorage.setItem('uid', userUid)
        }

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
/* 🍽️ Fond élégant inspiré des restaurants haut de gamme */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #8b4513, #ffcc00); /* Dégradé chocolaté doré */
  font-family: 'Poppins', sans-serif;
}

/* 🎨 Boîte du formulaire */
.login-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px); /* Effet de verre flouté */
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  width: 350px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}

/* 🎭 Titre */
h2 {
  margin-bottom: 10px;
  color: white;
  font-size: 24px;
}

/* 🔥 Highlight */
.highlight {
  color: #ffcc00;
  font-weight: bold;
}

/* 📜 Sous-titre */
.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 20px;
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
  color: white;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  transition: 0.3s;
}

.input-group input:focus {
  background: rgba(255, 255, 255, 0.3);
}

/* 🔵 Bouton */
.btn {
  width: 100%;
  padding: 12px;
  background: #ffcc00;
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  box-shadow: 0px 4px 10px rgba(255, 204, 0, 0.5);
}

.btn:hover {
  background: #ffaa00;
  transform: scale(1.05);
}

/* 🚨 Erreur */
.error-message {
  color: #ffcc00;
  margin-top: 10px;
  font-size: 14px;
}
</style>
