import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Settings from './views/Settings'
import UserAdmin from "./views/UserAdmin"
import jwt_decode from "jwt-decode";
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
      meta:  {
        requiresAuth: true ,
        requiresAdmin: true
      },
      children: [
        {
          path: '',
          component: () => import('./views/adminpage/Profile.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: true
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./views/adminpage/Profile.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: true
          }
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('./views/adminpage/Account.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: true
          }
        },
        {
          path: 'comment',
          name: 'comment',
          component: () => import('./views/adminpage/Comment.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: true
          }
        },        {
          path: 'data',
          name: 'data',
          component: () => import('./views/adminpage/Data.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: true
          }
        },        {
          path: 'tag',
          name: 'tag',
          component: () => import('./views/adminpage/Tag.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: true
          }
        },        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('./views/adminpage/Categories.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: true
          }
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('./views/adminpage/User.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: true
          }
        }
      ]
    },
    {
      path: '/useradmin',
      name: 'useradmin',
      component: UserAdmin,
      meta:  {
        requiresAuth: true ,
        requiresAdmin: false
      },
      children: [
        {
          path: '',
          component: () => import('./views/useradmin/Profile.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: false
          }
        },
        {
          path: 'profile',
          name: 'userprofile',
          component: () => import('./views/useradmin/Profile.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: false
          }
        },
        {
          path: 'comment',
          name: 'usercomment',
          component: () => import('./views/useradmin/Comment.vue'),
          meta:  {
            requiresAuth: true ,
            requiresAdmin: false
          }
        }
      ]
    },
    {
      path: '/writing',
      name: 'writing',
      component: () => import('./views/Writing.vue')
    },
    {
      path:'*',redirect:'/overview'
    }
  ]
});

function isAdmin(){
  if(localStorage.blogToken){
    const token = localStorage.getItem('blogToken')
    const decode = jwt_decode(token);
    if(decode.identity === "admin"){
      return true;
    }
  }
  return false;
}

function isLogin(){
  if(localStorage.blogToken){
    return true;
  }
  return false;
}


router.beforeEach((to, from, next) => {
  // 需要登录的跳转判断
  //需要权限，并且已经登录了
  // 权限有5种：
  // 1.settings，需要登录，需要管理员
  // 2.useradmin, 需要登录，不需要管理员，管理员不能访问！(也就是同时满足不是管理员，不是管理员管理后台)
  // 3.不满足以上的跳到首页，也就是管理员不能访问普通用户，普通用户不能访问后台
  // 4.没有登录，不能访问需要登录的页面！
  // 5.随便看，我不管
  if (to.matched.some(record => record.meta.requiresAuth) && isLogin()) {
      // console.log('我已经登录了');
      if(to.matched.some(record => record.meta.requiresAdmin) && isAdmin()){
        // console.log('进入了高级管理员模式，我要管理博客发布');
        next();
      }else if(!to.matched.some(record => record.meta.requiresAdmin) && !isAdmin()){
        // console.log('进入了普通用户模式, 我要设置个人信息');
        next();
      }
      else{
        // console.log('因为不符合权限，所以跳到首页了');
        next({
          path: '/'
        });
      }
  // 需要权限，并且没有登录！！
  } else if(to.matched.some(record => record.meta.requiresAuth) && !isLogin()){
    // console.log('需要权限验证，但是我没有登录，所以跳到首页了');
    next({
      path: '/'
    });
  }else{
    // 不需要登录直接跳转
    // console.log('我的行为不需要任何权限');
    next()
  }
});

export default router;
