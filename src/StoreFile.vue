<template>
  <div class="store-file">
    <h2>Store File</h2>
    <el-upload action="" :auto-upload="false" :on-change="onFileChange" :file-list="fileList" class="upload-field">
      <el-button type="primary">Select File</el-button>
    </el-upload>
    <el-button @click="storeFile" :disabled="!file" type="primary" class="action-button">Store File</el-button>
    <el-alert v-if="storeFileResult" :type="storeFileResultType" :closable="false" class="result-alert">
      <div v-if="storeFileResultType === 'success'">
        <p><strong>File stored successfully!</strong></p>
        <p><strong>File Identifier:</strong> {{ storeFileResult.file_identifier }}</p>
        <p><strong>Target Node:</strong></p>
        <ul>
          <li><strong>Identifier:</strong> {{ storeFileResult.target_node.Identifier }}</li>
          <li><strong>IP Address:</strong> {{ storeFileResult.target_node.IpAddress }}</li>
          <li><strong>Port:</strong> {{ storeFileResult.target_node.Port }}</li>
        </ul>
      </div>
      <div v-else>
        <p><strong>Failed to store file:</strong> {{ storeFileResult.message }}</p>
        <p v-if="storeFileResult.details"><strong>Details:</strong> {{ storeFileResult.details }}</p>
        <p v-if="storeFileResult.file_identifier"><strong>File Identifier:</strong> {{ storeFileResult.file_identifier
          }}</p>
        <p v-if="storeFileResult.target_node"><strong>Target Node:</strong></p>
        <ul v-if="storeFileResult.target_node">
          <li><strong>Identifier:</strong> {{ storeFileResult.target_node.Identifier }}</li>
          <li><strong>IP Address:</strong> {{ storeFileResult.target_node.IpAddress }}</li>
          <li><strong>Port:</strong> {{ storeFileResult.target_node.Port }}</li>
        </ul>
      </div>
    </el-alert>
  </div>
</template>

<script>
import axios from 'axios';
import { ElAlert, ElButton, ElUpload } from 'element-plus';

export default {
  components: {
    ElUpload,
    ElButton,
    ElAlert
  },
  data() {
    return {
      file: null,
      fileList: [],
      storeFileResult: '',
      storeFileResultType: ''
    };
  },
  methods: {
    onFileChange(file, fileList) {
      this.file = file.raw;
      this.fileList = fileList;
    },
    async storeFile() {
      try {
        this.storeFileResult = '';
        const formData = new FormData();
        formData.append('file', this.file);
        const response = await axios.post('/api/storefile', formData);
        const { file_identifier, target_node } = response.data.data;
        this.storeFileResult = { file_identifier, target_node };
        this.storeFileResultType = 'success';
      } catch (err) {
        this.storeFileResult = {
          message: err.response ? err.response.data.error_message : err.message,
          details: err.response && err.response.data.details,
          file_identifier: err.response && err.response.data.file_identifier,
          target_node: err.response && err.response.data.target_node
        };
        this.storeFileResultType = 'error';
      }
    }
  }
};
</script>

<style scoped>
.store-file {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.upload-field {
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