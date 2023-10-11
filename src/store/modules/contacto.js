import axios from "axios";

export const state = () => ({
  // Define tus estados de Vuex aquí
  celularAgri: null, // Agrega la propiedad celularAgri al estado
});

export const mutations = {
  // Define tus mutaciones de Vuex aquí
  setCelularAgri(state, celular) {
    state.celularAgri = celular;
  },
};

export const actions = {
  async enviarFormulario(formData) {
    try {
      const response = await axios.post(
        "https://pil-2023-land-default-rtdb.firebaseio.com/contacto/Harry.json",
        formData
      );

      if (response.status === 200) {
        // Realiza cualquier acción necesaria después de enviar el formulario
      } else {
        throw new Error("Error en la petición");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      throw error;
    }
  },

  async obtenerCelular({ commit }) {
    try {
      const celularAgri = (
        await axios.get(
          "https://pil-2023-land-default-rtdb.firebaseio.com/personajes/Harry/celContacto.json"
        )
      ).data;

      // Actualiza el estado con el número de celular obtenido
      commit("setCelularAgri", celularAgri);
    } catch (error) {
      console.error("Error al obtener el número de celular:", error);
      throw error;
    }
  },
};

export default {
    namespaced: true,
  state,
  mutations,
  actions
};
