import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/parishadmin', component: AdminLogin },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})