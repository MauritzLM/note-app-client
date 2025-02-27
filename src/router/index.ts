import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
     path: '/',
     name: 'index',
     redirect: '/all'
    },
    {
      path: '/all',
      name: 'all notes',
      component: () => import('../views/NoteView.vue'),
     
    },
    {
      path: '/archived',
      name: 'archived notes',
      component: () => import('../views/NoteView.vue'),
      
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/NoteView.vue'),
      
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('../views/NoteView.vue'),
      
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
