<template>
  <v-card>
    <v-card-title>
      Filtro
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

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

    <v-data-table :headers="headers" :items="cuentas.cuentas" :search="search">
      <template v-slot:items="props">
        <td>{{ props.item.cuenta }}</td>
        <td>{{ props.item.mesa }}</td>
        <td>{{ props.item.cliente }}</td>
        <td>{{ props.item.mesero }}</td>
        <td>{{ props.item.total }}</td>
        <td class="justify-center layout px-0">
          <v-icon class="mr-2" @click="editCuenta(props.item);$router.push('editarorden');">edit</v-icon>
          <v-icon class="mr-2" v-show="!footer.modoMesa" @click="ModalCobro(props.item)">payment</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" icon="warning">No hay cuentas</v-alert>
      </template>
    </v-data-table>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs2 offset-xs8>
        <v-btn flat @click="$router.push('nuevaorden')">NUEVA ORDEN</v-btn>
      </v-flex>
      
    </v-layout>
    <v-alert
      :value="footer.alert"
      type="success"
      dismissible
      transition="scale-transition"
    >Se guardo nueva orden con exito.</v-alert>
  </v-card>
</template>

<script>
import restMethods from "./../restMethods.js";
const rm = new restMethods();
import { mapState } from "vuex";
export default {
  data() {
    return {
      init: {
        0: this.verifyModo()
      },
      search: "",
      dialog: false,
      pago: null,
      snackbar: false,
      cobrarIndex: [],
      headers: [
        {
          text: "Cuenta",
          align: "left",
          sortable: false,
          value: "cuenta"
        },
        { text: "Mesa", value: "mesa" },
        { text: "Cliente", value: "cliente" },
        { text: "Mesero", value: "mesero" },
        { text: "Total", value: "total" }
      ]
    };
  },
  computed: {
    ...mapState(["cuentas", "footer","cuentaEdit", "cuentaTicket"])

  },
  created(){
    this.getOrdenes();
  },
  methods: {
    getOrdenes(){
      this.cuentas.cuentas = [];

       rm.getJson('ordenes')
      .then(r =>{
          this.cuentas.cuentas = r.data;
      this.cuentas.cuentas = r.data.map(cuenta =>{
        return  {
           cuenta: cuenta.id,
           mesa: cuenta.mesa,
           cliente: cuenta.cliente,
           mesero: cuenta.mesero,
           total: cuenta.total,
           resumen: cuenta.detalleOrdenList.map(detalle => {
             return {
                producto: detalle.producto1.nombre,
                precio: detalle.producto1.precio,
                cantidad: detalle.cantidad,
                //categoria: detalle.producto1.categoria.nombre,
                id: detalle.producto1.id,
                preparado: detalle.producto1.preparado
             }
           })
        }
      })
        //console.log(JSON.stringify(this.cuentas.cuentas));
      }).catch(e=>{
        });
      
    },
    editCuenta(orden) {
      for (let i = 0; i < this.cuentaEdit.length; i++) {
        this.cuentaEdit.splice(0);
      }

      this.cuentaEdit.push(orden);
    },
    ModalCobro(orden) {
      console.log(JSON.stringify(orden));
      this.dialog = true;
      this.cobrarIndex = orden;
    },
    cobrarOrden(orden) {
      if (orden.total <= this.pago) {
        this.dialog = false;
        this.cuentaTicket.cuenta = orden;
        //console.log(JSON.stringify(this.cuentaTicket.cuenta));
        console.log(orden.cuenta);
       // rm.putJson('ordenes/finalizar/'+parseInt(orden.cuenta), { });
        //this.cuentas.cuentas.splice(this.cuentas.cuentas.indexOf(orden), 1);
        this.cuentaTicket.pago = this.pago;
        this.$router.push('/ticket');
      } else {
        this.snackbar = true;
      }
    },
    verifyModo(){
      rm.getJson('parametros/1').then(r=>{
        this.footer.modoMeda = r.data.valor;
        console.log(this.footer.modoMeda);
         
      });
    }
  },
  filters: {
    negativos: function(value) {
      return value < 0 ? 0.0 : value;
    }
  }
};
</script>
