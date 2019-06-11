<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          <v-layout align-center justify-center row fill-height>
            <v-flex style="text-align: center;">CUENTA N:{{cobrarIndex.cuenta}}</v-flex>
          </v-layout>
        </v-card-title>
        <v-layout justify-center fill-height column>
          <v-layout row align-center justify-center>
            <v-flex xs6>TOTAL:</v-flex>
            <v-flex xs6>{{cobrarIndex.total}}</v-flex>
          </v-layout>
          <br>
          <v-layout row align-center justify-center>
            <v-flex xs6>PAGO:</v-flex>
            <v-flex xs6>
              <v-text-field v-model="pago" label="PAGO" single-line></v-text-field>
            </v-flex>
          </v-layout>
          <br>
          <v-layout row align-center justify-center>
            <v-flex xs6>CAMBIO:</v-flex>
            <v-flex xs6>{{pago - cobrarIndex.total | negativos}}</v-flex>
          </v-layout>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">CANCELAR</v-btn>
          <v-btn color="green darken-1" flat @click="cobrarOrden(cobrarIndex)">COBRAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="1000">INGRESE DATOS.</v-snackbar>

    <v-flex xs12 offset-xs1>
      <v-card class="mx-auto" height="95px">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs6>&nbsp;&nbsp;&nbsp;ORDEN: {{detalles.cuenta}}</v-flex>
            <v-flex xs6>MESA: {{detalles.mesa}}</v-flex>
            <v-flex xs6>&nbsp;&nbsp;&nbsp;MESERO: {{detalles.mesero}}</v-flex>
            <v-flex xs6>CLIENTE: {{detalles.cliente}}</v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="productos"
        hide-actions
        :search="search"
        :pagination.sync="pagination"
        class="elevation-1"
      >
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
      <v-layout row align-center justify-center>
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </v-layout>

      <v-layout row wrap justify-center align-center>
        <v-flex xs9>
          <v-btn flat @click="guardar(), $router.push('dashboard')">GUARDAR</v-btn>
          <v-btn color="error" v-show="footer.modoMesa" @click="guardar(); ModalCobro(detalles)">cobrar</v-btn>
        </v-flex>
        <v-flex xs3 class="text-xs-center">
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Cantidad", sortable: false, value: "cantidad" },
        { text: "Producto", sortable: false, value: "producto" },
        { text: "Precio", sortable: false, value: "precio" },
        { text: "Subtotal", sortable: false, value: "subtotal" }
      ],
      search: "",
      pagination: {},
      selected: [],
      dialog: false,
      pago: null,
      snackbar: false,
      cobrarIndex: []
    };
  },
  methods: {
    total() {
      var resultado = 0;
      for (var item in this.productos) {
        resultado +=
          this.productos[item].precio * this.productos[item].cantidad;
      }
      this.detalles.total = resultado;
      return resultado;
    },
    guardar() {
      if (this.cuentas.indexOf(this.detalles) >= 0) {
        this.cuentas.splice(this.cuentas.indexOf(this.detalles), 1);
      }
      this.detalles.resumen = this.productos;
      this.cuentas.push(this.detalles);
      this.footer.alert = true;
    },
    ModalCobro(orden) {
      this.dialog = true;
      console.log(JSON.stringify(orden));
      this.cobrarIndex = orden;
    },
    cobrarOrden(orden) {
      if (orden.total < this.pago) {
        this.dialog = false;
        this.cuentas.splice(this.cuentas.indexOf(orden), 1);
        this.$router.push('dashboard');
      } else {
        this.snackbar = true;
      }
    }
  },
  computed: {
    ...mapState(["cuentas", "footer"]),
    pages() {
      if (this.pagination.rowsPerPage == null || this.tamanio == null) return 0;

      console.log(this.tamanio / this.pagination.rowsPerPage);
      return Math.ceil(this.tamanio / this.pagination.rowsPerPage);
    }
  },
  filters: {
    negativos: function(value) {
      return value < 0 ? 0.0 : value;
    }
  },
  props: ["productos", "detalles", "tamanio"]
};
</script>
