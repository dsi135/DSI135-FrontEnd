<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs10>
        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <span>Tema oscuro</span>
                <v-switch v-model="footer.dark" primary label="ON"></v-switch>
              </v-flex>

              <v-flex xs12 md6 v-show="false">
                <span>Modo caja</span>
                <v-switch v-model="footer.modoMesa" primary label="activar"></v-switch>
              </v-flex>

              <v-flex xs12 md6>
                <span>Footer</span>
                <v-switch v-model="footer.inset" label="Inset" primary></v-switch>
              </v-flex>

              <v-flex xs12 md6>
                <span>Sidebar</span>
                <v-radio-group v-model="primaryDrawer.type" column>
                  <v-radio
                    v-for="(drawer, index) in drawers"
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
                <span>Parametros</span>
                <v-select :items="parametros" item-text="nombre" item-value="id" @change="find"></v-select>
                <v-text-field
                  label="Valor del parametro"
                  v-model="detail"
                  required="true"
                  v-show="modo"
                ></v-text-field>
                <v-select
                  :items="[{id:'true',text:'Mesa'},{id:'false',text:'Caja'}]"
                  item-text="text"
                  v-model="detail"
                  item-value="id"
                  v-show="!modo"
                ></v-select>
                <v-btn flat color="primary" style="float:right;" @click="submit">Cambiar</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import restMethods from "./../restMethods.js";
const rm = new restMethods();
import { mapState } from "vuex";
import { setTimeout } from 'timers';
import { log } from 'util';
export default {
  data() {
    return {
      parametros: this.getParametros(),
      detail: null,
      modo: true,
      selection: null
    };
  },
  methods: {
    getParametros() {
      rm.getJson("parametros")
        .then(r => {
          this.parametros = r.data;
        })
        .catch(e => {
          this.parametros = [];
        });
    },
    find(value) {
      let fr = this.parametros.find(f => f.id === value);
      this.modo = fr.id === 1 ? false : true;
      this.detail = fr.valor;
      this.selection = fr;
    },
    submit() {
      console.log(JSON.stringify(this.selection));
      console.log(this.detail);
      rm.putJson("parametros/"+this.selection.id,{
        id: this.selection.id,
        nombre: this.selection.nombre,
        valor: this.detail
      });

      if(this.selection.id === 1){
        this.footer.modoMesa = (this.detail === 'true') ? true : false;
      }
      
      setTimeout(() => {
        this.getParametros();
      }, 100);

      console.log(JSON.stringify(this.footer.modoMesa));
      
    }
  },
  computed: {
    ...mapState(["dark", "drawers", "primaryDrawer", "footer"])
  }
};
</script>


