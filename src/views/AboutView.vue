<template>
  <div class="about-container">
    <!-- ✅ En-tête -->
    <div class="header">
      <h1>🍽 Bienvenue sur <span class="highlight">Digital Restau</span></h1>
      <p>
        Une solution innovante pour la gestion des commandes et la digitalisation des restaurants.
      </p>
    </div>

    <!-- ✅ Présentation du projet -->
    <section class="intro-section">
      <h2>📌 Qui sommes-nous ?</h2>
      <p>
        Digital Restau est une plateforme conçue pour faciliter la gestion des commandes, des
        recettes et des ingrédients pour les restaurants. Notre solution repose sur des technologies
        modernes afin d'offrir une expérience fluide et sécurisée.
      </p>
    </section>

    <!-- ✅ Technologies utilisées -->
    <section class="tech-section">
      <h2>🔧 Technologies utilisées</h2>
      <div class="tech-grid">
        <div class="tech-card">
          
          <h3>Vue.js</h3>
          <p>Framework frontend dynamique pour une interface utilisateur fluide.</p>
        </div>
        <div class="tech-card">

          <h3>React</h3>
          <p>Gestion de certaines parties de l'application pour une meilleure modularité.</p>
        </div>
        <div class="tech-card">

          <h3>Symfony</h3>
          <p>API backend robuste et sécurisée.</p>
        </div>
        <div class="tech-card">

          <h3>Firebase</h3>
          <p>Authentification et gestion des utilisateurs.</p>
        </div>
        <div class="tech-card">

          <h3>Godot</h3>
          <p>Utilisé pour des animations interactives et une meilleure expérience utilisateur.</p>
        </div>
      </div>
    </section>

    <!-- ✅ Fonctionnalités -->
    <section class="features-section">
      <h2>🚀 Fonctionnalités principales</h2>
      <ul>
        <li>✔️ Gestion des commandes et suivi en temps réel</li>
        <li>✔️ Gestion des recettes et des ingrédients</li>
        <li>✔️ Authentification sécurisée avec Firebase</li>
        <li>✔️ Interface utilisateur fluide avec Vue et React</li>
        <li>✔️ API robuste propulsée par Symfony</li>
        <li>✔️ Digitalisation de l'expérience restaurant</li>
      </ul>
    </section>

    <!-- ✅ Équipe -->
    <section class="team-section">
      <h2>👨‍💻 L'équipe derrière le projet</h2>
      <p>
        Une équipe de développeurs passionnés par l'innovation et la digitalisation des restaurants.
      </p>
    </section>

    <!-- ✅ Contact -->
    <section class="contact-section">
      <h2>📞 Contactez-nous</h2>
      <p>📧 Email: support@digitalrestau.com</p>
      <p>📍 Adresse: Paris, France</p>
    </section>
  </div>
</template>

--- ### ✅ **Ajout du style professionnel** Ajoute ce style directement dans **`AboutView.vue`** ou
dans ton fichier CSS global. ```vue
<style scoped>
/* ✅ Style général */
.about-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

/* ✅ En-tête */
.header {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  padding: 40px;
  border-radius: 10px;
}

.header h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.header .highlight {
  font-weight: bold;
}

/* ✅ Sections */
section {
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;
  background: #f8f9fa;
  text-align: center;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 15px;
}

p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

/* ✅ Grille des technologies */
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.tech-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 180px;
  text-align: center;
}

.tech-card img {
  width: 50px;
  height: 50px;
}

.tech-card h3 {
  margin-top: 10px;
  font-size: 18px;
  color: #007bff;
}

.tech-card p {
  font-size: 14px;
  color: #555;
}

/* ✅ Liste des fonctionnalités */
ul {
  list-style: none;
  padding: 0;
}

ul li {
  padding: 8px 0;
  font-size: 16px;
  color: #333;
}

ul li::before {
  content: '✔️ ';
  color: green;
}

/* ✅ Contact */
.contact-section {
  background: #007bff;
  color: white;
}

.contact-section p {
  font-size: 18px;
}
</style>
