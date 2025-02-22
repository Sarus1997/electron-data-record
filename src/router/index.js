import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginPage.vue';
import Home from '../components/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
