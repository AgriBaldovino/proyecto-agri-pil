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
  async fetchEducaciones() {
    try {
      const response = await axios.get(
        'https://pil-2023-land-default-rtdb.firebaseio.com/personajes/Harry/estudios.json'
      );
      return response?.data;
    } catch (error) {
      console.error('Error al obtener los datos de educación:', error);
    }
  },

  async fetchExperiencias() {
    try {
      const response = await axios.get(
        'https://pil-2023-land-default-rtdb.firebaseio.com/personajes/Harry/experiencia.json'
      );
      return response?.data;
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
