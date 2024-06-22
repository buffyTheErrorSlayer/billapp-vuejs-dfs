import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bills',
      name: 'bills',
      component: () => import('../views/BillListView.vue')
    },

    // l'ordre de déclaration des routes est important - il faut tjrs déclarer les routes les plus globales en premier
    {
      path: '/edit-bill',
      redirect: '/create-bill'
    },
    {
      path: '/edit-bill/:id',
      props: true,
      name: 'edit-bill',
      component: () => import('../views/EditBillView.vue')
    },

    {
      path: '/create-bill',
      name: 'create-bill',
      component: () => import('../views/CreateBillView.vue')
    },

    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/ClientListView.vue')
    },
    {
      path: '/edit-bill',
      redirect: '/create-bill'
    },
    {
      path: '/edit-client/:id',
      props:true,
      name: 'edit-client',
      component: () => import('../views/CreateEditClientView.vue')
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
