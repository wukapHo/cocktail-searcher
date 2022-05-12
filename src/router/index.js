import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../views/index.vue';

const routes = [
  {
    path: '/',
    name: 'indexPage',
    component: IndexPage,
  },
  {
    path: '/cocktail/:id',
    name: 'cocktailPage',
    component: () => import(/* webpackChunkName: "cocktailPage" */ '../views/CocktailPage.vue'),
  },
  {
    path: '/category/:title',
    name: 'cocktailGroupPage',
    component: () => import(/* webpackChankName: "cocktailGroupPage" */ '../views/CocktailGroupPage.vue'),
  },
  {
    path: '/error',
    name: 'errorPage',
    component: () => import(/* webpackChankName: "errorPage" */ '../views/ErrorPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'errorPage' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
