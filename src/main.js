import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          background: "#F5F5F5",
        },
      },
      dark: {
        colors: {
          primary: "#90CAF9",
          secondary: "#B0BEC5",
          background: "#121212",
        },
      },
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
