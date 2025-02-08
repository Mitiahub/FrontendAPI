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
      <h3>📌 Qui sommes-nous ?</h3>
      <p>
        Digital Restau est une plateforme conçue pour faciliter la gestion des commandes, des
        recettes et des ingrédients pour les restaurants. Notre solution repose sur des technologies
        modernes afin d'offrir une expérience fluide et sécurisée.
      </p>
    </section>

    <!-- ✅ Technologies utilisées -->
    <section class="tech-section">
      <h3>🔧 Technologies utilisées</h3>
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
      <h3>🚀 Fonctionnalités principales</h3>
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
      <h3>👨‍💻 L'équipe derrière le projet</h3>
      <p>
        Une équipe de développeurs passionnés par l'innovation et la digitalisation des restaurants.
      </p>
    </section>

    <!-- ✅ Contact -->
    <section class="contact-section">
      <h2>📞 Contactez-nous</h2>
      <p>📧 Email: <a href="mailto:support@digitalrestau.com">support@digitalrestau.com</a></p>
      <p>📍 Adresse: Antananarivo, Madagascar</p>
    </section>
  </div>
</template>

--- ### **🎨 Amélioration du style :** Ajoute ce **CSS** directement dans **`AboutView.vue`** ou
dans ton fichier **CSS global**. ```vue
<style scoped>
/* 🎨 Style général */
.about-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

/* ✅ En-tête */
.header {
  background: linear-gradient(135deg, #8b4513, #a0522d);
  color: white;
  padding: 50px;
  border-radius: 10px;
  font-weight: bold;
}

.header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.header .highlight {
  font-weight: bold;
  color: #ffcc00;
}

/* ✅ Sections */
section {
  margin-top: 30px;
  padding: 25px;
  border-radius: 8px;
  background: #f9f9f9;
  text-align: center;
}

h3 {
  color: #333;
  font-size: 26px;
  margin-bottom: 15px;
}

p {
  font-size: 16px;
  color: #120909;
  line-height: 1.7;
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
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.tech-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

.tech-card h3 {
  margin-top: 10px;
  font-size: 20px;
  color: #a0522d;
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
  padding: 10px 0;
  font-size: 16px;
  color: #333;
}

ul li::before {
  content: '✔️ ';
  color: green;
  font-weight: bold;
}

/* ✅ Contact */
.contact-section {
  background: linear-gradient(135deg, #a0522d, #8b4513);
  color: white;
  padding: 30px;
  border-radius: 8px;
}

.contact-section a {
  color: #ffd700;
  font-weight: bold;
  text-decoration: none;
}

.contact-section a:hover {
  text-decoration: underline;
}

/* ✅ Responsivité */
@media (max-width: 768px) {
  .about-container {
    width: 95%;
  }

  .tech-grid {
    flex-direction: column;
    align-items: center;
  }

  .tech-card {
    width: 80%;
  }
}
</style>
