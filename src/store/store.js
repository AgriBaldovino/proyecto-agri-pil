import Vue from 'vue';
import Vuex from 'vuex';
import experienciaEducacion from './modules/experienciaEducacion';
import presentacion from './modules/presentacion';
import contactoHarry from './modules/contactoHarry';


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
    presentacion,
    contactoHarry
  },
});

export default store;