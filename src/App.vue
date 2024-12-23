<template>
  <div id="app">
    <h1>Chord Backend Frontend</h1>

    <div>
      <h2>New Node</h2>
      <textarea v-model="config" placeholder="Enter config JSON"></textarea>
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
export default {
  data() {
    return {
      config: '',
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
        await axios.post('/new', JSON.parse(this.config));
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