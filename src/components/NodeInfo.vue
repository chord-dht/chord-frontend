<template>
  <el-card class="node-info">
    <div class="node-details">
      <el-card class="detail-card">
        <strong>Identifier:</strong> <span>{{ nodeInfo.Identifier }}</span>
      </el-card>
      <el-card class="detail-card">
        <strong>Address:</strong> <span>{{ nodeInfo.IpAddress }}:{{ nodeInfo.Port }}</span>
      </el-card>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    nodeInfo: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.node-info {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.node-info:hover {
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2);
}

.node-details {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Increased gap */
}

.detail-card {
  flex: 1;
  background: #f9f9f9;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
}

.detail-card:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.detail-card strong {
  color: #409eff;
  margin-right: 5px;
}

.detail-card span {
  color: #606266;
}
</style>