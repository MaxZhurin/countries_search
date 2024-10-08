import { createApp } from "vue"
import { createPinia } from "pinia"
import Toast from "vue-toastification";

import App from "./App.vue"

import "vue-toastification/dist/index.css";
import "@/styles/main.css"
import "@/styles/transitions.css"

const pinia = createPinia()
const app = createApp(App);

app.use(pinia);
app.use(Toast, {});

app.mount("#app")
