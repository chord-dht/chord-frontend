import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';

// Fetch configuration from config.json
axios.get('/config.json')
  .then(response => {
    axios.defaults.baseURL = response.data.CHORD_ADDRESS;
    createApp(App).mount('#app');
  })
  .catch(error => {
    console.error('Error loading configuration:', error);
  });