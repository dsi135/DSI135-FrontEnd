<template>
  <v-container>
    <dashboard v-show="apartados[0].render"/>
    <nuevaorden v-show="apartados[1].render"/>
    <editarorden v-show="apartados[2].render"/>

    <!--BOTONES DASHBOARD-->
    <v-layout v-show="apartados[0].render" align-center justify-center row fill-height>
      <v-flex xs2 offset-xs6>
        <v-btn flat @click="renderizar(1)">NUEVA ORDEN</v-btn>
      </v-flex>
      <v-flex xs2>
        <v-btn flat @click="renderizar(1)">EDITAR ORDEN</v-btn>
      </v-flex>
      <v-flex xs2>
        <v-btn color="error">COBRAR</v-btn>
      </v-flex>
    </v-layout>

    <!-- BOTONES CREAR -->
    <v-layout v-show="apartados[1].render" align-center justify-center row fill-height>
      <v-flex xs2 offset-xs10>
        <v-btn flat @click="renderizar(0)">GUARDAR</v-btn>
      </v-flex>
    </v-layout>


    <!-- BOTONES EDITAR -->
    <v-layout v-show="apartados[2].render" align-center justify-center row fill-height>
      <v-flex xs2 offset-xs10>
        <v-btn flat @click="renderizar(0)">GUARDAR</v-btn>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>
<script>
import Dashboard from "@/components/Dashboard.vue";
import NuevaOrden from "@/components/NewOrder.vue";
import EditarOrden from "@/components/EditarOrden.vue";
export default {
  components: {
    dashboard: Dashboard,
    nuevaorden: NuevaOrden,
    editarorden: EditarOrden
  },
  data() {
    return {
      apartados: [
        { apartado: "Dasboard", render: true},
        { apartado: "Nueva Orden", render: false},
        { apartado: "Editar Orden", render: false}
      ]
    };
  },
  methods: {
    renderizar(index) {
      this.apartados.forEach(apartado => {
        apartado.render = false;
      });
      this.apartados[index].render = true;
    }
  }
};
</script>

