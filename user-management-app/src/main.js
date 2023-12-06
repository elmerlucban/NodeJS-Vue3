import { createApp } from 'vue'
import { createPinia } from "pinia"
import './style.css'
import './index.css'
import App from './App.vue'
import route from './router'

const app = createApp(App);
app.use(createPinia());
app.use(route);
app.mount("#app");