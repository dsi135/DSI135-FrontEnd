
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
        <v-list-tile @click="dash = !dash" >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="config = !config"  >
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Configuracion</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="primaryDrawer.clipped" app fixed>
      <v-toolbar-side-icon @click.stop="primaryDrawer.model = !primaryDrawer.model"></v-toolbar-side-icon>
      <v-toolbar-title>DSI135</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <dashboard v-show="dash"/>
      <nuevaOrden/>

      <v-container fluid v-show="config">
        <v-layout align-center justify-center >
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
                        v-for="drawer in drawers"
                        :key="drawer"
                        :label="drawer"
                        :value="drawer.toLowerCase()"
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
import Dashboard from "./components/Dashboard.vue"
import NuevaOrden from "./components/NuevaOrden.vue"
export default {
  components: {
    "dashboard": Dashboard,
    "nuevaOrden": NuevaOrden
  },
  data: () => ({
    dash: false,
    config: false,
    dark: true,
    drawers: ["Default (no property)", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      mini: false
    },
    footer: {
      inset: false
    }
  })
};
</script>


