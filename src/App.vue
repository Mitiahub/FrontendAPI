<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// ✅ Initialisation du router pour redirection après déconnexion
const router = useRouter()

// ✅ État pour gérer l'affichage du menu dropdown
const menuOpen = ref(false)

// 🔹 Fonction pour ouvrir/fermer le menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// 🔹 Fonction pour fermer le menu lorsqu'on clique sur un lien
const closeMenu = () => {
  menuOpen.value = false
}

// 🔹 Fonction de déconnexion
const logout = () => {
  localStorage.removeItem('token') // Supprime le token JWT
  localStorage.removeItem('role') // Supprime le rôle utilisateur
  closeMenu() // Ferme le menu après déconnexion
  router.push('/login') // Redirige vers la page de connexion
}
</script>

<template>
  <div class="app-container">
    <!-- Barre de navigation -->
    <header class="navbar">
      <div class="logo">🚀 Mon Application Vue</div>

      <!-- Menu hamburger pour mobile -->
      <button class="menu-btn" @click="toggleMenu">☰</button>

      <!-- Menu dropdown -->
      <div v-if="menuOpen" class="dropdown-menu">
        <ul>
          <li><router-link to="/" @click="closeMenu">🏠 Accueil</router-link></li>
          <li><router-link to="/commandes" @click="closeMenu">📜 Commandes</router-link></li>
          <li><router-link to="/recettes" @click="closeMenu">🍽 Recettes</router-link></li>
          <li><router-link to="/ingredients" @click="closeMenu">🥦 Ingrédients</router-link></li>
          <li>
            <router-link to="/passer-commande" @click="closeMenu">🛒 Passer commande</router-link>
          </li>
          <li><router-link to="/about" @click="closeMenu">ℹ️ À propos</router-link></li>
          <li><button class="logout-btn" @click="logout">🚪 Déconnexion</button></li>
        </ul>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- Pied de page -->
    <footer class="footer">
      <p>© 2025 Mon Application - Tous droits réservés</p>
    </footer>
  </div>
</template>

<style scoped>
/* ✅ Conteneur principal */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* ✅ Barre de navigation */
.navbar {
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  position: relative;
}

/* ✅ Logo */
.logo {
  font-size: 20px;
  font-weight: bold;
}

/* ✅ Bouton Menu Mobile */
.menu-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
}

/* ✅ Menu dropdown */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  width: 220px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu ul li {
  border-bottom: 1px solid #ddd;
}

.dropdown-menu ul li a,
.dropdown-menu ul li button {
  display: block;
  width: 100%;
  padding: 12px;
  text-align: left;
  text-decoration: none;
  color: #333;
  background: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.dropdown-menu ul li a:hover,
.dropdown-menu ul li button:hover {
  background: #f4f4f4;
}

/* ✅ Bouton de déconnexion */
.logout-btn {
  background-color: #ff4d4d;
  color: white;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #cc0000;
}

/* ✅ Contenu principal */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* ✅ Pied de page */
.footer {
  background-color: #1b5c9c;
  color: white;
  text-align: center;
  padding: 10px;
}
</style>
