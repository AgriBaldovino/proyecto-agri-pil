import axios from 'axios';

const state = {
    presentacionHarry: null,
};

const mutations = {
    SET_PRESENTACION(state, presentacionHarry) {
      state.presentacionHarry = presentacionHarry;
    },
    
};
  
const actions = {
    async fetchPresentacion(/*{ commit }*/) {
      try {
        const response = await axios.get(
            'https://pil-2023-land-default-rtdb.firebaseio.com/personajes/Harry/presentacion.json'
        );
        //commit('SET_PRESENTACION', response.data);
        return response?.data;
      } catch (error) {
        console.error('Error al obtener los datos de educación:', error);
      }
    },
};
  
const getters = {
    presentacionHarry: (state) => state.presentacionHarry,
};
  
export default {
      namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
  