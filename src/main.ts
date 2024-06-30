import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import { createWebHashHistory, createRouter } from 'vue-router'
import routes from "./config/route.ts";
import 'vant/lib/index.css';

const app = createApp(App);
app.use(Vant);
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

app.use(router)
// 挂载
app.mount('#app')








