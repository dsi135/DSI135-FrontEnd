<template>
  <div>
    <div >
      <v-data-table :headers="headers" :items="categorias" class="elevation-1">
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.item }}</td>
        </template>
      </v-data-table>
    </div>
    <template>
      <div class="text-xs-center">
        <v-dialog v-model="nuevo" width="600">
          <template v-slot:activator="{ on }">
            <v-btn flat dark v-on="on">NUEVA CATEGORIA</v-btn>
          </template>
          <v-card>
            <v-card-title primary-title class="headline light-blue lighten-1 center" >NUEVA CATEGORIA</v-card-title>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm6 >
                  <v-text-field label="Nombre de la Categoria" v-model="cat" required="true"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="guardar(cat)">GUARDAR</v-btn>
              <v-btn flat @click="nuevo = false">CANCELAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "Categoria",
  data() {
    return {
      nuevo: false,
      cat: null,
      categorias: ["bebidas", "principal", "postres"],
      headers: [
        { text: "Categoria", value: "categorias" }
      ]
    };
  },
  methods: {
    guardar(catgo) {
     if(catgo!=null){
          this.categorias.push(catgo);
      this.nuevo = false;
      this.cat = null;
     }
    }
  }
};
</script>
