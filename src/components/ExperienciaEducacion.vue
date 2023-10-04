<template>
  <v-container>
    <v-card class="mx-auto my-auto" :loading="isLoadingExperienciaComputed">
      <v-toolbar color="#a7d9da" dark>
        <v-toolbar-title>Experiencia</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <div class="scrollable-card">
        <v-list class="scrollable-list" style="overflow-y: auto">
          <v-list-item
            v-for="experiencia in experienciasComputed"
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

    <v-card class="mx-auto mt-3" :loading="isLoadingEducacionComputed">
      <v-toolbar color="#a7d9da" dark>
        <v-toolbar-title>Educacion</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <div class="scrollable-content">
        <v-list class="scrollable-list" style="overflow-y: auto">
          <v-list-item
            v-for="educacion in educacionesComputed"
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "ExperienciaEducacion",

  data() {
    return {
    isLoadingExperiencia: false,
    isLoadingEducacion: false,
  };
  },
  computed: {
    ...mapGetters('experienciaEducacion', ['educaciones', 'experiencias']),
    isLoadingEducacionComputed() {
      return this.$store.getters['experienciaEducacion/isLoadingEducacion'];
    },
    isLoadingExperienciaComputed() {
      return this.$store.getters['experienciaEducacion/isLoadingExperiencia'];
    },
    experienciasComputed() {
      return this.experiencias;
    },
    educacionesComputed() {
      return this.educaciones;
    },
  },
  methods: {
    ...mapActions('experienciaEducacion', ['fetchEducaciones', 'fetchExperiencias']),
    setIsInHomePage() {
      this.$store.commit('setIsInHomePage', false);
    },
  },
  created() {
    this.fetchEducaciones();
    this.fetchExperiencias();
    this.setIsInHomePage();
  },
  mounted() {
    this.fetchEducaciones();
    this.fetchExperiencias();
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
