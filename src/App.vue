<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <h1>Chord Client</h1>
      </el-header>
      <el-main>
        <NewNode v-if="showNewNode" @nodeCreated="handleNodeCreated" />
        <div v-else>
          <el-tabs v-model="currentTab" @tab-click="handleTabClick">
            <el-tab-pane label="Quit Node" name="quitNode"></el-tab-pane>
            <el-tab-pane label="Store File" name="storefile"></el-tab-pane>
            <el-tab-pane label="Get File" name="getfile"></el-tab-pane>
            <el-tab-pane label="Print State" name="printState"></el-tab-pane>
            <el-tab-pane label="Chord Ring" name="chordRing"></el-tab-pane>
          </el-tabs>
          <component :is="currentTabComponent" @action="handleAction" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ElButton, ElContainer, ElHeader, ElMain, ElRow, ElTabPane, ElTabs } from 'element-plus';
import ChordRing from './ChordRing.vue';
import GetFile from './GetFile.vue';
import NewNode from './NewNode.vue';
import PrintState from './PrintState.vue';
import QuitNode from './QuitNode.vue';
import StoreFile from './StoreFile.vue';

export default {
  components: {
    ElButton,
    ElContainer,
    ElHeader,
    ElMain,
    ElRow,
    ElTabs,
    ElTabPane,
    NewNode,
    QuitNode,
    PrintState,
    StoreFile,
    GetFile,
    ChordRing
  },
  data() {
    return {
      showNewNode: true,
      currentTab: 'storefile'
    };
  },
  computed: {
    currentTabComponent() {
      switch (this.currentTab) {
        case 'quitNode':
          return QuitNode;
        case 'storefile':
          return StoreFile;
        case 'getfile':
          return GetFile;
        case 'printState':
          return PrintState;
        case 'chordRing':
          return ChordRing;
        default:
          return null; // Return null if no matching tab is found
      }
    }
  },
  methods: {
    handleNodeCreated(success) {
      if (success) {
        this.showNewNode = false;
      }
    },
    handleAction(success) {
      if (!success) {
        this.showNewNode = true;
      }
    },
    handleTabClick(tab) {
      const validTabs = ['quitNode', 'storefile', 'getfile', 'printState', 'chordRing'];
      if (validTabs.includes(tab.name)) {
        this.currentTab = tab.name;
      }
    }
  }
};
</script>

<style scoped>
#app {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  background-color: #409eff;
  color: white;
  padding: 10px 20px;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 24px;
}

.el-tabs__header {
  margin-bottom: 20px;
}

.el-tab-pane {
  display: none;
}
</style>