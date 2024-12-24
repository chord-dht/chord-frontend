<template>
  <div>
    <h2>Quit Node</h2>
    <button @click="quitNode">Quit Node</button>
    <div v-if="quitMessage" :class="{'success-message': quitMessageType === 'success', 'error-message': quitMessageType === 'error'}">
      {{ quitMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      quitMessage: '',
      quitMessageType: '',
    };
  },
  methods: {
    async quitNode() {
      try {
        this.quitMessage = '';
        const response = await axios.get('/quit');
        this.quitMessage = response.data.message;
        this.quitMessageType = 'success';

        this.$emit('action', false);
      } catch (err) {
        this.quitMessage = 'Failed to quit node: ' + (err.response ? err.response.data : err.message);
        this.quitMessageType = 'error';

        this.$emit('action', true);
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