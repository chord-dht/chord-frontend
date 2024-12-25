<template>
  <el-card class="finger-info">
    <div class="finger-header">
      <strong>Finger {{ index }}: {{ identifier }} + 2<sup>{{ index }}</sup> = {{ fingerIndex }}</strong>
    </div>
    <div class="finger-details">
      <el-card class="detail-card">
        <strong>Identifier:</strong> <span>{{ finger.Identifier }}</span>
      </el-card>
      <el-card class="detail-card">
        <strong>Address:</strong> <span>{{ finger.IpAddress }}:{{ finger.Port }}</span>
      </el-card>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    finger: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    fingerIndex: {
      type: Number,
      required: true
    },
    identifier: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.finger-info {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 5px; /* Reduced padding */
  margin-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.finger-info:hover {
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2);
}

.finger-header {
  font-size: 16px; /* Increased font size */
  font-weight: bold;
  margin-bottom: 5px; /* Reduced margin */
  color: #409eff;
}

.finger-details {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Reduced gap */
}

.detail-card {
  flex: 1;
  padding: 2px; /* Further reduced padding */
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