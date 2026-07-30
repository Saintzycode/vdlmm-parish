import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: () => import('../views/AboutView.vue') },
  { path: '/announcements', component: () => import('../views/AnnouncementsView.vue') },
  { path: '/schedule', component: () => import('../views/ScheduleView.vue') },
  { path: '/location', component: () => import('../views/LocationView.vue') },
  { path: '/contact', component: () => import('../views/ContactView.vue') },
  { path: '/parish-council', component: () => import('../views/ParishCouncil.vue') },
  { path: '/parishadmin', component: AdminLogin },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})