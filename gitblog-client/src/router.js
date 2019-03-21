import Vue from 'vue'
import Router from 'vue-router'
import Overview from './views/Overview.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'overview',
      component: Overview
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('./views/Reset.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('./views/Posts.vue')      
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('./views/Categories.vue')      
    },    
    {
      path: '/tags',
      name: 'tags',
      component: () => import('./views/Tags.vue')      
    },
    {
      path: '/followers',
      name: 'followers',
      component: () => import('./views/Followers.vue')      
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: () => import('./views/AboutMe.vue')      
    }           
  ]
})
