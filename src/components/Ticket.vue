<template>
  <div class="tickets">
  <div class="preparados">
    <p class="centrado">
      <br>{{this.parametros[1].valor}}
      <br>{{this.parametros[2].valor}}<br>
      <br>Telefono: {{this.parametros[3].valor}}
      <br>Nit: {{this.parametros[4].valor}}
      <br>Giro: {{this.parametros[5].valor}}
      <br>Direccion:  {{this.parametros[6].valor}}
     </p>
     <p class="izquierda">
       -------------------------------------------------
      <br>{{new Date().toLocaleString()}}
      <br>Cuenta: {{this.cuentaTicket.cuenta.cuenta}}
      <br> Mesa: {{this.cuentaTicket.cuenta.mesa}}
      <br>Mesero: {{this.cuentaTicket.cuenta.mesero}}<br>
       
    </p>
    <table>
      <thead>
        <tr>
          <th class="cantidad">Ct</th>
          <th class="producto">Producto</th>
          <th class="precio">Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in this.cuentaTicket.cuenta.resumen" :key="index">
          <td class="cantidad">{{producto.cantidad}}</td>
          <td class="producto">{{producto.producto}}</td>
          <td class="precio">${{producto.precio}}</td>
        </tr>
      </tbody>
    </table>
      
    <p class="izquierda ">
      -------------------------------------------------
     Total: ------------------------------------${{this.cuentaTicket.cuenta.total}}
     <br>Efectivo: --------------------------------${{this.cuentaTicket.pago}}
     <br>Cambio: ---------------------------------${{this.cuentaTicket.pago - this.cuentaTicket.cuenta.total}}
     <br>
      ¡GRACIAS POR SU COMPRA!
    </p>

  </div>
  </div>
</template>

<script>
import restMethods from "./../restMethods.js";
import { mapState } from "vuex";
const rm = new restMethods();
export default {
  data() {
    return {
      parametros: this.getParametros(),
      preparados: [],
      nopreparados: []
    };
  },
  created(){
    this.parametros = this.getParametros();
  },
  updated(){
    this.imprimirElemento();
  },
  computed: {
    ...mapState(["cuentas", "footer","cuentaEdit", "cuentaTicket"])
  },
  methods: {
    imprimirElemento() {
      
      var elemento = document.querySelector(".tickets");
      var ventana = window.open("", "PRINT", "height=800,width=1000");
      ventana.document.write(
        "<html><head><title>" + document.title + "</title>"
      );
       ventana.document.write('<link rel="stylesheet" href="./ticket.css">');
      ventana.document.write("</head><body >");
      ventana.document.write(elemento.innerHTML);
      ventana.document.write("</body></html>");
      ventana.document.close();
      ventana.focus();
      ventana.onload = function() {
        ventana.print();
        ventana.close();
      };
      this.$router.push('dashboard');
       return true;
    },
    getParametros() {
      rm.getJson("parametros")
        .then(r => {
          this.parametros = r.data;
        })
        .catch(e => {
          this.parametros = [];
        });
    },
    filtrarPreparados(){
      this.preparados = this.cuentaTicket.cuenta.resumen.filter( producto => preparado === true);
      this.nopreparados = this.cuentaTicket.cuenta.resumen.filter( producto => preparado === false);
      console.log(this.preparados);
      console.log(this.nopreparados);
    }
  }
};
</script>

<style>

td,
th,
tr,
table {
  border-top: 1px solid black;
  border-collapse: collapse;
}

td.producto,
th.producto {
  width: 75px;
  max-width: 75px;
}

td.cantidad,
th.cantidad {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

td.precio,
th.precio {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

.centrado {
  text-align: center;
  align-content: center;
}

.izquierda {
  text-align: left;
  align-content: left;
}

.ticket {
  width: 155px;
  max-width: 155px;
   font-size: 15px;
  font-family: "Times New Roman";
}

img {
  max-width: inherit;
  width: inherit;
}
</style>
