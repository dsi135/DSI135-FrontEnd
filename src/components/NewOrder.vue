<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <v-toolbar active>
          <v-toolbar-title>
            ORDEN:
            <br>
          </v-toolbar-title>
          <v-text-field label="Seleccione un Producto" v-model="search"></v-text-field>
          <template v-slot:extension>
            <v-tabs v-model="active" fixed-tabs color="transparent" slider-color="yellow">
              <v-tab v-for="item in tabs" :key="item.id" ripple>{{ item.categoria }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="active">
          <v-tab-item v-for="n in tabs" :key="n.id">
            <v-card flat>
              <v-list>
                <v-list-tile v-for="(item,index) in n.productos" :key="index" @click="true">
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.nombre"></v-list-tile-title>
                  </v-list-tile-content>
                  <v-btn flat icon @click="disminuir(index,item)">
                    <v-icon>remove</v-icon>
                  </v-btn>
                  <v-btn flat icon @click="aumentar(index,item)">
                    <v-icon>add</v-icon>
                  </v-btn>
                  <v-list-tile-action>{{item.cantidad}}</v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        <v-list>
          <template v-for="(producto, index) in filter">
            <v-list-tile @click="true" :key="index">
              <v-list-tile-title>{{producto}}</v-list-tile-title>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <v-flex xs6>
        <vista :productos="resumen"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import OrdenVista from "@/components/OrdenVista";
export default {
  components: {
    vista: OrdenVista
  },
  data() {
    return {
      active: null,
      search: "",
      tabs: [
        {
          categoria: "bebidas",
          productos: [
            {
              nombre: "coca cola",
              cantidad: 0
            },
            {
              nombre: "pepsi",
              cantidad: 0
            },
            {
              nombre: "chocolate",
              cantidad: 0
            }
          ]
        },
        {
          categoria: "postres",
          productos: [
            {
              nombre: "tres leches",
              cantidad: 0
            },
            {
              nombre: "aguacate con sal",
              cantidad: 0
            },
            {
              nombre: "ajo molido",
              cantidad: 0
            }
          ]
        },
        {
          categoria: "principal",
          productos: [
            {
              nombre: "pollo al aguacate",
              cantidad: 0
            },
            {
              nombre: "aguacate al horno",
              cantidad: 0
            },
            {
              nombre: "pizza de don cangrejo",
              cantidad: 0
            }
          ]
        }
      ],
      productos: [
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
        "Prosciuto"
      ],
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
  },
  computed: {
    filter() {
      if (this.productos != null) {
        console.log(this.search);
        return this.productos.filter(producto => {
          return producto.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  },
  methods: {
    aumentar(index, s) {
      s.cantidad++;
    },
    disminuir(index, s) {
      if (s.cantidad > 0) s.cantidad--;
    }
  }
};
</script>
