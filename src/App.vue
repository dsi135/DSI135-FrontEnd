<template>
  <v-app id="app" :dark="footer.dark">
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
          <v-list-tile @click="$router.push('/dashboard')">
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

            <v-list-tile @click="$router.push('/productos')">
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

          <v-list-tile @click="$router.push('/personalizar')">
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
        <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
        </transition>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import handler from "./components/Handler";
import { mapState } from 'vuex'
export default {
  components: {
    handler: handler
  },
  data() {
    return {
      apartados: [
        { apartado: "Dasboard", render: true },
        { apartado: "Personalizar", render: false }
      ]
    };
  },
  computed: {
    ...mapState(['dark', 'drawers', 'primaryDrawer', 'footer'])
  },
};
</script>

