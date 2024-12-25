<template>
  <div class="store-file">
    <h2>Store File</h2>
    <el-upload
      action=""
      :auto-upload="false"
      :on-change="onFileChange"
      :file-list="fileList"
      class="upload-field"
    >
      <el-button type="primary">Select File</el-button>
    </el-upload>
    <el-button @click="storeFile" :disabled="!file" type="primary" class="action-button">Store File</el-button>
    <el-alert v-if="storeFileResult" :type="storeFileResultType" :closable="false" class="result-alert">
      <pre>{{ storeFileResult }}</pre>
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
        const response = await axios.post('/storefile', formData);
        const targetNode = JSON.stringify(response.data.target_node);
        this.storeFileResult = `File stored successfully! Identifier: ${response.data.file_identifier}, Target Node: ${targetNode}`;
        this.storeFileResultType = 'success';
      } catch (err) {
        this.storeFileResult = `Failed to store file: ${err.response ? err.response.data.message : err.message}`;
        this.storeFileResultType = 'error';
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

pre {
  background: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>