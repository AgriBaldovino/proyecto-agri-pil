import Vue from 'vue';
import Vuex from 'vuex';
import experienciaEducacion from './modules/experienciaEducacion';
import presentacion from './modules/presentacion';


Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return{
      isInHomePage: true,
    }  
  },
  mutations: {
    setIsInHomePage(state, payload) {
      state.isInHomePage = payload;
    }
  },
  getters:{
    isInHomePage: (state) => state.isInHomePage,
  },
  modules: {
    experienciaEducacion,
    presentacion 
  },
});

export default store;