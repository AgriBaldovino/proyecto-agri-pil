<template>
  <v-app>
    <v-toolbar dark color="#a7d9da" max-height="10%">
      <v-tooltip bottom v-if="!isInHomePage">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            size="28px"
            @click="GoToHome()"
            v-bind="attrs"
            v-on="on"
            class="group pa-2"

          >
            mdi-home
          </v-icon>
        </template>
        <span>Home</span>
      </v-tooltip>
      <v-toolbar-title>Harry Styles</v-toolbar-title>
    </v-toolbar>

    <router-view></router-view>

    <v-footer dark padless>
      <v-card class="flex" flat tile color="#a7d9da">
        <v-card-title>
          <strong class="subheading" style="margin-bottom: 1px"
            >Redes sociales</strong
          >
          <v-spacer></v-spacer>
          <div class="icon-container">
            <v-spacer></v-spacer>
            <a
              v-for="red in redes"
              :key="red.icon"
              :href="red.link"
              target="_blank"
            >
              <v-btn class="ml-2" dark icon>
                <v-icon size="24px">{{ red.icon }}</v-icon>
              </v-btn>
            </a>
          </div>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    redes: [
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/harrystyles",
      },
      {
        icon: "mdi-twitter",
        link: "https://twitter.com/Harry_Styles",
      },
      {
        icon: "mdi-instagram",
        link: "https://www.instagram.com/harrystyles/",
      },
      {
        icon: "mdi-youtube",
        link: "https://www.youtube.com/watch?v=olGSAVOkkTI",
      },
    ],
  }),
  computed: {
    ...mapGetters(['isInHomePage'])
    // isInHomePage(){
    //   return this.$store.getters.isInHomePage
      
    // }
  },
  methods: {
    GoToHome() {
      // Verifica si estás en la página de inicio antes de hacer la redirección
      if (!this.isInHomePage) {
        this.$router.push('/home');
      }
    },
    

  }
};
</script>
