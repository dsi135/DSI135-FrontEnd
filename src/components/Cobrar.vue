<template>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2>
        <cobrar :productos="resumen" btnname="COBRAR"/>
    </v-flex>
  </v-layout>
</template>
<script>
import CobrarOrden from "@/components/OrdenVista";
export default {
    components: {
    cobrar: CobrarOrden
  },
  data() {
    return {
      resumen: [
        {
          producto: "agua",
          precio: "1.00",
          cantidad: 1
        },
        {
          producto: "pollo al horno",
          precio: "2.50",
          cantidad: 1
        },
        {
          producto: "pupusas de jamon",
          precio: "1.00",
          cantidad: 2
        },
        {
          producto: "sandwich",
          precio: "2.50",
          cantidad: 1
        },
        {
          producto: "coca cola",
          precio: "0.60",
          cantidad: 2
        },
        {
          producto: "lasagna",
          precio: "3.00",
          cantidad: 1
        }
      ]
    };
  }
};
</script>
