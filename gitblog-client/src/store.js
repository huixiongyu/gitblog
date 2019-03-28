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
    isLogin: false,
    isAdmin: false,
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
          state.isLogin = true;
        }
    },
    setUser(state, payload){
      state.user = payload;
    },
    judgeIdentity(state, payload){
      state.isAdmin = payload.identity === "admin";
    }
  },
  actions: {

  }
})
