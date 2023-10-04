import axios from 'axios';

const state = {
  educaciones: [],
  experiencias: [],
};

const mutations = {
  SET_EDUCACIONES(state, educaciones) {
    state.educaciones = educaciones;
  },
  SET_EXPERIENCIAS(state, experiencias) {
    state.experiencias = experiencias;
  },
};

const actions = {
  async fetchEducaciones({ commit }) {
    try {
      const response = await axios.get(
        'https://pil-2023-land-default-rtdb.firebaseio.com/personajes/Harry/estudios.json'
      );
      commit('SET_EDUCACIONES', response.data);
    } catch (error) {
      console.error('Error al obtener los datos de educación:', error);
    }
  },

  async fetchExperiencias({ commit }) {
    try {
      const response = await axios.get(
        'https://pil-2023-land-default-rtdb.firebaseio.com/personajes/Harry/experiencia.json'
      );
      commit('SET_EXPERIENCIAS', response.data);
    } catch (error) {
      console.error('Error al obtener los datos de experiencia:', error);
    }
  },
};

const getters = {
  educaciones: (state) => state.educaciones,
  experiencias: (state) => state.experiencias,
};

export default {
    namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
