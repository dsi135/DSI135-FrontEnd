<template>
  <v-container fluid class="container">
    <v-layout>
      <v-flex xs6>
        <v-card color="#212121">
          <v-container fluid>
            <v-form>
              <v-layout row>
                <v-flex xs2>
                  <v-text-field v-model="detalle.cuenta" label="Orden:" required></v-text-field>
                </v-flex>

                <v-flex xs5>
                  <v-text-field v-model="detalle.mesero" label="Mesero:" required></v-text-field>
                </v-flex>

                <v-flex xs5>
                  <v-text-field v-model="detalle.cliente" label="Cliente:" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs3>
                  <v-text-field v-model="detalle.mesa" label="Mesa:" required></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-text-field label="Seleccione un Producto" v-model="search"></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
            <v-layout row>
              <v-flex x12>
                <template>
                  <v-tabs v-model="active" fixed-tabs color="transparent" slider-color="yellow">
                    <v-tab
                      v-for="(categoria, index) in categorias"
                      :key="index"
                      ripple
                      @click="setCategoria(index)"
                    >{{ categoria }}</v-tab>
                  </v-tabs>
                </template>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

        <v-list>
          <v-list-tile v-for="(producto, index) in filter" :key="index" ripple>
            <v-list-tile-content>
              <v-list-tile-title>{{producto.producto}}</v-list-tile-title>
            </v-list-tile-content>
            <v-btn flat icon @click="disminuir(index,producto)">
              <v-icon>remove</v-icon>
            </v-btn>
            <v-btn flat icon @click="aumentar(index, producto)">
              <v-icon>add</v-icon>
            </v-btn>
            <v-list-tile-action>{{producto.cantidad}}</v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs6>
        <vista :productos="resumen[0]" :detalles="detalle" :tamanio="tamanio"/>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import OrdenVista from "@/components/OrdenVista";
import { mapState } from "vuex";
export default {
  components: {
    vista: OrdenVista
  },
  data() {
    return {
      active: null,
      search: "",
      categoria: 0,
      tamanio: 0,
      categorias: ["bebidas", "principal", "postre"],
      producto: null,
      detalle: {
        cuenta: null,
        mesa: null,
        cliente: "",
        mesero: "",
        total: null
      },
      productos: [
        {
          categoria: "bebidas",
          productos: [
            { producto: "pepsi", precio: "1.00", cantidad: 0 },
            { producto: "coca cola", precio: "1.00", cantidad: 0 },
            { producto: "suprema", precio: "1.50", cantidad: 0 },
            { producto: "vodka", precio: "7.00", cantidad: 0 },
            { producto: "michelada", precio: "5.25", cantidad: 0 }
          ]
        },
        {
          categoria: "principal",
          productos: [
            { producto: "carne", precio: "5.00", cantidad: 0 },
            { producto: "pollo agridulce", precio: "6.75", cantidad: 0 },
            { producto: "sopa de patas", precio: "5.00", cantidad: 0 },
            { producto: "alitas", precio: "6.99", cantidad: 0 },
            { producto: "pizza", precio: "12.99", cantidad: 0 }
          ]
        },
        {
          categoria: "postres",
          productos: [
            { producto: "brownie", precio: "5.00", cantidad: 0 },
            { producto: "cheesecake", precio: "3.00", cantidad: 0 },
            { producto: "tres leches", precio: "2.00", cantidad: 0 },
            { producto: "crepa de nutella", precio: "4.50", cantidad: 0 }
          ]
        }
      ]
    };
  },
  computed: {
    filter() {
      if (this.productos != null) {
        //console.log(JSON.stringify(this.productos[this.categoria].productos));
        return this.productos[this.categoria].productos.filter(producto => {
          return producto.producto
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
    },
     ...mapState(["resumen"])
  },
  methods: {
    aumentar(index, s) {
      if (s.cantidad >= 0) {
        s.cantidad++;
      }
      let registro = this.setProductos(s);
      this.addProducto(registro);
      this.setCantidad(registro);
    },
    disminuir(index, s) {
      if (s.cantidad > 0) {
        s.cantidad--;
        let registro = this.setProductos(s);
        this.setCantidad(registro, s);
      }
    },
    setCategoria(categoria) {
      this.categoria = categoria;
      //console.log(this.categoria);
    },
    setProductos(producto, index) {
      let registro = { producto: "", precio: "", cantidad: null };

      registro.producto = producto.producto;
      registro.precio = producto.precio;
      registro.cantidad = producto.cantidad;
      //console.log(JSON.parse(JSON.stringify(registro)));
      //console.log(JSON.parse(JSON.stringify(this.resumen)));

      return registro;
    },
    addProducto(registro) {
      if (
        !this.resumen[0].some(producto => producto.producto === registro.producto)
      ) {
        this.resumen[0].push(registro);
      }
    },
    setCantidad(registro, producto) {
      this.resumen[0].forEach(producto => {
        if (
          producto.producto === registro.producto &&
          producto.cantidad !== registro.cantidad
        ) {
          producto.cantidad = registro.cantidad;
        }
      });

      this.resumen[0] = this.resumen[0].filter(producto => producto.cantidad !== 0);
      this.tamanio = this.resumen[0].length;
     // console.log(JSON.parse(JSON.stringify(this.resumen)));
    }
  }
};
</script>

<style>
.container {
  padding: 0%;
  margin-top: 5px;
}

.flex {
  padding-left: 1%;
  padding-right: 1%;
}

.v-text-field {
  padding-top: 0%;
}
</style>

