<template>
  <div class="quit-node">
    <h2>Quit Node</h2>
    <el-button @click="quitNode" type="primary" class="action-button">Quit Node</el-button>
    <el-alert v-if="quitMessage" :type="quitMessageType" :closable="false" class="result-alert">
      {{ quitMessage }}
    </el-alert>
  </div>
</template>

<script>
import axios from 'axios';
import { ElAlert, ElButton } from 'element-plus';

export default {
  components: {
    ElButton,
    ElAlert
  },
  data() {
    return {
      quitMessage: '',
      quitMessageType: '',
    };
  },
  methods: {
    async quitNode() {
      try {
        this.quitMessage = '';
        const response = await axios.get('/quit');
        this.quitMessage = response.data.message;
        this.quitMessageType = 'success';

        this.$emit('action', false);
      } catch (err) {
        this.quitMessage = 'Failed to quit node: ' + (err.response ? err.response.data : err.message);
        this.quitMessageType = 'error';

        this.$emit('action', true);
      }
    }
  }
};
</script>

<style scoped>
.quit-node {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
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