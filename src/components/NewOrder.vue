<template>
  <div>
  <v-toolbar active>
    <v-toolbar-title>
    ORDEN:
    </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="active" fixed-tabs color="transparent" slider-color="yellow">
          <v-tab v-for="item in tabs" :key="item.id" ripple>
            {{ item.categoria }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="active">
      <v-tab-item v-for="n in tabs" :key="n.id" >
        <v-card flat>
          <v-list>
            <v-list-tile v-for="(item,index) in n.productos" :key="index">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.nombre"></v-list-tile-title>
              </v-list-tile-content>
              <v-btn flat icon @click="disminuir(index,item)">
                <v-icon>remove</v-icon">
              </v-btn>
              <v-btn flat icon @click="aumentar(index,item)">
                <v-icon>add</v-icon>
              </v-btn>
              <v-list-tile-action>
              {{item.cantidad}}
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
data () {
    return {
      active: null,
      tabs: [
      {
      categoria: 'bebidas',
      productos: [
        {
        nombre: 'coca cola',
        cantidad: 0
        },
        {
        nombre: 'pepsi',
        cantidad: 0
        },
        {
        nombre: 'chocolate',
        cantidad: 0
        }
      ]
      },
      {
      categoria: 'postres',
      productos: [
        {
        nombre: 'tres leches',
        cantidad: 0
        },
        {
        nombre: 'aguacate con sal',
        cantidad: 0
        },
        {
        nombre: 'ajo molido',
        cantidad: 0
        }
      ]
      },
      {
      categoria: 'principal',
      productos: [
        {
        nombre: 'pollo al aguacate',
        cantidad: 0
        },
        {
        nombre: 'aguacate al horno',
        cantidad: 0
        },
        {
        nombre: 'pizza de don cangrejo',
        cantidad: 0
        }
      ]
      },
      ]
    }
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
    },
    aumentar (index,s) {
      s.cantidad++;
    },
    disminuir (index,s) {
      if(s.cantidad > 0)
        s.cantidad--;
    }
  }
};
</script>
