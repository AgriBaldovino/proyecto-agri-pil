<template>
  <v-container style="justify-content: center">
    <v-card elevation="5" max-width="70%" class="mx-auto pa-8">
      <h2>Formulario de contacto</h2>
      <v-form
        ref="form"
        v-model="valid"
        class="arial-form"
        @submit.prevent="enviarFormulario"
      >
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="nombreApellido"
              :counter="20"
              :rules="nameRules"
              label="Nombre y apellido"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="mail"
              :rules="mailRules"
              label="Mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="tipoSolicitud"
              :items="solicitud"
              :rules="[(v) => !!v || 'Seleccione un tipo de solicitud']"
              label="Tipo de solicitud"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="dialogDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dialogDate"
                  :rules="dialogDateRules"
                  required
                  label="Fecha estimada de solicitud"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dialogDate" type="month" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(dialogDate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <v-textarea
          v-model="observaciones"
          label="Observaciones"
          :rows="3"
          style="height: 100px; min-height: 50px"
          class="mt-0 pt-0"
        >
        </v-textarea>

        <v-row>
          <v-col class="pa-2">
            <v-container class="custom-card" style="max-height: 110px">
              <v-card-title>
                <span class="headline">Preferencia de horario de contacto</span>
              </v-card-title>
              <v-row class="py-0">
                <v-col cols="4" class="py-0">
                  <v-checkbox
                    v-model="mañana"
                    label="Mañana"
                    @change="cambiarIdesdeT"
                    class="pl-2"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4" class="py-0">
                  <v-checkbox
                    v-model="tarde"
                    label="Tarde"
                    @change="cambiarIdesdeT"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4" class="py-0">
                  <v-checkbox
                    v-model="indefinido"
                    label="Indefinido"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="">
            <div class="button-container">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="clear-icon"
                    v-bind="attrs"
                    v-on="on"
                    @click="limpiarCampos"
                  >
                    mdi-filter-remove-outline
                  </v-icon>
                </template>
                <span>Limpiar campos</span>
              </v-tooltip>

              <v-btn
                :disabled="!valid || isLoading || !checkHorario"
                type="submit"
                color="success"
              >
                <template v-if="isLoading">
                  <span>Cargando...</span>
                </template>
                <template v-else>Enviar</template>
                <v-icon>mdi-whatsapp</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { VTooltip, VIcon, VBtn } from "vuetify/lib";
import { mapActions } from "vuex";

export default {
  name: "ContactoHarry",
  components: {
    VTooltip,
    VIcon,
    VBtn,
  },
  data: () => ({
    valid: true,
    nombreApellido: "",
    nameRules: [
      (v) => !!v || "Campo requerido",
      (v) =>
        (v && v.length <= 20) || "El nombre debe tener menos de 20 caracteres",
      (v) => !/\d/.test(v) || "No se permiten números en el nombre",
    ],
    mail: "",
    mailRules: [
      (v) => !!v || "Campo requerido",
      (v) => /.+@.+\..+/.test(v) || "Mail inválido",
    ],
    tipoSolicitud: null,
    solicitud: ["Cumpleaños", "Evento", "Particular"],
    observaciones: "",
    checkbox: false,
    formularioCompleto: false,
    dialogDate: null,
    modal: false,
    dialogDateRules: [(v) => !!v || "Por favor seleccione una fecha"],
    isLoading: false,
    showMessage: false,
    show: false,
    mañana: false,
    tarde: false,
    indefinido: false,
    checkboxRules: [
      () =>
        this.mañana ||
        this.tarde ||
        this.indefinido ||
        "Seleccione al menos una opción",
    ],
  }),
  computed: {
    whatsappLink() {
      const encodedMessage = encodeURIComponent(this.generarMensajeWp());
      this.getNumeroCelular();
      return `https://api.whatsapp.com/send?phone=${this.celularAgri}&text=${encodedMessage}`;
    },
    checkHorario() {
      return this.mañana || this.tarde || this.indefinido;
    },
  },
  watch: {
    indefinido(value) {
      console.log(value);
      if (value) {
        setTimeout(() => {
          this.mañana = this.tarde = false;
        }, 1);
      }
    },
  },
  methods: {
    ...mapActions({
      getCelular: "contactoHarry/getCelular",
      postContacto: "contactoHarry/postContacto",
    }),
    async Enviar() {
      this.isLoading = true;
      const formData = {
        nombreApellido: this.nombreApellido,
        mail: this.mail,
        tipoSolicitud: this.tipoSolicitud,
        observaciones: this.observaciones,
        preferenciasHorario: this.obtenerPreferenciasHorario(),
        fechaSolicitud: this.dialogDate,
      };

      try {
        const response = await this.postContacto(formData);
        if (response.status === 200) {
          const message = this.generarMensajeWp();

          const whatsappLink = `https://api.whatsapp.com/send?phone=${
            this.celularAgri
          }&text=${encodeURIComponent(message)}`;
          window.open(whatsappLink, "_blank");

          // this.$refs.form.resetValidation();
          this.isLoading = false;
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        this.isLoading = false;
      }
      this.limpiarCampos();
    },

    async getNumeroCelular() {
      this.celularAgri = await this.getCelular();
    },
    generarMensajeWp() {
      const mensaje =
        `Nombre y Apellido: ${this.nombreApellido}\n` +
        `Mail: ${this.mail}\n` +
        `Tipo de Solicitud: ${this.tipoSolicitud}\n` +
        `Observaciones: ${this.observaciones}\n` +
        `Preferencia de contacto: ${this.obtenerPreferenciasHorario()}\n` +
        `Fecha estimada de la solicitud: ${this.dialogDate}`;
      return mensaje;
    },
    checkFormularioCompleto() {
      this.formularioCompleto =
        this.$refs.form.validate() &&
        this.nombreApellido &&
        this.mail &&
        this.tipoSolicitud &&
        this.dialogDate;
    },
    limpiarCampos() {
      this.nombreApellido = "";
      this.mail = "";
      this.tipoSolicitud = "";
      this.observaciones = "";
      this.dialogDate = null;
      this.mañana = false;
      this.tarde = false;
      this.indefinido = false;
    },
    obtenerPreferenciasHorario() {
      const preferencias = [];
      if (this.mañana) {
        preferencias.push("Mañana");
      }
      if (this.tarde) {
        preferencias.push("Tarde");
      }
      if (this.indefinido) {
        preferencias.push("Indefinido");
      }
      return preferencias.join(", ");
    },

    cambiarIdesdeT() {
      if (this.tarde && this.mañana) {
        this.indefinido = true;
      } else {
        this.indefinido = false;
      }

      this.checkFormularioCompleto();
    },
    setIsInHomePage() {
      this.$store.commit("setIsInHomePage", false);
    },
  },

  created() {
    this.setIsInHomePage();
  },
};
</script>

<style scoped>
.my-custom-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 140vh; /* altura*/
}
.form-container {
  border: 1px solid #ccc;
  padding: 20px;
  width: 800px; /*ancho del contenedor*/
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.form-container h2 {
  margin-top: 0;
}
.arial-form {
  font-family: Arial, sans-serif;
  font-size: 14px !important;
}
.headline {
  font-family: "Arial";
  font-size: 15px !important; /* tamaño de fuente */
}
.custom-card {
  padding-bottom: 8px;
  margin-bottom: 20px;
  margin-top: 0px;
  padding-top: 0%;
  max-height: 200px;
}
.v-messages__message {
  color: red !important;
}
.button-container {
  display: flex;
  justify-content: flex-end; /* Alineación a la derecha */
  margin-top: 0px;
  padding-top: 0%;
}
.scrollable-card {
  max-height: 600px;
  overflow-y: auto;
}
.clear-icon {
  padding-right: 8px;
}
.v-application .overflow-y-auto {
  overflow-y: hidden !important;
}
</style>
