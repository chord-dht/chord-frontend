<template>
  <div>
    <h2>Store File</h2>
    <input type="file" @change="onFileChange">
    <button @click="storeFile">Store File</button>
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
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async storeFile() {
      try {
        this.storeFileResult = '';
        const formData = new FormData();
        formData.append('file', this.file);
        const response = await axios.post('/storefile', formData);
        const targetNode = JSON.stringify(response.data.target_node);
        this.storeFileResult = `File stored successfully! Identifier: ${response.data.file_identifier}, Target Node: ${targetNode}`;
      } catch (err) {
        this.storeFileResult = `Failed to store file: ${err.response ? err.response.data.message : err.message}`;
        if (err.response && err.response.data.details) {
          this.storeFileResult += `\nDetails: ${err.response.data.details}`;
        }
        if (err.response && err.response.data.file_identifier) {
          this.storeFileResult += `\nFile Identifier: ${err.response.data.file_identifier}`;
        }
        if (err.response && err.response.data.target_node) {
          this.storeFileResult += `\nTarget Node: ${JSON.stringify(err.response.data.target_node)}`;
        }
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