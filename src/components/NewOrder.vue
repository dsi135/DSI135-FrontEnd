<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <v-toolbar active>
          <v-toolbar-title>ORDEN:</v-toolbar-title>
          <v-text-field label="Seleccione un Producto" v-model="search"></v-text-field>
          <template v-slot:extension>
            <v-tabs v-model="active" fixed-tabs color="transparent" slider-color="yellow">
              <v-tab
                v-for="(categoria, index) in categorias"
                :key="index"
                ripple
                @click="setCategoria(index)"
              >{{ categoria }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

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
      resumen: [],
      categoria: 1,
      categorias: ["bebidas", "principal", "postre"],
      producto: null,
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
    }
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
      console.log(this.categoria);
    },
    setProductos(producto, index) {
      let registro = { producto: "", precio: "", cantidad: null };
      
        registro.producto = producto.producto;
        registro.precio = producto.precio;
        registro.cantidad = producto.cantidad;
        console.log(JSON.parse(JSON.stringify(registro)));
        console.log(JSON.parse(JSON.stringify(this.resumen)));
      

      return registro;
    },
    addProducto(registro) {
      if (
        !this.resumen.some(producto => producto.producto === registro.producto)
      ) {
        this.resumen.push(registro);
      }
    },
    setCantidad(registro, producto) {
      this.resumen.forEach(producto => {
        if (
          producto.producto === registro.producto &&
          producto.cantidad !== registro.cantidad
        ) {
          producto.cantidad = registro.cantidad;
        }
      });
    }
  }
};
</script>
