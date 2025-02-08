<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// ✅ Initialisation du router pour redirection après déconnexion
const router = useRouter()
const menuOpen = ref(false)

// 🔹 Fonction pour ouvrir/fermer le menu sur mobile
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// 🔹 Fonction de déconnexion
const logout = () => {
  localStorage.removeItem('token') // Supprime le token JWT
  localStorage.removeItem('role') // Supprime le rôle utilisateur
  router.push('/login') // Redirige vers la page de connexion
}
</script>

<template>
  <div class="app-container">
    <!-- 🍽️ Barre de navigation -->
    <header class="navbar">
      <div class="logo">🍷 Digital Restau</div>

      <!-- Menu Desktop -->
      <nav class="nav-links">
        <router-link to="/">🏠 Accueil</router-link>
        <router-link to="/commandes">📜 Commandes</router-link>
        <router-link to="/recettes">🍽 Recettes</router-link>
        <router-link to="/ingredients">🥦 Ingrédients</router-link>
        <router-link to="/passer-commande">🛒 Passer commande</router-link>
        <router-link to="/about">ℹ️ À propos</router-link>
        <button class="logout-btn" @click="logout">🚪 Déconnexion</button>
      </nav>

      <!-- Menu Mobile -->
      <button class="menu-btn" @click="toggleMenu">🍔</button>
      <div v-if="menuOpen" class="dropdown-menu">
        <ul>
          <li><router-link to="/" @click="toggleMenu">🏠 Accueil</router-link></li>
          <li><router-link to="/commandes" @click="toggleMenu">📜 Commandes</router-link></li>
          <li><router-link to="/recettes" @click="toggleMenu">🍽 Recettes</router-link></li>
          <li><router-link to="/ingredients" @click="toggleMenu">🥦 Ingrédients</router-link></li>
          <li>
            <router-link to="/passer-commande" @click="toggleMenu">🛒 Passer commande</router-link>
          </li>
          <li><router-link to="/about" @click="toggleMenu">ℹ️ À propos</router-link></li>
          <li><button class="logout-btn" @click="logout">🚪 Déconnexion</button></li>
        </ul>
      </div>
    </header>

    <!-- 📌 Contenu principal -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- 🍷 Pied de page -->
    <footer class="footer">
      <p>© 2025 Digital Restau - Tous droits réservés</p>
    </footer>
  </div>
</template>

<style scoped>
/* ✅ Conteneur principal */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
}

/* 🍽️ Barre de navigation */
.navbar {
  background: linear-gradient(135deg, #8b4513, #a0522d);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  position: relative;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  font-family: 'Playfair Display', serif;
}

/* ✅ Logo */
.logo {
  font-size: 24px;
  font-weight: bold;
}

/* 📌 Liens de navigation */
.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #ffd700; /* 🎨 Effet doré */
}

/* 🔥 Menu Burger (Mobile) */
.menu-btn {
  display: none;
  font-size: 26px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* 📜 Menu déroulant Mobile */
.dropdown-menu {
  position: absolute;
  top: 60px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  width: 200px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  border-bottom: 1px solid #ddd;
}

.dropdown-menu a,
.dropdown-menu button {
  display: block;
  padding: 12px;
  text-align: left;
  color: #333;
  font-size: 16px;
  text-decoration: none;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  font-weight: bold;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  background: #ffcc00;
  color: #333;
}

/* 🚪 Bouton Déconnexion */
.logout-btn {
  background-color: #ff4d4d;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
}

.logout-btn:hover {
  background-color: #cc0000;
}

/* 📌 Contenu principal */
.main-content {
  flex: 1;
  padding: 40px;
  background: #f8f9fa;
}

/* 🍷 Pied de page */
.footer {
  background: linear-gradient(135deg, #8b4513, #a0522d);
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 16px;
}

/* 📱 Responsivité */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .menu-btn {
    display: block;
  }
}
</style>
