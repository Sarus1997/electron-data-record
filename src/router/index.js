import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import HomePage from "../components/HomePage.vue";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router