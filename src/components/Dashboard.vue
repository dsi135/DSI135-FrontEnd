<template>
    <v-card>
      <v-card-title>
        Filtro
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="cuentas"
        :search="search">
        <template v-slot:items="props">
          <td>{{ props.item.cuenta }}</td>
          <td >{{ props.item.mesa }}</td>
          <td >{{ props.item.cliente }}</td>
          <td >{{ props.item.mesero }}</td>
          <td >{{ props.item.total }}</td>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
  export default {
      data () {
        return {
          search: '',
          headers: [
          {
            text: 'Cuenta',
            align: 'left',
            sortable: false,
            value: 'cuenta'
          },
          { text: 'Mesa', value: 'mesa' },
          { text: 'Cliente', value: 'cliente' },
          { text: 'Mesero', value: 'mesero' },
          { text: 'Total', value: 'total' }
        ],
        cuentas: [
          {
            cuenta: 45,
            mesa: 8,
            cliente: "Juan Perez",
            mesero: "El jhon cena",
            total: 25.50
          },
          {
            cuenta: 27,
            mesa: 15,
            cliente: "Pedro al accino",
            mesero: "Don teodorito",
            total: 69.50
          },
          {
            cuenta: 69,
            mesa: 4,
            cliente: "Dick Tracy",
            mesero: "El tucan",
            total: 56.50
          },
          {
            cuenta: 25,
            mesa: 36,
            cliente: "Barac Osama",
            mesero: "Donald Trump",
            total: 96.0
          },
          {
            cuenta: 35,
            mesa: 4,
            cliente: "Don cangrejo",
            mesero: "Bob Esponja",
            total: 25.50
          },
          {
            cuenta: 32123,
            mesa: 7,
            cliente: "Jostar Jotaro",
            mesero: "Dio Brando",
            total: 25.50
          },
          {
            cuenta: 654,
            mesa: 12,
            cliente: "Lucas Trotacielos",
            mesero: "Obi wan keno ve",
            total: 25.50
          }
        ]
      }
    }
  }
</script>
