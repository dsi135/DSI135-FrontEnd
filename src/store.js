import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
      drawers: [
        { nombre: "Default", tipo: "Default (no property)" },
        { nombre: "Temporal", tipo: "Temporary" }
      ],
      primaryDrawer: {
        model: null,
        type: "default (no property)",
        clipped: false,
        mini: false
      },
      footer: {
        inset: false,
        dark: true,
        alert: false
      },
      cuentas: [
        
      ]
  },
  mutations: {

  },
  actions: {

  }
})