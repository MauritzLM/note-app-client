import { createRouter, createWebHistory } from 'vue-router'
import NoteView from '../views/NoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
     path: '/',
     name: 'index',
     redirect: '/all/all'
    },
    {
      path: '/all/:list',
      name: 'all notes',
      component: NoteView,
     
    },
    {
      path: '/archived/:list',
      name: 'archived notes',
      component: NoteView,
      
    },
    {
      path: '/search/:list',
      name: 'search',
      component: NoteView,
      
    },
    {
      path: '/tags/:list',
      name: 'tags',
      component: NoteView,
      
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SettingsView.vue'),
    },
  ],
})

export default router
