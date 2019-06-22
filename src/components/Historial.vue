<template>
  <v-app>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>
            <v-text-field v-model="fechaInicial" @input="input()" label="fecha inicial"></v-text-field>
            <v-text-field @input="input()" label="fecha final" v-model="fechaFinal"></v-text-field>
          </v-card-title>
          <v-data-table :headers="headVenta" :items="ventas" class="elevation-1">
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item[0] }}</td>
              <td class="text-xs-center">{{ props.item[1] }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>
            Producto
            <v-spacer></v-spacer>
            <v-text-field @input="getProductos()" label="Fecha" v-model="fechaProducto"></v-text-field>
          </v-card-title>
          <v-data-table :headers="headProducto" :items="productos" class="elevation-1">
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item[0] }}</td>
              <td class="text-xs-center">{{ props.item[1] }}</td>
            </template>
          </v-data-table>
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
      let date = new Date();
      let year = date.getFullYear();
      let mes = date.getMonth() + 1;
      let dia = date.getDate();

      if (!this.fechaInicial) {
        this.fechaInicial = year + "-" + mes + "-" + dia;
      }

      if (!this.fechaFinal) {
        this.fechaFinal = year + "-" + mes + "-" + dia;
      }

      rm.getJson("ordenes/ventas?init="+this.fechaInicial+"&fina="+this.fechaFinal)
        .then(r => {
          this.ventas = r.data;
        })
        .catch(e => {
          this.ventas = [];
        });
    },
    input(){
      this.getVentas();
    }
  }
};
</script>
