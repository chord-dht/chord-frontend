import { createApp } from 'vue';
import App from './App.vue';

axios.defaults.baseURL = 'http://localhost:8080'

createApp(App).mount('#app')
