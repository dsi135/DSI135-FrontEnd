<template>
  <div>
    <div>
      <v-data-table :headers="headers" :items="productos" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.product }}</td>
          <td class="text-xs-right">{{ props.item.precio }}</td>
          <td class="text-xs-right">{{ props.item.categoria }}</td>
        </template>
      </v-data-table>
    </div>

    <template>
      <div class="text-xs-center">
        <v-dialog v-model="nuevo" width="600">
          <template v-slot:activator="{ on }">
            <v-btn flat dark v-on="on">NUEVO PRODUCTO</v-btn>
          </template>
          <v-card>
            <v-card-title primary-title class="headline light-blue lighten-1 center" >NUEVO PRODUCTO</v-card-title>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm6 >
                  <v-text-field label="Nombre del producto" v-model="produc"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6 >
                  <v-text-field label="Precio del producto" v-model="preci"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6 d-flex>
                  <v-select :items="categorias" label="Categoria" v-model="cat"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="guardar(produc,preci,cat)">GUARDAR</v-btn>
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
  name: "Producto",
  components: {},
  data() {
    return {
      nuevo: false,
      produc: null,
      preci: null,
      cat: null,
      categorias: ["bebidas", "principal", "postres"],
      productos: [
        { product: "pepsi", precio: "1.00", categoria: "bebidas" },
        { product: "coca cola", precio: "1.00", categoria: "bebidas" },
        { product: "suprema", precio: "1.50", categoria: "bebidas" },
        { product: "vodka", precio: "7.00", categoria: "bebidas" },
        { product: "michelada", precio: "5.25", categoria: "bebidas" },
        { product: "carne", precio: "5.00", categoria: "principal" },
        { product: "pollo agridulce", precio: "6.75", categoria: "principal" },
        { product: "sopa de patas", precio: "5.00", categoria: "principal" },
        { product: "alitas", precio: "6.99", categoria: "principal" },
        { product: "pizza", precio: "12.99", categoria: "principal" },
        { product: "brownie", precio: "5.00", categoria: "postres" },
        { product: "cheesecake", precio: "3.00", categoria: "postres" },
        { product: "tres leches", precio: "2.00", categoria: "postres" },
        { product: "crepa de nutella", precio: "4.50", categoria: "postres" }
      ],
      headers: [
        {
          text: "Productos",
          align: "left",
          sortable: false,
          value: "prod"
        },
        { text: "Precio", value: "precio" },
        { text: "Categoria", value: "categira" }
      ]
    };
  },
  methods: {
    guardar(prducto, pre, catgo) {
      if (prducto != null && pre != null && catgo != null) {
        let registro = { product: "", precio: "", categoria: "" };
        registro.product = prducto;
        registro.precio = pre;
        registro.categoria = catgo;
        this.productos.push(registro);
        this.nuevo = false;
        this.produc = null;
        this.preci = null;
        this.cat = null;
      }
    }
  }
};
</script>
