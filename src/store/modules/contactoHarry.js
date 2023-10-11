import axios from "axios";

const state = {};

const mutations = {};

const actions = {
  async getCelular() {
    try {
      const response = await axios.get(
        "https://pil-2023-land-default-rtdb.firebaseio.com/personajes/Harry/celContacto.json"
      );
      return response?.data;
    } catch (error) {
      console.error("Error al obtener el número de teléfono", error);
    }
  },

  async postContacto(context, payload) {
    try {
      const response = await axios.post(
        "https://pil-2023-land-default-rtdb.firebaseio.com/contacto/Harry.json",
        payload
      );
      return response;
    } catch (error) {
      console.error("Error al enviar formulario de contacto", error);
    }
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
