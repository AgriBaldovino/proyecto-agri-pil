<template>
  <v-container>
    <v-card class="mx-auto my-auto" :loading="isLoadingExperiencia">
      <v-toolbar color="#a7d9da" dark>
        <v-toolbar-title>Experiencia</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <div class="scrollable-card">
        <v-list class="scrollable-list" style="overflow-y: auto">
          <v-list-item
            v-for="experiencia in experiencias"
            :key="experiencia.id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ experiencia.titulo }}</v-list-item-title>
              <v-list-item-content
                style="
                  font-size: 0.875rem;
                  color: rgba(0, 0, 0, 0.6);
                  text-align: justify;
                "
              >
                {{ experiencia.subtitulo }}
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-card>

    <v-card class="mx-auto mt-3" :loading="isLoadingEducacion">
      <v-toolbar color="#a7d9da" dark>
        <v-toolbar-title>Educacion</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <div class="scrollable-content">
        <v-list class="scrollable-list" style="overflow-y: auto">
          <v-list-item
            v-for="educacion in educaciones"
            :key="educacion.id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ educacion.titulo }}</v-list-item-title>
              <v-list-item-content
                style="
                  font-size: 0.875rem;
                  color: rgba(0, 0, 0, 0.6);
                  text-align: justify;
                "
              >
                {{ educacion.subtitulo }}
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { /*mapGetters,*/ mapActions } from 'vuex';

export default {
  name: "ExperienciaEducacion",

  data() {
    return {
    isLoadingExperiencia: false,
    isLoadingEducacion: false,
    educaciones: [],
    experiencias: [],
  };
  },
  methods: {
    ...mapActions('experienciaEducacion', ['fetchEducaciones', 'fetchExperiencias']),
    setIsInHomePage() {
      this.$store.commit('setIsInHomePage', false);
    },
    async obtenerEducaciones(){
      try {
        this.isLoadingEducacion = true;
        this.educaciones = await this.fetchEducaciones();
      } catch (error) {
        console.error(error);
      }
      this.isLoadingEducacion = false;
    },
    async obtenerExperiencias(){
      try {
        this.isLoadingExperiencia = true;
        this.experiencias = await this.fetchExperiencias();
      } catch (error) {
        console.error(error);
      }
      this.isLoadingExperiencia = false;
    }
  },
  created() {
    this.obtenerEducaciones();
    this.obtenerExperiencias();
    this.setIsInHomePage();
  },
};
</script>

<style scoped>
.experiencia-educacion {
  font-family: Arial, sans-serif;
}

.card-container {
  margin-bottom: 20px;
}

.scrollable-card {
  max-height: 250px;
  overflow-y: auto;
}
</style>
