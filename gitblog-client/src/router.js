import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Settings from './views/Settings'
import UserAdmin from "./views/UserAdmin"
Vue.use(Router)

const router =new Router({
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
      component: Settings,
      children: [
        {
          path: '',
          component: () => import('./views/adminpage/Profile.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./views/adminpage/Profile.vue')
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('./views/adminpage/Account.vue')
        },
        {
          path: 'comment',
          name: 'comment',
          component: () => import('./views/adminpage/Comment.vue')
        },        {
          path: 'data',
          name: 'data',
          component: () => import('./views/adminpage/Data.vue')
        },        {
          path: 'tag',
          name: 'tag',
          component: () => import('./views/adminpage/Tag.vue')
        },        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('./views/adminpage/Categories.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('./views/adminpage/User.vue')
        }
      ]
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
      path:'*',redirect:'/overview'
    }
  ]
});

function isEmpty(value){
  return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
  );
}

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  if(to.name === 'settings'){
    if ( !isEmpty(user) && user.identity === "admin"  ){
      next();
    }else{
      router.push({name: 'home'});
    }
  }
  if(to.name === 'useradmin'){
    if ( !isEmpty(user) && user.identity === "member"  ){
      next();
    }else{
      router.push({name: 'home'});
    }
  }
  next();
});

export default router;
