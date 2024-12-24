<template>
  <div>
    <h2>Print State</h2>
    <button @click="printState" :disabled="isInitializing">Print State</button>
    <div v-if="printStateMessage" :class="{'success-message': printStateMessageType === 'success', 'error-message': printStateMessageType === 'error'}">
      {{ printStateMessage }}
    </div>
    <div v-if="nodeState">
      <h3>Info</h3>
      <pre>{{ nodeState.info }}</pre>
      <h3>Predecessor</h3>
      <pre>{{ nodeState.predecessor }}</pre>
      <h3>Successors</h3>
      <pre v-for="(successor, index) in nodeState.successors" :key="index">{{ successor }}</pre>
      <h3>Finger Table</h3>
      <pre v-for="(finger, index) in nodeState.fingerTable" :key="index">{{ finger }} - Index: {{ nodeState.fingerIndex[index] }}</pre>
      <h3>Local Storage Name</h3>
      <pre>{{ nodeState.localStorageName }}</pre>
      <h3>Backup Storages Name</h3>
      <pre v-for="(backup, index) in nodeState.backupStoragesName" :key="index">{{ backup }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nodeState: '',
      printStateMessage: '',
      printStateMessageType: '',
      isInitializing: false
    };
  },
  methods: {
    async printState() {
      try {
        this.printStateMessage = '';
        this.nodeState = '';
        const response = await axios.get('/printstate');
        this.nodeState = response.data.nodestate;
        this.printStateMessage = 'Node state retrieved successfully!';
        this.printStateMessageType = 'success';
      } catch (err) {
        this.printStateMessage = 'Failed to retrieve node state: ' + (err.response ? err.response.data : err.message);
        this.printStateMessageType = 'error';
      }
    }
  }
};
</script>

<style scoped>
#app {
  padding: 20px;
}
h1, h2 {
  color: #333;
}
textarea, input {
  display: block;
  margin-bottom: 10px;
}
button {
  margin-bottom: 10px;
}
pre {
  background: #f4f4f4;
  padding: 10px;
}
.success-message {
  color: green;
}
.error-message {
  color: red;
}
</style>