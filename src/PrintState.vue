<template>
  <div>
    <h2>Print State</h2>
    <button @click="printState">Refresh</button>
    <div v-if="printStateMessage" :class="{'success-message': printStateMessageType === 'success', 'error-message': printStateMessageType === 'error'}">
      {{ printStateMessage }}
    </div>
    <div v-if="nodeState" class="two-columns">
      <div>
        <h3>Info</h3>
        <NodeInfo :nodeInfo="nodeState.info" />
        <h3>Predecessor</h3>
        <NodeInfo :nodeInfo="nodeState.predecessor" />
        <h3>Successors</h3>
        <NodeInfo v-for="(successor, index) in nodeState.successors" :key="index" :nodeInfo="successor" />
        <h3>Local Storage</h3>
        <StorageList :title="'Local Storage'" :items="[nodeState.localStorageName]" />
        <h3>Backup Storages</h3>
        <StorageList :title="'Backup Storages'" :items="nodeState.backupStoragesName" />
      </div>
      <div>
        <h3>Finger Table</h3>
        <FingerInfo v-for="(finger, index) in nodeState.fingerTable" :key="index" :finger="finger" :index="index" :fingerIndex="nodeState.fingerIndex[index]" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FingerInfo from './components/FingerInfo.vue';
import NodeInfo from './components/NodeInfo.vue';
import StorageList from './components/StorageList.vue';

export default {
  components: {
    NodeInfo,
    FingerInfo,
    StorageList
  },
  data() {
    return {
      nodeState: '',
      printStateMessage: '',
      printStateMessageType: '',
    };
  },
  methods: {
    async printState() {
      try {
        this.printStateMessage = '';
        this.nodeState = '';
        const response = await axios.get('/printstate');
        this.nodeState = response.data.nodestate;
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
.two-columns {
  display: flex;
  justify-content: space-between;
}
.two-columns > div {
  width: 48%;
}
</style>