<template>
  <div>
    <h2>Get File</h2>
    <input v-model="getFileFilename" placeholder="Enter filename">
    <button @click="getFile">Get File</button>
    <pre>{{ getFileResult }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      getFileFilename: '',
      getFileResult: ''
    };
  },
  methods: {
    async getFile() {
      try {
        this.getFileResult = '';
        const getFileResponse = await axios.post('/getfile', { filename: this.getFileFilename });
        const downloadResponse = await axios.post('/downloadfile', { filename: this.getFileFilename }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.getFileFilename);
        document.body.appendChild(link);
        link.click();
        const targetNode = JSON.stringify(getFileResponse.data.target_node);
        this.getFileResult = `File downloaded successfully! Identifier: ${getFileResponse.data.file_identifier}, Target Node: ${targetNode}`;
      } catch (err) {        
        this.getFileResult = `Failed to get file: ${err.response ? err.response.data.message : err.message}`;
        if (err.response && err.response.data.details) {
          this.getFileResult += `\nDetails: ${err.response.data.details}`;
        }
        if (err.response && err.response.data.file_identifier) {
          this.getFileResult += `\nFile Identifier: ${err.response.data.file_identifier}`;
        }
        if (err.response && err.response.data.target_node) {
          this.getFileResult += `\nTarget Node: ${JSON.stringify(err.response.data.target_node)}`;
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