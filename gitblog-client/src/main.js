import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/iconfont/iconfont.css'
import axios from 'axios'


Vue.use(iView);
Vue.config.productionTip = false;


axios.interceptors.request.use(
    config => {
      if (localStorage.blogToken) { //判断token是否存在
        config.headers.Authorization = localStorage.blogToken;  //将token设置成请求头
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
);


Vue.prototype.$axios = axios;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');
