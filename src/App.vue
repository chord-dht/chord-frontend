<template>
  <div id="app">
    <h1>Chord Backend Frontend</h1>

    <div>
      <h2>New Node</h2>
      <div>
        <label>Identifier Length:</label>
        <input v-model="config.IdentifierLength" type="number" placeholder="Enter Identifier Length">
      </div>
      <div>
        <label>Successors Length:</label>
        <input v-model="config.SuccessorsLength" type="number" placeholder="Enter Successors Length">
      </div>
      <div>
        <label>IP Address:</label>
        <input v-model="config.IpAddress" type="text" placeholder="Enter IP Address">
      </div>
      <div>
        <label>Port:</label>
        <input v-model="config.Port" type="number" placeholder="Enter Port">
      </div>
      <div>
        <label>Mode:</label>
        <input v-model="config.Mode" type="text" placeholder="Enter Mode">
      </div>
      <div>
        <label>Join Address:</label>
        <input v-model="config.JoinAddress" type="text" placeholder="Enter Join Address">
      </div>
      <div>
        <label>Join Port:</label>
        <input v-model="config.JoinPort" type="number" placeholder="Enter Join Port">
      </div>
      <div>
        <label>Stabilize Time:</label>
        <input v-model="config.StabilizeTime" type="number" placeholder="Enter Stabilize Time">
      </div>
      <div>
        <label>Fix Fingers Time:</label>
        <input v-model="config.FixFingersTime" type="number" placeholder="Enter Fix Fingers Time">
      </div>
      <div>
        <label>Check Predecessor Time:</label>
        <input v-model="config.CheckPredecessorTime" type="number" placeholder="Enter Check Predecessor Time">
      </div>
      <div>
        <label>Storage Path:</label>
        <input v-model="config.StorageDir" type="text" placeholder="Enter Storage Path">
      </div>
      <div>
        <label>Backup Storage Path:</label>
        <input v-model="config.BackupDir" type="text" placeholder="Backup Storage Path">
      </div>
      <div>
        <label>AES Enabled:</label>
        <input v-model="config.AESBool" type="checkbox">
      </div>
      <div>
        <label>AES Key Path:</label>
        <input v-model="config.AESKeyPath" type="text" placeholder="Enter AES Key Path">
      </div>
      <div>
        <label>TLS Enabled:</label>
        <input v-model="config.TLSBool" type="checkbox">
      </div>
      <div>
        <label>CA Certificate Path:</label>
        <input v-model="config.CaCert" type="text" placeholder="Enter CA Certificate Path">
      </div>
      <div>
        <label>Server Certificate Path:</label>
        <input v-model="config.ServerCert" type="text" placeholder="Enter Server Certificate Path">
      </div>
      <div>
        <label>Server Key Path:</label>
        <input v-model="config.ServerKey" type="text" placeholder="Enter Server Key Path">
      </div>
      <button @click="newNode" :disabled="isInitializing">New Node</button>
      <div v-if="message" :class="{'success-message': messageType === 'success', 'error-message': messageType === 'error'}">
        {{ message }}
      </div>
    </div>

    <div>
      <h2>Quit Node</h2>
      <button @click="quitNode" :disabled="isInitializing">Quit Node</button>
      <div v-if="quitMessage" :class="{'success-message': quitMessageType === 'success', 'error-message': quitMessageType === 'error'}">
        {{ quitMessage }}
      </div>
    </div>

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

    <div>
      <h2>Store File</h2>
      <input type="file" @change="onFileChange">
      <button @click="storeFile" :disabled="isInitializing">Store File</button>
      <pre>{{ storeFileResult }}</pre>
    </div>

    <div>
      <h2>Get File</h2>
      <input v-model="getFileFilename" placeholder="Enter filename">
      <button @click="getFile" :disabled="isInitializing">Get File</button>
    </div>

    <div v-if="error">
      <h2>Error</h2>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      config: {
        IdentifierLength: 10,
        SuccessorsLength: 4,
        IpAddress: '127.0.0.1',
        Port: 4170,
        Mode: 'create',
        JoinAddress: '',
        JoinPort: '',
        StabilizeTime: 3000,
        FixFingersTime: 1000,
        CheckPredecessorTime: 3000,
        StorageDir: './storage',
        BackupDir: './backup',
        AESBool: false,
        AESKeyPath: '',
        TLSBool: false,
        CaCert: '',
        ServerCert: '',
        ServerKey: ''
      },
      nodeState: '',
      storeFileResult: '',
      getFileFilename: '',
      error: null,
      file: null,
      message: '',
      messageType: '',
      quitMessage: '',
      quitMessageType: '',
      printStateMessage: '',
      printStateMessageType: '',
      isInitializing: false
    };
  },
  methods: {
    async newNode() {
      try {
        this.error = null;
        this.message = '';
        this.isInitializing = true; // Start initializing
        console.log('Sending request to create new node with config:', this.config);
        await axios.post('/new', this.config);
        await axios.get('/initialize');
        
        this.message = 'New node created successfully!';
        this.messageType = 'success';
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
        this.message = 'Failed to create new node: ' + this.error;
        this.messageType = 'error';
      } finally {
        // Reset isInitializing after 5 seconds
        setTimeout(() => {
          this.isInitializing = false;
        }, 5000);
      }
    },
    async quitNode() {
      try {
        this.error = null;
        this.quitMessage = '';
        const response = await axios.get('/quit');
        this.quitMessage = response.data.message;
        this.quitMessageType = 'success';
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
        this.quitMessage = 'Failed to quit node: ' + (this.error.details || this.error);
        this.quitMessageType = 'error';
      }
    },
    async printState() {
      try {
        this.error = null;
        this.printStateMessage = '';
        this.nodeState = '';
        const response = await axios.get('/printstate');
        this.nodeState = response.data.nodestate;
        this.printStateMessage = 'Node state retrieved successfully!';
        this.printStateMessageType = 'success';
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
        this.printStateMessage = 'Failed to retrieve node state: ' + (this.error.details || this.error);
        this.printStateMessageType = 'error';
      }
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async storeFile() {
      try {
        this.error = null;
        const formData = new FormData();
        formData.append('file', this.file);
        const response = await axios.post('/storefile', formData);
        this.storeFileResult = response.data;
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
      }
    },
    async getFile() {
      try {
        this.error = null;
        await axios.post('/getfile', { filename: this.getFileFilename });
        const response = await axios.post('/downloadfile', { filename: this.getFileFilename }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.getFileFilename);
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
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