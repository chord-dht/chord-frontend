<template>
  <div class="node-info">
    <div>
      <strong>Identifier:</strong> {{ nodeInfo.Identifier }}
      <strong>IP Address:</strong> {{ nodeInfo.IpAddress }}
      <strong>Port:</strong> {{ nodeInfo.Port }}
    </div>
  </div>
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
  background: #f4f4f4;
  padding: 10px;
  margin-bottom: 10px;
}
.node-info div {
  margin-bottom: 5px;
}
</style>