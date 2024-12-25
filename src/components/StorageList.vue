<template>
  <div class="storage-list">
    <el-card v-for="(item, index) in items" :key="index" class="storage-item">
      <div v-for="(subItem, subIndex) in item" :key="subIndex" class="sub-item">{{ subItem }}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.storage-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.storage-item {
  padding: 15px;
  background: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.storage-item:hover {
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2);
}

.sub-item {
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
  color: #606266;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sub-item:last-child {
  margin-bottom: 0;
}
</style>