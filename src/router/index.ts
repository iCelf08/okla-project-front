import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from 'pages/registerPage.vue';
import LoginPage from 'src/pages/loginPage.vue';
import HomePage from 'src/pages/homePage.vue';

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
