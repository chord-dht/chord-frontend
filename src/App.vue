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
      <button @click="newNode">New Node</button>
    </div>

    <div>
      <h2>Quit Node</h2>
      <button @click="quitNode">Quit Node</button>
    </div>

    <div>
      <h2>Print State</h2>
      <button @click="printState">Print State</button>
      <pre>{{ nodeState }}</pre>
    </div>

    <div>
      <h2>Lookup</h2>
      <input v-model="lookupFilename" placeholder="Enter filename">
      <button @click="lookup">Lookup</button>
      <pre>{{ lookupResult }}</pre>
    </div>

    <div>
      <h2>Store File</h2>
      <input type="file" @change="onFileChange">
      <button @click="storeFile">Store File</button>
      <pre>{{ storeFileResult }}</pre>
    </div>

    <div>
      <h2>Get File</h2>
      <input v-model="getFileFilename" placeholder="Enter filename">
      <button @click="getFile">Get File</button>
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
        CheckPredecessorTime: 1000,
        AESBool: false,
        AESKeyPath: '',
        TLSBool: false,
        CaCert: '',
        ServerCert: '',
        ServerKey: ''
      },
      nodeState: '',
      lookupFilename: '',
      lookupResult: '',
      storeFileResult: '',
      getFileFilename: '',
      error: null,
      file: null
    };
  },
  methods: {
    async newNode() {
      try {
        this.error = null;
        console.log('Sending request to create new node with config:', this.config);
        await axios.post('/new', this.config);
        await axios.get('/initialize');
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
      }
    },
    async quitNode() {
      try {
        this.error = null;
        await axios.get('/quit');
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
      }
    },
    async printState() {
      try {
        this.error = null;
        const response = await axios.get('/printstate');
        this.nodeState = response.data;
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
      }
    },
    async lookup() {
      try {
        this.error = null;
        const response = await axios.post('/lookup', { filename: this.lookupFilename });
        this.lookupResult = response.data;
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
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
</style>