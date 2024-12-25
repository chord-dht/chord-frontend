import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';

// Fetch configuration from config.json
axios.get('/config.json')
  .then(response => {
    axios.defaults.baseURL = response.data.CHORD_ADDRESS;
    document.title = `Chord - ${axios.defaults.baseURL}`;
    createApp(App).use(ElementPlus).mount('#app');
  })
  .catch(error => {
    console.error('Error loading configuration:', error);
    document.title = 'Error loading configuration';
  });