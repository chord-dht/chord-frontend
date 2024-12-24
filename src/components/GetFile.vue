<template>
  <div>
    <h2>Get File</h2>
    <input v-model="getFileFilename" placeholder="Enter filename">
    <button @click="getFile" :disabled="isInitializing">Get File</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      getFileFilename: '',
      isInitializing: false
    };
  },
  methods: {
    async getFile() {
      try {
        await axios.post('/getfile', { filename: this.getFileFilename });
        const response = await axios.post('/downloadfile', { filename: this.getFileFilename }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.getFileFilename);
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    }
  }
};
</script>


<style scoped>
#app {
  padding: 20px;
}
h1, h2 {
  color: #333;
}
textarea, input {
  display: block;
  margin-bottom: 10px;
}
button {
  margin-bottom: 10px;
}
pre {
  background: #f4f4f4;
  padding: 10px;
}
.success-message {
  color: green;
}
.error-message {
  color: red;
}
</style>