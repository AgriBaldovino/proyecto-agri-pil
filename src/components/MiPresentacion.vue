<template>
  <v-container class="my-auto">
    <v-card
      class="mx-auto"
      max-width="80%" 
      elevation="12"
    >
      <div class="card-content">
        <div class="card-image">
          <v-img
            src="https://www.ultrabrit.com/wp-content/uploads/2023/07/Harry-Styles.jpg"
            height="100%" 
          ></v-img>
        </div>
        <div class="card-details">
          <v-card-title>
            Harry Styles
          </v-card-title>

          <v-card-subtitle>
            Cantante
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              text
              
            >
              Leer mas
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show = !show"
            >
              <v-icon
              color="red" >{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ presentacionHarry }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
import { /*mapGetters*/ mapActions } from 'vuex';
export default {
  name: 'MiPresentacion',

  data: () => ({
    presentacionHarry: "",
    show: false,
  }),

  computed: {
    // ...mapGetters('presentacion', ['presentacionHarry']),
    // presentacionComputed() {
    //   return this.presentacionHarry;
    // },
    
  },

  methods: {
    ...mapActions('presentacion', ['fetchPresentacion']),
    setIsInHomePage(){
      this.$store.commit('setIsInHomePage', false)
    },
    async cargarPresentacion(){
      try {
        this.presentacionHarry = await this.fetchPresentacion();
      } catch (error) {
        console.error("🚀 ~ file: MiPresentacion.vue:85 ~ cargarPresentacion ~ error:", error)
      }
    }
  },

  created() {
    this.cargarPresentacion();
    this.setIsInHomePage(); 
  },
}
</script>

<style scoped>
.centered-component {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto ;
}

.card-content {
  display: flex;
  flex-direction: row; 
}

.card-image {
  flex: 1;
  max-width: 50%;
}

.card-details {
  flex: 1;
  padding: 16px;
}
</style>


