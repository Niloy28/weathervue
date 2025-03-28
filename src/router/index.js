import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WeatherView from '@/views/WeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/weather/:country/:city',
      name: 'weatherView',
      component: WeatherView,
      meta: {
        title: 'Weather',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = `${to.params.state ? `${to.params.city}, ${to.params.country}` : to.meta.title} | Weather Vue`
  next()
})

export default router
