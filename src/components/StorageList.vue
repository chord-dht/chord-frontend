<template>
  <div class="storage-list">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <div v-for="(subItem, subIndex) in item" :key="subIndex" class="sub-item">{{ subItem }}</div>
      </li>
    </ul>
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

.storage-list ul {
  list-style-type: none;
  padding: 0;
}

.storage-list li {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
  transition: background 0.3s, transform 0.3s;
}

.sub-item {
  margin-bottom: 10px;
  padding: 5px;
  background: #f0f0f0;
  border-radius: 3px;
}
</style>