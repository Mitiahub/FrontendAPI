<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <!-- Barre de navigation -->
    <header class="navbar">
      <div class="logo">🚀 Mon Application Vue</div>
      <nav>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/about">À propos</router-link></li>
          <li><router-link to="/commandes">Commandes</router-link></li>
        </ul>
      </nav>
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
/* ✅ Remplit toute la page */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

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
}

.navbar .logo {
  font-size: 20px;
  font-weight: bold;
}

.navbar nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar nav ul li {
  display: inline;
}

.navbar nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.navbar nav ul li a:hover {
  text-decoration: underline;
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
