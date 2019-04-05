
<template>
  <v-app id="sandbox" :dark="dark">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :temporary="primaryDrawer.type === 'temporary'"
      :clipped="primaryDrawer.clipped"
      :mini-variant="primaryDrawer.mini"
      absolute
      overflow
      app
    > 
      <v-list>
        <template>
          <v-list-tile @click="renderizar(0)">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-group prepend-icon="view_list" value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Opciones</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-group no-action sub-group value="true">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Admin</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile @click="true">
              <v-list-tile-title>Productos</v-list-tile-title>
              <v-list-tile-action>
                <v-icon>fastfood</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-list-tile @click="true">
              <v-list-tile-title>Categorias</v-list-tile-title>
              <v-list-tile-action>
                <v-icon>category</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-tile @click="true">
            <v-list-tile-action>
              <v-icon>assessment</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Estadisticas</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="renderizar(1)">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Personalizacion</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="primaryDrawer.clipped" app fixed>
      <v-toolbar-side-icon @click.stop="primaryDrawer.model = !primaryDrawer.model"></v-toolbar-side-icon>
      <v-toolbar-title>DSI135</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <handler v-show="apartados[0].render"/>

      <!-- ESTO ES EL COMPONENTE DE CONFIGURACION -->
      <v-container fluid v-show="apartados[1].render">
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                    <span>Scheme</span>
                    <v-switch v-model="dark" primary label="Dark"></v-switch>
                  </v-flex>

                  <v-flex xs12 md6>
                    <span>Drawer</span>
                    <v-radio-group v-model="primaryDrawer.type" column>
                      <v-radio
                        v-for="(drawer,index) in drawers"
                        :key="index"
                        :label="drawer.nombre"
                        :value="drawer.tipo.toLowerCase()"
                        primary
                      ></v-radio>
                    </v-radio-group>
                    <v-switch v-model="primaryDrawer.clipped" label="Clipped" primary></v-switch>
                    <v-switch v-model="primaryDrawer.mini" label="Mini" primary></v-switch>
                  </v-flex>

                  <v-flex xs12 md6>
                    <span>Footer</span>
                    <v-switch v-model="footer.inset" label="Inset" primary></v-switch>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat>Cancel</v-btn>
                <v-btn flat color="primary">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>


import handler from "./components/Handler";
export default {
  components: {
    handler: handler
  },
  data() {
    return {
      dark: true,
      apartados: [
        { apartado: "Dasboard", render: true},
        { apartado: "Personalizar", render: false}
      ],
      drawers: [
        { nombre: "Default", tipo: "Default (no property)" },
        { nombre: "Temporal", tipo: "Temporary" }
      ],
      primaryDrawer: {
        model: null,
        type: "default (no property)",
        clipped: false,
        mini: false
      },
      footer: {
        inset: false
      }
    };
  },
  methods: {
    renderizar(index) {
      this.apartados.forEach(apartado => {
        apartado.render = false;
      });
      this.apartados[index].render = true;
    }
  }
};
</script>
