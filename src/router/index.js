import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelpView from '../views/HelpView.vue'
import ContactView from '../views/ContactView.vue'
import WeekView from '../views/WeekView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: HomeView
    },
    {
      path: '/week',
      name: 'week',
      component: WeekView
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ],
  // Scroll en haut à chaque changement de page
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
