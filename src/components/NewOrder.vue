<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <v-toolbar active>
          <v-toolbar-title>ORDEN:</v-toolbar-title>
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
          <v-autocomplete
            v-model="seleccionados"
            item-text="producto"
            return-object
            :items="productos[categoria].productos"
            label="Seleccione un Producto"
            prepend-icon="mdi-city"
            persistent-hint
            multiple
            disabled:true
          ></v-autocomplete>
        </v-toolbar>

        <v-card flat>
          <v-list>
            <v-list-tile v-for="(producto, index) in agregados" :key="index" @click="null">
              <v-list-tile-content>
                <v-list-tile-title v-text="producto.producto"></v-list-tile-title>
              </v-list-tile-content>
              <v-btn flat icon @click="disminuir(index,producto.producto)">
                <v-icon>remove</v-icon>
              </v-btn>
              <v-btn flat icon @click="aumentar(index,producto.producto)">
                <v-icon>add</v-icon>
              </v-btn>
              <v-list-tile-action>{{producto.cantidad}}</v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <vista :productos="ticket" btnname="GUARDAR"/>
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
      ticket: [],
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
      ],
      categoria: 1,
      categorias: ["bebidas", "principal", "postre"],
      seleccionados: [],
      productos: [
        {
          categoria: "bebidas",
          productos: [
            { producto: "pepsi", precio: "1.00" },
            { producto: "coca cola", precio: "1.00" },
            { producto: "suprema", precio: "1.50" },
            { producto: "vodka", precio: "7.00" },
            { producto: "michelada", precio: "5.25" }
          ]
        },
        {
          categoria: "principal",
          productos: [
            { producto: "carne", precio: "5.00" },
            { producto: "pollo agridulce", precio: "6.75" },
            { producto: "sopa de patas", precio: "5.00" },
            { producto: "alitas", precio: "6.99" },
            { producto: "pizza", precio: "12.99" }
          ]
        },
        {
          categoria: "postres",
          productos: [
            { producto: "brownie", precio: "5.00" },
            { producto: "cheesecake", precio: "3.00" },
            { producto: "tres leches", precio: "2.00" },
            { producto: "crepa de nutella", precio: "4.50" }
          ]
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
    },
    agregados() {
      console.log(this.seleccionados);
      let registro = { producto: "", precio: "", cantidad: 0 };
      this.seleccionados.forEach(producto => {
        registro.producto = producto.producto;
        registro.precio = producto.precio;
        if (!this.ticket.includes(registro)) {
          this.ticket.push(registro);
        }
      });
      console.log(this.ticket);
      return this.ticket;
    }
  },
  methods: {
    aumentar(index, s) {
      if (s.cantidad > 0){
        this.ticket
      };
    },
    disminuir(index, s) {
      if (s.cantidad > 0) s.cantidad--;
    },
    setCategoria(categoria) {
      this.categoria = categoria;
      console.log(this.categoria);
    },
    setProductos() {
      this.seleccionados.forEach(producto => {
        this.registro.producto = producto.producto;
        this.registro.precio = producto.precio;
        this.ticket.push(registro);
      });
      return this.ticket;
    }
  }
};
</script>
