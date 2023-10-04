<template>
  <v-container class="cards-container">
      <v-row class="px-5">
        <v-col v-for="card in cards" :key="card.title" cols="12" sm="6" md="4">
          <router-link :to="{ path: card.router }" style="margin-bottom: 1px">
            <v-card @click="MostrarTarjetas">
              <v-img :src="card.imageUrl" height="300px"> </v-img>
              <v-card-title style="background-color: #f5f5f5 !important">
                {{card.title}}
              </v-card-title>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
      <router-view v-if="!mostrarTarjetas"></router-view>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    mostrarTarjetas: true,
    cards: [
      {
        title: "Presentacion",
        router: "/presentacion",
        imageUrl:
          "https://es.rollingstone.com/wp-content/uploads/2021/12/El-eterno-resplandor-de-Harry-Styles.jpg",
      },
      {
        title: "Experiencia y Educacion",
        router: "/experiencia-educacion",
        imageUrl:
          "https://viapais.com.ar/resizer/4rMOTjqAEyFBImQHEx65iGKTj1c=/980x640/smart/filters:quality(75):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/UO2INP2QTJBLLEOZPJ67YO44SM.jpg",
      },
      {
        title: "Contacto",
        router: "/contacto",
        imageUrl:
          "https://hips.hearstapps.com/hmg-prod/images/harry-styles-performs-live-on-stage-during-the-brit-awards-news-photo-1689158296.jpg",
      },
      // {
      //   title: 'Aptitudes',
      //   imageUrl: 'URL',
      // },
    ],
  }),
  created() {
    this.setIsInHomePage(true);
  },
  methods: {
    MostrarTarjetas() {
      console.log(
        "🚀 ~ file: CardsHome.vue:59 ~ MostrarTarjetas ~ this.mostrarTarjetas:",
        this.mostrarTarjetas
      );
      this.mostrarTarjetas = !this.mostrarTarjetas;
    },
    setIsInHomePage(boolean) {
      this.$store.commit("setIsInHomePage", boolean);
    },
  },
};
</script>

<style scoped>
.cards-container {
  /*display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;*/
  height: 100%; /* ocupar la altura total del contenedor  */
  /*padding: 50px; /* Espacio en blanco arriba y debajo de las tarjetas */
}
</style>
