

import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index";
import { createPinia } from 'pinia';
import {createVuetify} from "vuetify";
import 'vuetify/dist/vuetify.min.css';


const app = createApp(App);
const pinia = createPinia();
const vuetify =  createVuetify({
    theme: {
        defaultTheme: 'light',
        //
      },
}); // Instantiate Vuetify

app.use(pinia);
app.use(vuetify); // Use Vuetify plugin
app.use(router);

app.mount('#app');