<template>
  <div class="ticket">
    <p class="centrado">
      Pupuseria la bendicion de DIO
     </p>
     <p class="izquierda">
      <br>{{new Date().toLocaleString()}}
      <br>Cuenta: {{this.cuentaTicket.cuenta.cuenta}}
      <br>Mesa: {{this.cuentaTicket.cuenta.mesa}}
      <br>Mesero: {{this.cuentaTicket.cuenta.mesero}}

    </p>
    <table>
      <thead>
        <tr>
          <th class="cantidad">CANTIDAD</th>
          <th class="producto">PRODUCTO</th>
          <th class="precio">$$</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in this.cuentaTicket.cuenta.resumen" :key="index">
          <td class="cantidad">{{producto.cantidad}}</td>
          <td class="producto">{{producto.producto}}</td>
          <td class="precio">{{producto.precio}}</td>
        </tr>
      </tbody>
    </table>

    <p class="izquierda">
     Total:            {{this.cuentaTicket.cuenta.total}}
      <br>
      ¡GRACIAS POR SU COMPRA!
    </p>
    <button class="oculto-impresion" id="btnImprimir" @click="imprimirElemento()">Imprimir</button>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState(["cuentas", "footer","cuentaEdit", "cuentaTicket"])
  },
  methods: {
    imprimirElemento() {
      var elemento = document.querySelector(".ticket");
      var ventana = window.open("", "PRINT", "height=400,width=600");
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
       return true;
    }
  }
};
</script>

<style>
@media print {
  .oculto-impresion,
  .oculto-impresion * {
    display: none !important;
  }
}

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
