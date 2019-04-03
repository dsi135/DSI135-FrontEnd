<template>
  <v-app>
    <v-card>
      <v-card-title class="headline font-weight-regular blue-grey white--text">Productos</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="states"
          label="Seleccione un Producto"
          persistent-hint
          prepend-icon="mdi-city"
        ></v-autocomplete>
        <v-list>
          <v-list-tile @click="true">
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      model: null,
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
      
  }
};
</script>