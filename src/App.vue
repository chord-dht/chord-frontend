<template>
  <div id="app">
    <h1>Chord Backend Frontend</h1>
    <NewNode v-if="showNewNode" @nodeCreated="handleNodeCreated" />
    <div v-else>
      <div>
        <button @click="currentTab = 'storeGet'">Store/Get File</button>
        <button @click="currentTab = 'quitNode'">Quit Node</button>
        <button @click="currentTab = 'printState'">Print State</button>
      </div>
      <div v-if="currentTab === 'storeGet'">
        <StoreFile @action="handleAction" />
        <GetFile @action="handleAction" />
      </div>
      <div v-if="currentTab === 'quitNode'">
        <QuitNode @nodeQuit="handleNodeQuit" />
      </div>
      <div v-if="currentTab === 'printState'">
        <PrintState @action="handleAction" />
      </div>
    </div>
  </div>
</template>

<script>
import GetFile from './components/GetFile.vue';
import NewNode from './components/NewNode.vue';
import PrintState from './components/PrintState.vue';
import QuitNode from './components/QuitNode.vue';
import StoreFile from './components/StoreFile.vue';

export default {
  components: {
    NewNode,
    QuitNode,
    PrintState,
    StoreFile,
    GetFile
  },
  data() {
    return {
      showNewNode: true,
      currentTab: 'storeGet'
    };
  },
  methods: {
    handleNodeCreated(success) {
      if (success) {
        this.showNewNode = false;
      }
    },
    handleNodeQuit(success) {
      if (success) {
        this.showNewNode = true;
      }
    },
    handleAction(success) {
      if (!success) {
        this.showNewNode = true;
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