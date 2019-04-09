<template>
  <v-card>
    <v-card-title>
      Filtro
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <v-data-table :headers="headers" :items="cuentas" :search="search">
      <template v-slot:items="props">
        <td>{{ props.item.cuenta }}</td>
        <td>{{ props.item.mesa }}</td>
        <td>{{ props.item.cliente }}</td>
        <td>{{ props.item.mesero }}</td>
        <td>{{ props.item.total }}</td>
      </template>
      <template v-slot:no-data>
          <v-alert :value="true" icon="warning">No hay cuentas</v-alert>
        </template>
    </v-data-table>
    <v-layout  align-center justify-center row fill-height>
      <v-flex xs2 offset-xs5>
        <v-btn flat @click="$router.push('nuevaorden')">NUEVA ORDEN</v-btn>
      </v-flex>
      <v-flex xs2>
        <v-btn flat @click="renderizar(1)">EDITAR ORDEN</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn color="error">COBRAR</v-btn>
        <v-btn color="error">IMPRIMIR</v-btn>
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: "",
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
    ...mapState(['cuentas', 'footer'])
  }
};
</script>
