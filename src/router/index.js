import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  }
  // Add other routes as needed
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router