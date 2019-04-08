<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <v-card class="mx-auto" height="95px">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs6>&nbsp;&nbsp;&nbsp;ORDEN:</v-flex>
            <v-flex xs6>MESA:</v-flex>
            <v-flex xs6>&nbsp;&nbsp;&nbsp;MESERO:</v-flex>
            <v-flex xs6>CLIENTE:</v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-data-table :headers="headers" :items="productos" class="elevation-1">
        <template v-slot:items="productos">
          <td>{{ productos.item.cantidad }}</td>
          <td>{{ productos.item.producto }}</td>
          <td>${{ productos.item.precio }}</td>
          <td>${{ productos.item.precio * productos.item.cantidad }}</td>
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" icon="warning">Aun no elije productos</v-alert>
        </template>
      </v-data-table>
        <template>
            <v-btn flat @click="$router.push('dashboard')">GUARDAR</v-btn>
        </template>
      <v-layout row wrap>
        <v-flex xs3 offset-xs9 class="text-xs-center">
          <b>Total ${{total()}}</b>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Observaciones" single-line></v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Cantidad", sortable: false, value: "cantidad" },
        { text: "Producto", sortable: false, value: "producto" },
        { text: "Precio", sortable: false, value: "precio" },
        { text: "Subtotal", sortable: false, value: "subtotal" }
      ]
    };
  },
  methods: {
    total() {
      var resultado = 0;
      for (var item in this.productos) {
        resultado +=
          this.productos[item].precio * this.productos[item].cantidad;
      }

      return resultado;
    }
  },
  props: ["productos"]
};
</script>
