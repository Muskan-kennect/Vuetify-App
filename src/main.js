import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index";
import { createPinia } from 'pinia';
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";


const app = createApp(App);
const pinia = createPinia();
const vuetify =  createVuetify({
  components,
  directives,
    theme: {
        defaultTheme: 'light',
        //
      },
}); // Instantiate Vuetify

app.use(pinia);
app.use(vuetify); // Use Vuetify plugin
app.use(router);

app.mount('#app');