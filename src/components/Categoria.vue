<template>
  <div>
    <div>
      <v-data-table :headers="headers" :items="categorias" class>
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.nombre }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editar(props.item)">edit</v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
    <template>
      <div class="text-xs-center">
        <v-dialog v-model="nuevo" width="600">
          <template v-slot:activator="{ on }">
            <v-btn flat dark @click="crear()">NUEVA CATEGORIA</v-btn>
          </template>
          <v-card>
            <v-card-title primary-title class="headline light-blue lighten-1 center">NUEVA CATEGORIA</v-card-title>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field label="Nombre de la Categoria" v-model="cat.nombre" required="true"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="ejecutar(cat.nombre)">GUARDAR</v-btn>
              <v-btn flat @click="nuevo = false">CANCELAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>
<script>
import restMethods from "./../restMethods.js";
import { setTimeout } from 'timers';
const rm = new restMethods();
export default {
  data() {
    return {
      nuevo: false,
      cat: {
        id: null,
        nombre: null
      },
      create: false,
      categorias: this.getcategorias(),
      headers: [
        { text: "id", sortable: false, align: "center", value: "id" },
        {
          text: "Categoria",
          sortable: false,
          align: "center",
          value: "categorias"
        }
      ]
    };
  },
  methods: {
    ejecutar(catgo) {
      if (catgo != null && this.create && !this.cat.id) {
        this.cat.nombre = catgo;
        console.log(JSON.stringify(this.cat));
        rm.postJson("categorias", {
          id: this.cat.id,
          nombre: this.cat.nombre
        });
        this.nuevo = false;
        this.cat.id = null;
        this.cat.nombre = null;
      } else if (catgo != null && !this.create && this.cat.id) {
        console.log("edit" + JSON.stringify(this.cat));

        this.cat.nombre = catgo;
        rm.putJson("categorias/" + parseInt(this.cat.id), {
          id: this.cat.id,
          nombre: this.cat.nombre
        });
        this.nuevo = false;
        this.cat.id = null;
        this.cat.nombre = null;
      }
      
      setTimeout(() => {
        this.getcategorias();
      }, 100);
    },
    getcategorias() {
      rm.getJson("categorias")
        .then(r => {
          this.categorias = r.data;
        })
        .catch(e => {
          this.categorias = [];
        });
    },
    editar(item) {
      this.nuevo = true;
      this.cat = item;
      this.create = false;
    },
    crear() {
      this.cat.nombre = null;
      this.nuevo = true;
      this.cat.id = null;
      this.create = true;
    }
  }
};
</script>
