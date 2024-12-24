<template>
  <div class="finger-info">
    <div><strong>Finger {{ index }}: {{ finger.Identifier }} + 2^{{ index }} = {{ fingerIndex }}</strong></div>
    <div>
      <strong>Identifier:</strong> {{ finger.Identifier }}
      <strong>IP Address:</strong> {{ finger.IpAddress }}
      <strong>Port:</strong> {{ finger.Port }}
    </div>
  </div>
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
    }
  }
};
</script>

<style scoped>
.finger-info {
  background: #e8e8e8;
  padding: 10px;
  margin-bottom: 10px;
}
.finger-info div {
  margin-bottom: 5px;
}
</style>