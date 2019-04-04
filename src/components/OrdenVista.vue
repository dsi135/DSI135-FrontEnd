<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <v-card class="mx-auto" height="95px">

        <v-card-text
          class="">
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."</v-card-text>

      </v-card>
      <v-data-table :headers="headers" :items="productos" class="elevation-1" hide-actions>
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
      Total {{total()}}
      <v-btn flat>Normal</v-btn>
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
