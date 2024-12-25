<template>
  <div class="chord-ring">
    <el-button @click="fetchNodeState" type="primary" class="refresh-button">Refresh</el-button>
    <el-alert v-if="errorMessage" :type="alertType" :closable="false" class="result-alert">
      {{ errorMessage }}
    </el-alert>
    <svg ref="svg" :width="width" :height="height"></svg>
  </div>
</template>

<script>
import axios from 'axios';
import * as d3 from 'd3';

export default {
  data() {
    return {
      nodeState: null,
      errorMessage: '',
      alertType: '',
      width: 800,
      height: 800,
      radius: 250
    };
  },
  mounted() {
    this.fetchNodeState();
  },
  methods: {
    async fetchNodeState() {
      try {
        this.errorMessage = '';
        this.nodeState = null;
        const response = await axios.get('/printstate');
        const { node_state } = response.data.data;
        this.nodeState = node_state;
        this.alertType = 'success';
        this.drawChordRing();
      } catch (err) {
        this.errorMessage = 'Failed to retrieve node state: ' + (err.response ? err.response.data.error_message : err.message);
        this.alertType = 'error';
      }
    },
    drawChordRing() {
      if (!this.nodeState) return;

      // Clear previous SVG content
      d3.select(this.$refs.svg).selectAll("*").remove();

      const svg = d3.select(this.$refs.svg)
        .attr('viewBox', `0 0 ${this.width} ${this.height}`)
        .append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      // Draw the ring
      svg.append('circle')
        .attr('r', this.radius)
        .attr('fill', 'none')
        .attr('stroke', '#ccc');

      const data = this.getChordData();
      const m = this.nodeState.fingerTable.length; // Set m to the length of the fingerTable array

      // Draw the nodes as points
      const points = svg.selectAll('.point')
        .data(data)
        .enter().append('g')
        .attr('class', 'point')
        .attr('transform', d => {
          const angle = (Number(d.value) / Math.pow(2, m)) * 2 * Math.PI - Math.PI / 2; // Adjust angle to start from top
          const x = this.radius * Math.cos(angle);
          const y = this.radius * Math.sin(angle);
          return `translate(${x}, ${y})`;
        });

      points.append('circle')
        .attr('r', 5)
        .attr('fill', (d, i) => d3.schemeCategory10[i % 10]);

      points.append('text')
        .attr('dx', 10)
        .attr('dy', 5)
        .style('text-anchor', 'start')
        .style('fill', d => d.label === 'Node' ? 'red' : '#333') // Highlight the node text with red color
        .text(d => `${d.value} (${d.address}:${d.port})`); // Display Identifier, address, and port

      // Add star marker for the node
      const nodeData = data.find(d => d.label === 'Node');
      if (nodeData) {
        const angle = (Number(nodeData.value) / Math.pow(2, m)) * 2 * Math.PI - Math.PI / 2;
        const x = this.radius * Math.cos(angle);
        const y = this.radius * Math.sin(angle);
        svg.append('text')
          .attr('x', x)
          .attr('y', y - 10) // Position the star above the node
          .attr('text-anchor', 'middle')
          .attr('font-size', '20px')
          .attr('fill', 'red')
          .text('★'); // Star symbol
      }
    },
    getChordData() {
      const data = [];
      const seen = new Set();
      const m = this.nodeState ? this.nodeState.fingerTable.length : 0;
      const maxIdentifier = BigInt(2) ** BigInt(m);

      if (this.nodeState) {
        const addData = (label, value, address, port) => {
          const intValue = BigInt(value);
          if (!seen.has(intValue) && intValue < maxIdentifier) {
            data.push({ label, value: intValue, address, port });
            seen.add(intValue);
          }
        };
        addData('Node', this.nodeState.info.Identifier, this.nodeState.info.IpAddress, this.nodeState.info.Port);
        if (this.nodeState.predecessor) {
          addData('Predecessor', this.nodeState.predecessor.Identifier, this.nodeState.predecessor.IpAddress, this.nodeState.predecessor.Port);
        }
        this.nodeState.successors.forEach((successor, index) => {
          addData(`Successor ${index}`, successor.Identifier, successor.IpAddress, successor.Port);
        });
        this.nodeState.fingerTable.forEach((finger, index) => {
          addData(`Finger ${index}`, finger.Identifier, finger.IpAddress, finger.Port);
        });
      }
      return data;
    }
  }
};
</script>

<style scoped>
.chord-ring {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.refresh-button {
  margin-bottom: 20px;
}

.result-alert {
  margin-bottom: 20px;
}
</style>