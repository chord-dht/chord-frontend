<template>
  <div class="get-file">
    <h2>Get File</h2>
    <el-input v-model="getFileFilename" placeholder="Enter filename" class="input-field"></el-input>
    <el-button @click="getFile" type="primary" class="action-button">Get File</el-button>
    <el-alert v-if="getFileResult" :type="getFileResultType" :closable="false" class="result-alert">
      <pre>{{ getFileResult }}</pre>
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
        this.getFileResultType = 'success';
      } catch (err) {
        this.getFileResult = `Failed to get file: ${err.response ? err.response.data.message : err.message}`;
        this.getFileResultType = 'error';
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

pre {
  background: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>