import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function isEmpty(value){
  return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
  );
}


export default new Vuex.Store({
  state: {
    isLogin: null,
    isAdmin: null,
    user: null
  },
  getters:{
    getUser: state => {
      if(!state.user){
        state.user = JSON.parse(localStorage.getItem('user'))
      }
      return state.user
    }
  },
  mutations: {
    setLogin(state, payload){
        if(! isEmpty(payload)){
          state.isLogin = "true";
          localStorage.setItem('isLogin', "true");
        }
    },
    setUser(state, payload){
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    },
    judgeIdentity(state, payload){
      state.isAdmin = payload.identity === "admin";
      if(payload.identity === "admin"){
        localStorage.setItem('isAdmin', "true");
      }else{
        localStorage.setItem('isAdmin', "false");
      }
    }
  },
  actions: {

  }
})
