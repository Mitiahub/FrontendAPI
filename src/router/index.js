import { createRouter, createWebHistory } from 'vue-router'
import CommandesView from '@/views/CommandesView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  { path: '/login', component: LoginView },
  {
    path: '/',
    component: CommandesView,
    meta: { requiresAuth: true }, // 🔒 Protéger cette route
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🔐 Vérification de l'authentification avant chaque navigation
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') // Vérifie si le token existe

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // 🔄 Redirige vers le login si non connecté
  } else {
    next() // Autorise la navigation
  }
})

export default router
