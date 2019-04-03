<template>
  <v-app>
    <v-card>
      <v-card-title class="headline font-weight-regular blue-grey white--text">Productos</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="productos"
          :items="states"
          label="Seleccione un Producto"
          prepend-icon="mdi-city"
          persistent-hint
          multiple
          disabled:true
        ></v-autocomplete>

        <v-list>
          <template v-for="(producto, index) in productos">
            <v-list-tile @click="true" :key="index">
              <v-list-tile-title>{{producto}}</v-list-tile-title>
            </v-list-tile>
          </template>
        </v-list>

      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      producto: null,
      productos: [],
      states: [
        "Papas",
        "Pizza",
        "Pupusas",
        "Frijoles",
        "Sushi",
        "Pollo chino",
        "Sopa de patas",
        "cosas random",
        "Delaware",
        "Hot dog",
        "Sopa de chipilin",
        "Arroz con leche",
        "Arroz cantones",
        "Naranjas",
        "Panes chucos",
        "Aitas",
        "Hamburguesas",
        "Rissoto",
        "Prosciuto",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ]
    };
  },
  methods: {
    addProducto() {
        console.log(this.producto);
        this.productos.push(this.producto.pop())
    }
  }
};
</script>