<template>
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
      message: '',
      messageType: '',
      isInitializing: false
    };
  },
  methods: {
    async newNode() {
      try {
        this.message = '';
        this.isInitializing = true;
        await axios.post('/new', this.config);
        await axios.get('/initialize');
        this.message = 'New node created successfully!';
        this.messageType = 'success';
      } catch (err) {
        this.message = 'Failed to create new node: ' + (err.response ? err.response.data : err.message);
        this.messageType = 'error';
      } finally {
        setTimeout(() => {
          this.isInitializing = false;
        }, 5000);
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