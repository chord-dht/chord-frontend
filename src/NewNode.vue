<template>
  <div class="new-node">
    <h2>New Node</h2>
    <el-form :model="config" class="form-container">
      <el-collapse>
        <el-collapse-item title="Network Configuration">
          <div class="form-group">
            <el-form-item label="Identifier Length">
              <el-input v-model="config.IdentifierLength" type="number"
                placeholder="Enter Identifier Length"></el-input>
            </el-form-item>
            <el-form-item label="Successors Length">
              <el-input v-model="config.SuccessorsLength" type="number"
                placeholder="Enter Successors Length"></el-input>
            </el-form-item>
            <el-form-item label="IP Address">
              <el-input v-model="config.IpAddress" type="text" placeholder="Enter IP Address"></el-input>
            </el-form-item>
            <el-form-item label="Port">
              <el-input v-model="config.Port" type="number" placeholder="Enter Port"></el-input>
            </el-form-item>
            <el-form-item label="Mode">
              <el-select v-model="config.Mode" placeholder="Select Mode">
                <el-option label="Create" value="create"></el-option>
                <el-option label="Join" value="join"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="config.Mode === 'join'" label="Join Address">
              <el-input v-model="config.JoinAddress" type="text" placeholder="Enter Join Address"></el-input>
            </el-form-item>
            <el-form-item v-if="config.Mode === 'join'" label="Join Port">
              <el-input v-model="config.JoinPort" type="number" placeholder="Enter Join Port"></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Timing Configuration">
          <div class="form-group">
            <el-form-item label="Stabilize Time">
              <el-input v-model="config.StabilizeTime" type="number" placeholder="Enter Stabilize Time"></el-input>
            </el-form-item>
            <el-form-item label="Fix Fingers Time">
              <el-input v-model="config.FixFingersTime" type="number" placeholder="Enter Fix Fingers Time"></el-input>
            </el-form-item>
            <el-form-item label="Check Predecessor Time">
              <el-input v-model="config.CheckPredecessorTime" type="number"
                placeholder="Enter Check Predecessor Time"></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Storage Configuration">
          <div class="form-group">
            <el-form-item label="Storage Path">
              <el-input v-model="config.StorageDir" type="text" placeholder="Enter Storage Path"></el-input>
            </el-form-item>
            <el-form-item label="Backup Storage Path">
              <el-input v-model="config.BackupDir" type="text" placeholder="Enter Backup Storage Path"></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Security Configuration">
          <div class="form-group">
            <el-form-item label="AES Enabled">
              <el-select v-model="config.AESBool" placeholder="Select AES">
                <el-option :label="true" :value="true">Enabled</el-option>
                <el-option :label="false" :value="false">Disabled</el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="config.AESBool" label="AES Key Path">
              <el-input v-model="config.AESKeyPath" type="text" placeholder="Enter AES Key Path"></el-input>
            </el-form-item>
            <el-form-item label="TLS Enabled">
              <el-select v-model="config.TLSBool" placeholder="Select TLS">
                <el-option :label="true" :value="true">Enabled</el-option>
                <el-option :label="false" :value="false">Disabled</el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="config.TLSBool" label="CA Certificate Path">
              <el-input v-model="config.CaCert" type="text" placeholder="Enter CA Certificate Path"></el-input>
            </el-form-item>
            <el-form-item v-if="config.TLSBool" label="Server Certificate Path">
              <el-input v-model="config.ServerCert" type="text" placeholder="Enter Server Certificate Path"></el-input>
            </el-form-item>
            <el-form-item v-if="config.TLSBool" label="Server Key Path">
              <el-input v-model="config.ServerKey" type="text" placeholder="Enter Server Key Path"></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-button @click="newNode" :loading="isInitializing" type="primary" class="new-node-button">New Node</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { ElButton, ElCollapse, ElCollapseItem, ElForm, ElFormItem, ElInput, ElMessage, ElOption, ElSelect } from 'element-plus';

export default {
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElButton,
    ElCollapse,
    ElCollapseItem
  },
  data() {
    return {
      config: {
        IdentifierLength: 10,
        SuccessorsLength: 4,
        IpAddress: '127.0.0.1',
        Port: '4170',
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
      isInitializing: false,
      isSuccess: false
    };
  },
  methods: {
    async newNode() {
      try {
        this.isInitializing = true;
        this.isSuccess = false;

        this.config.IdentifierLength = parseInt(this.config.IdentifierLength, 10);
        this.config.SuccessorsLength = parseInt(this.config.SuccessorsLength, 10);
        this.config.StabilizeTime = parseInt(this.config.StabilizeTime, 10);
        this.config.FixFingersTime = parseInt(this.config.FixFingersTime, 10);
        this.config.CheckPredecessorTime = parseInt(this.config.CheckPredecessorTime, 10);

        await axios.post('/new', this.config);
        await axios.get('/initialize');

        ElMessage.success('New node created successfully!');
        this.isSuccess = true;
        this.$emit('nodeCreated', true);
      } catch (err) {
        if (err.response && err.response.data) {
          ElMessage.error(`Failed to create new node: ${err.response.data.error_message}`);
        } else {
          ElMessage.error(`Failed to create new node: ${err.message}`);
        }
        this.$emit('nodeCreated', false);
      } finally {
        if (this.isSuccess) {
          setTimeout(() => {
            this.isInitializing = false;
          }, 5000);
        } else {
          this.isInitializing = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.new-node {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.new-node-button {
  align-self: center;
}

/* Custom style for el-collapse-item */
:deep(.el-collapse-item__header) {
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  margin-bottom: 10px;
}

:deep(.el-collapse-item__wrap) {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
</style>