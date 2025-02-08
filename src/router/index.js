import { createRouter, createWebHistory } from 'vue-router'
import CommandesView from '@/views/CommandesView.vue'
import AccueilView from '@/views/AccueilView.vue'
import LoginView from '@/views/LoginView.vue'
import RecettesView from '@/views/RecettesView.vue'
import IngredientsView from '@/views/IngredientsView.vue'
import PasserCommandeView from '@/views/PasserCommandeView.vue'
import AboutView from '@/views/AboutView.vue'
import DashboardView from '@/views/DashboardView.vue' // 📊 Importation de la page Statistiques

const routes = [
  { path: '/login', component: LoginView },
  {
    path: '/',
    redirect: '/dashboard', // 🚀 Redirection vers le tableau de bord après connexion
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }, // 📊 Statistiques protégées
  },
  {
    path: '/accueil',
    component: AccueilView,
    meta: { requiresAuth: true },
  },
  {
    path: '/commandes',
    component: CommandesView,
    meta: { requiresAuth: true },
  },
  {
    path: '/recettes',
    component: RecettesView,
    meta: { requiresAuth: true },
  },
  {
    path: '/ingredients',
    component: IngredientsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/passer-commande',
    component: PasserCommandeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    component: AboutView,
    meta: { requiresAuth: false }, // ℹ️ Page publique
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🔐 Vérification de l'authentification avant chaque navigation
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') // Vérifie si l'utilisateur est connecté

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // 🔄 Redirige vers le login si non connecté
  } else {
    next() // ✅ Autorise la navigation
  }
})

export default router
