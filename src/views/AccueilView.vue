<template>
  <div class="accueil-container">
    <!-- 🏆 En-tête Accueil -->
    <div class="hero">
      <h1>🍷 Bienvenue chez <span class="highlight">Digital Restau</span></h1>
      <p class="subtitle">Gérez vos commandes et découvrez nos recettes en toute simplicité !</p>
    </div>

    <!-- 🌟 Sections d'action -->
    <div class="action-section">
      <h2>Que souhaitez-vous faire aujourd'hui ?</h2>

      <div class="buttons">
        <router-link to="/commandes" class="btn">📦 Gérer les commandes</router-link>
        <router-link to="/recettes" class="btn">🍽️ Explorer les recettes</router-link>
        <router-link to="/ingredients" class="btn">🛒 Voir les ingrédients</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🍽️ Fond premium inspiré des restaurants */
.accueil-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #8b4513, #ffcc00); /* Dégradé chocolat doré */
  color: white;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 🏆 En-tête Accueil */
.hero {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  width: 70%;
}

h1 {
  font-size: 30px;
  margin-bottom: 10px;
}

/* ✨ Effet sur le texte */
.highlight {
  color: #ffcc00;
  font-weight: bold;
}

.subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
}

/* 🌟 Section d'action */
.action-section {
  margin-top: 30px;
  text-align: center;
}

h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: white;
}

/* 🎮 Boutons interactifs */
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn {
  display: inline-block;
  padding: 12px 18px;
  background: #ffcc00;
  color: #333;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
  box-shadow: 0px 4px 10px rgba(255, 204, 0, 0.5);
}

.btn:hover {
  background: #ffaa00;
  transform: scale(1.1);
}
</style>
