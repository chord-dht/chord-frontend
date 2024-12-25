<template>
  <el-collapse>
    <el-collapse-item name="1" class="custom-collapse-item">
      <template #title>
        <div class="custom-title">{{ title }}</div>
      </template>
      <NodeInfo :nodeInfo="successor" />
      <StorageList :title="'Backup Storage'" :items="[backup]" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import NodeInfo from './NodeInfo.vue';
import StorageList from './StorageList.vue';

export default {
  components: {
    NodeInfo,
    StorageList
  },
  props: {
    title: {
      type: String,
      required: true
    },
    successor: {
      type: Object,
      required: true
    },
    backup: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.custom-collapse-item {
  margin-bottom: 20px; /* Add margin-bottom to create space between items */
  border-radius: 8px; /* Add border radius to the item */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* Add box shadow to the item */
  overflow: hidden; /* Ensure border radius is applied to the content */
}

.custom-title {
  background-color: #409eff; /* Blue background color */
  color: #ffffff; /* White text color */
  padding: 15px; /* Increase padding */
  font-size: 16px; /* Increase font size */
  font-weight: bold; /* Make font bold */
  border-radius: 4px; /* Add border radius */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Add box shadow */
  display: inline-block; /* Ensure the title does not stretch */
  width: 100%; /* Make the title full width */
}

.custom-title:hover {
  background-color: #66b1ff; /* Lighter blue background on hover */
}

:deep(.el-collapse-item__content) {
  padding: 20px;
  background-color: #ffffff; /* White background for the content */
}
</style>