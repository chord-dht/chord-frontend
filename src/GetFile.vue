<template>
  <div class="get-file">
    <h2>Get File</h2>
    <el-input v-model="getFileFilename" placeholder="Enter filename" class="input-field"></el-input>
    <el-button @click="getFile" type="primary" class="action-button">Get File</el-button>
    <el-alert v-if="getFileResult" :type="getFileResultType" :closable="false" class="result-alert">
      <div v-if="getFileResultType === 'success'">
        <p><strong>File downloaded successfully!</strong></p>
        <p><strong>File Identifier:</strong> {{ getFileResult.file_identifier }}</p>
        <p><strong>Target Node:</strong></p>
        <ul>
          <li><strong>Identifier:</strong> {{ getFileResult.target_node.Identifier }}</li>
          <li><strong>IP Address:</strong> {{ getFileResult.target_node.IpAddress }}</li>
          <li><strong>Port:</strong> {{ getFileResult.target_node.Port }}</li>
        </ul>
      </div>
      <div v-else>
        <p><strong>Failed to get file:</strong> {{ getFileResult.message }}</p>
        <p v-if="getFileResult.file_identifier">
          <strong>File Identifier:</strong> {{ getFileResult.file_identifier }}
        </p>
        <p v-if="getFileResult.target_node"><strong>Target Node:</strong></p>
        <ul v-if="getFileResult.target_node">
          <li><strong>Identifier:</strong> {{ getFileResult.target_node.Identifier }}</li>
          <li><strong>IP Address:</strong> {{ getFileResult.target_node.IpAddress }}</li>
          <li><strong>Port:</strong> {{ getFileResult.target_node.Port }}</li>
        </ul>
      </div>
    </el-alert>
  </div>
</template>

<script>
import axios from 'axios';
import { ElAlert, ElButton, ElInput } from 'element-plus';

export default {
  components: {
    ElInput,
    ElButton,
    ElAlert
  },
  data() {
    return {
      getFileFilename: '',
      getFileResult: '',
      getFileResultType: ''
    };
  },
  methods: {
    async getFile() {
      try {
        this.getFileResult = '';
        // First request to get file information
        const getFileResponse = await axios.post('/api/getfile', { filename: this.getFileFilename });
        const { file_identifier, target_node } = getFileResponse.data.data;

        // Second request to download the file
        const downloadResponse = await axios.post('/api/downloadfile', { filename: this.getFileFilename }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.getFileFilename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.getFileResult = { file_identifier, target_node };
        this.getFileResultType = 'success';
      } catch (err) {
        const errorData = err.response && err.response.data;
        this.getFileResult = {
          message: errorData ? errorData.error_message : err.message,
          file_identifier: errorData && errorData.data && errorData.data.file_identifier,
          target_node: errorData && errorData.data && errorData.data.target_node
        };
        this.getFileResultType = 'error';
      }
    }
  }
};
</script>

<style scoped>
.get-file {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.input-field {
  margin-bottom: 20px;
}

.action-button {
  margin-bottom: 20px;
}

.result-alert {
  margin-top: 20px;
}

.result-alert p {
  margin: 0;
  font-size: 16px;
}

.result-alert ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.result-alert ul li {
  margin: 5px 0;
  font-size: 16px;
}

pre {
  background: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>