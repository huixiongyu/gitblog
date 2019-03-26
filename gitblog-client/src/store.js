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
    isAuthenticated: false,
    isAdmin: false,
    user: {}
  },
  mutations: {
    setIsAuthenticated(state, payload){
        if(! isEmpty(payload)){
          state.isAuthenticated = true;
        }
    },
    setUser(state, payload){
      state.user = payload;
    },
    judgeIdentity(state, payload){
      if(payload.identity === 'admin'){
        state.isAdmin = true
      }else{
        state.isAdmin = false
      }
    }
  },
  actions: {

  }
})
