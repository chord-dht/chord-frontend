<template>
  <div>
    <h2>Store File</h2>
    <input type="file" @change="onFileChange">
    <button @click="storeFile" :disabled="isInitializing">Store File</button>
    <pre>{{ storeFileResult }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      storeFileResult: '',
      isInitializing: false
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async storeFile() {
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        const response = await axios.post('/storefile', formData);
        this.storeFileResult = response.data;
      } catch (err) {
        this.storeFileResult = err.response ? err.response.data : err.message;
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