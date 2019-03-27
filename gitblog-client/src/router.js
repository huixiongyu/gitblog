import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Settings from './views/Settings'
import UserAdmin from "./views/UserAdmin"
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // redirect: '/home/overview',
      children: [
        {
          path: '',
          component: () => import('./views/homepage/Overview.vue')
        },
        {
          path: 'overview',
          name: 'overview',
          component: () => import('./views/homepage/Overview.vue')
        },
        {
          path: 'posts',
          name: 'posts',
          component: () => import('./views/homepage/Posts.vue')
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('./views/homepage/Categories.vue')
        },
        {
          path: 'tags',
          name: 'tags',
          component: () => import('./views/homepage/Tags.vue')
        },
        {
          path: 'followers',
          name: 'followers',
          component: () => import('./views/homepage/Followers.vue')
        },
        {
          path: 'aboutme',
          name: 'aboutme',
          component: () => import('./views/homepage/AboutMe.vue')
        }
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('./views/ForgetPassword.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/useradmin',
      name: 'useradmin',
      component: UserAdmin,
      children: [
        {
          path: '',
          component: () => import('./views/useradmin/Profile.vue')
        },
        {
          path: 'profile',
          name: 'userprofile',
          component: () => import('./views/useradmin/Profile.vue')
        },
        {
          path: 'comment',
          name: 'usercomment',
          component: () => import('./views/useradmin/Comment.vue')
        }
      ]
    },
    {
      path: 'zindex',
      name: 'zindex',
      component: () => import('./views/ZindexTest.vue')
    },
    {
      path:'*',redirect:'/overview'
    }
  ]
})
