<template>
  <v-app>
    <div>
      <v-card>
        <v-card-title>
          FILTRO
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="productos" :search="search" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.id }}</td>
            <td class="text-xs-center">{{ props.item.nombre }}</td>
            <td class="text-xs-center">${{ props.item.precio }}</td>
            <td class="text-xs-center">{{ props.item.categoria.nombre }}</td>
            <td class="text-xs-center">{{ props.item.preparado | preparado}}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="editReg(props.item)">edit</v-icon>
            </td>
          </template>
          <template v-slot:no-results>
            <v-alert
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <template>
      <div class="text-xs-center">
        <v-dialog v-model="nuevo" width="600">
          <template v-slot:activator="{ on }">
            <v-btn flat dark @click="crear()">NUEVO PRODUCTO</v-btn>
          </template>
          <v-card>
            <v-card-title primary-title class="headline light-blue lighten-1 center">NUEVO PRODUCTO</v-card-title>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field label="Nombre del producto" v-model="produc"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field label="Precio del producto" v-model="preci"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    :items="categorias"
                    item-text="nombre"
                    item-value="id"
                    label="Categoria"
                    v-model="cat"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    :items="[{id:true,val:'SI'},{id:false,val:'NO'}]"
                    item-text="val"
                    item-value="id"
                    label="Preparado"
                    v-model="prep"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="guardar(produc,preci,cat,prep)">GUARDAR</v-btn>
              <v-btn flat @click="nuevo = false">CANCELAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-app>
</template>
<script>
import restMethods from "./../restMethods.js";
import { error, log } from "util";
import { truncate } from 'fs';
const rm = new restMethods();
export default {
  name: "Producto",
  components: {},
  data() {
    return {
      nuevo: false,
      idmagico: null,
      produc: null,
      preci: null,
      cat: null,
      prep: null,
      search: "",
      edicion: false,
      categorias: this.getCategorias(),
      productos: this.getProductos(),
      headers: [
        { text: "ID", align: "center", sortable: false, value: "id" },
        { text: "Productos", align: "center", sortable: false, value: "prod" },
        { text: "Precio", align: "center", value: "precio" },
        {
          text: "Categoria",
          align: "center",
          sortable: false,
          value: "categira"
        },
        { text: "Preparado", align: "center", value: "preparado" }
      ]
    };
  },
  methods: {
    guardar(prducto, pre, catgo, prep) {
      if (prducto != null && pre != null && catgo != null) {
        if (!this.editar) {
          rm.postJson("productos", {
            id: null,
            categoria: {
              id: catgo
            },
            nombre: prducto,
            precio: pre,
            preparado: prep
          });
        } else {
          rm.putJson("productos/"+this.idmagico, {
            id: this.idmagico,
            categoria: {
              id: catgo
            },
            nombre: prducto,
            precio: pre,
            preparado: prep
          });
        }
        this.nuevo = false;
        this.produc = null;
        this.preci = null;
        this.cat = null;
        this.idmagico = null;
        

        setTimeout(() => {
          this.getProductos();
        }, 100);
      }
    },
    getProductos() {
      rm.getJson("productos")
        .then(r => {
          this.productos = r.data;
        })
        .catch(e => {
          console.error(e);
          this.productos = [];
        });
    },
    getCategorias() {
      rm.getJson("categorias")
        .then(r => {
          this.categorias = r.data;
        })
        .catch(e => {
          this.categorias = [];
        });
    },
    crear() {
      this.preci = null;
      this.idmagico = null;
      this.prep = null;
      this.produc = null;
      this.cat = null;
      this.nuevo = true;
      this.editar = false;
    },
    editReg(item) {
      this.preci = item.precio;
      this.idmagico = item.id;
      this.prep = item.preparado;
      this.produc = item.nombre;
      this.cat = item.categoria.id;
      this.nuevo = true;
      this.editar = true;
    }
  },
  filters:{
    preparado: function (value) {
      return value ? 'SI' : 'NO';
    }
  }
};
</script>
