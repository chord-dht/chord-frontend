<template>
  <div class="print-state">
    <div class="header">
      <h2>Node State</h2>
      <el-button @click="printState" type="primary" class="refresh-button">Refresh</el-button>
    </div>
    <el-alert v-if="printStateMessage" :type="printStateMessageType" :closable="false" class="result-alert">
      {{ printStateMessage }}
    </el-alert>
    <div v-if="nodeState" class="two-columns">
      <div>
        <h3>Info</h3>
        <div class="sticky-info" ref="stickyInfo">
          <NodeInfo :nodeInfo="nodeState.info" />
        </div>
        <h3>Predecessor</h3>
        <NodeInfo :nodeInfo="nodeState.predecessor" />
        <h3>First Successor</h3>
        <NodeInfo :nodeInfo="nodeState.successors[0]" />
        <h3>Local Storage</h3>
        <StorageList :title="'Local Storage'" :items="[nodeState.localStorageName]" />
        <h3>Successors and Backup Storages</h3>
        <div v-for="(successor, index) in nodeState.successors" :key="index">
          <SuccessorBackup
            :title="'Successor ' + index"
            :successor="successor"
            :backup="nodeState.backupStoragesName[index]"
          />
        </div>
      </div>
      <div>
        <h3>Finger Table</h3>
        <FingerInfo
          v-for="(finger, index) in nodeState.fingerTable"
          :key="index"
          :finger="finger"
          :index="index"
          :fingerIndex="nodeState.fingerIndex[index]"
          :identifier="nodeState.info.Identifier"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ElAlert, ElButton } from 'element-plus';
import FingerInfo from './components/FingerInfo.vue';
import NodeInfo from './components/NodeInfo.vue';
import StorageList from './components/StorageList.vue';
import SuccessorBackup from './components/SuccessorBackup.vue';

export default {
  components: {
    NodeInfo,
    FingerInfo,
    StorageList,
    SuccessorBackup,
    ElButton,
    ElAlert
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
        this.printStateMessageType = 'success';
      } catch (err) {
        this.printStateMessage = 'Failed to retrieve node state: ' + (err.response ? err.response.data : err.message);
        this.printStateMessageType = 'error';
      }
    },
    handleScroll() {
      const stickyInfo = this.$refs.stickyInfo;
      const offsetTop = stickyInfo.getBoundingClientRect().top;
      const parentOffsetTop = stickyInfo.parentElement.getBoundingClientRect().top;
      if (offsetTop <= 0 && parentOffsetTop <= 0) {
        stickyInfo.classList.add('fixed');
        stickyInfo.style.width = `${stickyInfo.parentElement.offsetWidth}px`;
        stickyInfo.style.left = `${stickyInfo.parentElement.getBoundingClientRect().left}px`;
      } else {
        stickyInfo.classList.remove('fixed');
        stickyInfo.style.width = '';
        stickyInfo.style.left = '';
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.print-state {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: #333;
  margin: 0;
  font-size: 24px; /* Increase font size */
  font-weight: bold; /* Make font bold */
}

.refresh-button {
  margin-bottom: 0;
}

.result-alert {
  margin-top: 20px;
}

.two-columns {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.two-columns > div {
  flex: 1;
}

h3 {
  color: #409eff;
  margin-bottom: 10px;
  font-size: 20px; /* Increase font size */
  font-weight: bold; /* Make font bold */
}

pre {
  background: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

.sticky-info {
  z-index: 1000;
  padding: 0; /* Remove padding */
}

.fixed {
  position: fixed;
  top: 0;
  background-color: #f5f5f5;
}
</style>