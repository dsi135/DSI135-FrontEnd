<template>
    <div>
      <v-tabs v-model="active" slider-color="yellow">
        <v-tab v-for="n in tabs" :key="n.id" ripple>
          {{ n.categoria }}
        </v-tab>

        <v-tab-item v-for="n in tabs" :key="n.id" >
          <v-card flat>
            <v-list>
              <v-list-tile v-for="(item,index) in n.productos" :key="index" @click="aumentar(index,item)">
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.nombre"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-title v-text="item.cantidad"></v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-tab-item>
      </v-tabs>

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
        nombre: 'agua al horno',
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
    }
  }
};
</script>
