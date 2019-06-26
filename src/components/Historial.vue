<template>
  <v-app>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>
            <v-text-field v-model="fechaInicial" label="fecha inicial"></v-text-field>
            <v-text-field label="fecha final" v-model="fechaFinal"></v-text-field>
          </v-card-title>
          <v-data-table :headers="headVenta" :items="ventas" class="elevation-1">
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item[0] }}</td>
              <td class="text-xs-center">${{ props.item[1] }}</td>
            </template>
          </v-data-table>
          <v-btn @click="getVentas()">BUSCAR</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>
            <v-text-field label="Fecha" v-model="fechaProducto"></v-text-field>
          </v-card-title>
          <v-data-table :headers="headProducto" :items="productos" class="elevation-1">
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item[0] }}</td>
              <td class="text-xs-center">{{ props.item[1] }}</td>
            </template>
          </v-data-table>
          <v-btn @click="getProductos()">BUSCAR</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import restMethods from "./../restMethods.js";
const rm = new restMethods();
export default {
  data() {
    return {
      ventas: this.getVentas(),
      productos: this.getProductos(),
      fechaInicial: null,
      fechaFinal: null,
      fechaProducto: null,
      headProducto: [
        { text: "Producto", align: "center", sortable: false, value: "0" },
        { text: "Cantidad", align: "center", sortable: false, value: "1" }
      ],
      headVenta: [
        { text: "Fecha", align: "center", sortable: false, value: "0" },
        { text: "Total", align: "center", sortable: false, value: "1" }
      ]
    };
  },
  methods: {
    getProductos() {
      if (!this.fechaProducto) {
        this.fechaProducto = this.fechaActual();
      }

      rm.getJson("ordenes/ventas/producto?fecha="+this.fechaProducto)
        .then(r => {
          this.productos = r.data;
        })
        .catch(e => {
          console.error(e);
          this.productos = [];
        });
    },
    getVentas() {
      if (!this.fechaInicial) {
        this.fechaInicial = this.fechaActual();
      }

      if (!this.fechaFinal) {
        this.fechaFinal = this.fechaActual();
      }

      rm.getJson("ordenes/ventas?init="+this.fechaInicial+"&fina="+this.fechaFinal)
        .then(r => {
          this.ventas = r.data;
        })
        .catch(e => {
          this.ventas = [];
        });
    },
    fechaActual(){
      let date = new Date();
      let year = date.getFullYear();
      let mes = date.getMonth() + 1;
      let dia = date.getDate();

      return year + "-" + mes + "-" + dia;
    }
  }
};
</script>
