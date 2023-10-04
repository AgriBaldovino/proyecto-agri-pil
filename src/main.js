import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import CardsHome from './components/CardsHome.vue'
import Presentacion from './components/MiPresentacion.vue'
import ExperienciaYEducacion from './components/ExperienciaEducacion.vue'
// import Aptitudes from './components/Aptitudes.vue'
import Contacto from './components/ContactoHarry.vue'
import store from './store/store.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', 
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home', component: CardsHome },
    { path: '/presentacion', component: Presentacion },
    { path: '/experiencia-educacion', component: ExperienciaYEducacion },
    //{ path: '/aptitudes', component: Aptitudes },
    { path: '/contacto', component: Contacto },
  ]
})


Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
