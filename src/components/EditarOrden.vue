<template>
  <v-container fluid class="container">
    <v-layout>
      <v-flex xs6>
        <v-card color="#212121">
          <v-container fluid>
            <v-form>
              <v-layout row>
                <v-flex xs2>
                  <v-text-field v-model=" cuentaEdit[0].cuenta" label="Orden:" required></v-text-field>
                </v-flex>
                <v-flex xs5>
                  <v-text-field v-model="cuentaEdit[0].mesero" label="Mesero:" required></v-text-field>
                </v-flex>
                <v-flex xs5>
                  <v-text-field v-model="cuentaEdit[0].cliente" label="Cliente:" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs3>
                  <v-text-field v-model="cuentaEdit[0].mesa" label="Mesa:" required></v-text-field>
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
                      @click="setCategoria(categoria)"
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
              <v-list-tile-title>{{producto.nombre}}</v-list-tile-title>
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
        <vista :productos="cuentaEdit[0].resumen" :detalles="cuentaEdit[0]" :tamanio="tamanio"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OrdenVista from "@/components/OrdenVista";
import restMethods from "../restMethods.js";
const rest = new restMethods();
import { mapState } from "vuex";
export default {
  components: {
    vista: OrdenVista
  },
  data() {
    return {
      active: null,
      search: "",
     categoria: "Bebidas",
      tamanio: 0,
            
      categorias: this.getCategorias(),
      producto: null,
      detalle: {
        cuenta: null,
        mesa: null,
        cliente: "",
        mesero: "",
        total: null
      },
      productos: [],
      articulos: []
    };
  },
  created(){
    this.getProductos();
  },
  computed: {
    filter() {
      if (this.articulos != null) {
        //console.log(JSON.stringify(this.productos[this.categoria].productos));
        let filtrados = this.articulos.filter(producto => producto.categoria === this.categoria);
        return filtrados.filter(producto => producto.nombre.toLowerCase().includes(this.search.toLowerCase()));
      }
    },
    ...mapState(["cuentas", "cuentaEdit"])
  },
  methods: {
    armarResumen(){
       this.articulos = this.productos.map(producto =>{
          return {
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 0,
            categoria: producto.categoria.nombre
          }
        });
        console.log(JSON.stringify(this.articulos))
    },
     getCategorias(){
      rest.getJson('categorias').
        then(r=>{
          let f= r.data.map(m=>{
            return m.nombre;
          });
          this.categorias = f;
          //console.log(this.categorias);
        }).catch(e=>{
          this.categorias = [""];
        });
        
    },
    getProductos(){
      rest.getJson('productos').
        then(r=>{
          let f= r.data.map(m=>{
            return m;
          });
          this.productos = f;
          this.armarResumen();
          //console.log(this.productos);
        }).catch(e=>{
          this.productos = [""];
        });
    },
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

      registro.producto = producto.nombre;
      registro.precio = producto.precio;
      registro.cantidad = producto.cantidad;
      //console.log(JSON.parse(JSON.stringify(registro)));
      //console.log(JSON.parse(JSON.stringify(this.resumen)));

      return registro;
    },
    addProducto(registro) {
      if (
        !this.cuentaEdit[0].resumen.some(
          producto => producto.producto === registro.producto
        )
      ) {
        this.cuentaEdit[0].resumen.push(registro);
      }
    },
    setCantidad(registro, producto) {
      this.cuentaEdit[0].resumen.forEach(producto => {
        if (
          producto.producto === registro.producto &&
          producto.cantidad !== registro.cantidad
        ) {
          producto.cantidad = registro.cantidad;
        }
      });

      this.cuentaEdit[0].resumen = this.cuentaEdit[0].resumen.filter(
        producto => producto.cantidad !== 0
      );
      this.tamanio = this.cuentaEdit[0].resumen.length;
      // console.log(JSON.parse(JSON.stringify(this.resumen)));
    },
    init() {
      for (let i = 0; i < this.productos.length; i++) {
        for (let j = 0; j < this.productos[i].productos.length; j++) {
          for (let k = 0; k < this.cuentaEdit[0].resumen.length; k++) {
            if (
              this.cuentaEdit[0].resumen[k].producto ===
              this.productos[i].productos[j].producto
            ) {
              this.productos[i].productos[j].cantidad = this.cuentaEdit[0].resumen[k].cantidad;
            }
          }
          //console.log(JSON.stringify(this.productos[i].productos[j]));
        }
      }
    }
  },
  mounted() {
    this.init();
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

