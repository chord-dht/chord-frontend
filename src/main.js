import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';

axios.defaults.baseURL = 'http://172.21.255.242:8080'

createApp(App).mount('#app')
