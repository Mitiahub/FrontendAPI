<template>
  <div class="accueil-container">
    <h1>Bienvenue sur votre espace utilisateur</h1>
    <p>Que souhaitez-vous faire aujourd'hui ?</p>

    <div class="buttons">
      <router-link to="/commandes" class="btn">Voir les commandes</router-link>
      <router-link to="/recettes" class="btn">Voir les recettes</router-link>
      <router-link to="/ingredients" class="btn">Gérer les ingrédients</router-link>
    </div>
  </div>
</template>

<style scoped>
/* 🔥 Style de la page d'accueil */
.accueil-container {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  color: #333;
}

p {
  font-size: 18px;
  color: #555;
}

.buttons {
  margin-top: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 15px;
  margin: 10px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.btn:hover {
  background: #2980b9;
}
</style>
