import { createRouter, createWebHistory } from 'vue-router'
import CommandesView from '@/views/CommandesView.vue'
import AccueilView from '@/views/AccueilView.vue'
import LoginView from '@/views/LoginView.vue'
import RecettesView from '@/views/RecettesView.vue'
import IngredientsView from '@/views/IngredientsView.vue'
import PasserCommandeView from '@/views/PasserCommandeView.vue' // ✅ Importation

const routes = [
  { path: '/login', component: LoginView },
  {
    path: '/',
    redirect: '/accueil', // 🚀 Redirection vers l'accueil après connexion
  },
  {
    path: '/accueil',
    component: AccueilView,
    meta: { requiresAuth: true }, // 🔒 Protégé par authentification
  },
  {
    path: '/commandes',
    component: CommandesView,
    meta: { requiresAuth: true }, // 🔒 Protégé par authentification
  },
  {
    path: '/recettes',
    component: RecettesView,
    meta: { requiresAuth: true }, // 🔒 Protégé par authentification
  },
  {
    path: '/ingredients',
    component: IngredientsView,
    meta: { requiresAuth: true }, // 🔒 Protégé par authentification
  },
  {
    path: '/passer-commande',
    component: PasserCommandeView,
    meta: { requiresAuth: true }, // ✅ Protégé par authentification
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
