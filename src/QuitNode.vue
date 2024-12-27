<template>
  <div class="quit-node">
    <h2>Quit Node</h2>
    <el-button @click="quitNode" type="primary" class="action-button">Quit Node</el-button>
  </div>
</template>

<script>
import axios from 'axios';
import { ElButton, ElMessage } from 'element-plus';

export default {
  components: {
    ElButton
  },
  methods: {
    async quitNode() {
      try {
        await axios.get('/api/quit');
        ElMessage.success("Node quitted successfully!");

        this.$emit('action', false);
      } catch (err) {
        const errorMessage = 'Failed to quit node: ' + (err.response ? err.response.data.error_message : err.message);
        ElMessage.error(errorMessage);

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
</style>