import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import HomePage from './components/Home/HomePage.vue';
import CityDetailPage from './components/CityDetail/CityDetailPage.vue';
import store from './store/store.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/city/:cityName', component: CityDetailPage, props: true },
    { path: '/:notFound(.*)', redirect: '/'}
  ]
});

const app = createApp(App)
app.use(router);
app.use(store);
app.mount('#app');
