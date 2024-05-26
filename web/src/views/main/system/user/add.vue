<template>
  <n-modal v-model:show="showModal" class="custom-card" preset="card" style="width:600px;" title="用户管理" size="huge"
    :bordered="false">
    <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto"
      require-mark-placement="right-hanging" :size="`small`" :style="{
        maxWidth: '600px'
      }">
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="model.username" :disabled="model.id != null ? true : false" placeholder="用户名" required />
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="model.email" placeholder="邮箱" type="email" required />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="model.password" placeholder="密码" type="password"  />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-select v-model:value="model.status" :options="statusOptions" required />
      </n-form-item>
    </n-form>

    <template #footer>
      <n-flex justify="end">
        <n-button ghost @click="close">
          取消
        </n-button>
        <n-button type="primary" ghost @click="handleSubmit">
          确认
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { getUserDetail, addUser, editUser } from '@/api/user';

const emit = defineEmits(['fresh']);

const model = reactive({
  id: null,
  username: '',
  password: '',
  email: '',
  status: 1
})

const showModal = ref(false);
const formRef = ref(null)

const statusOptions = [
  {
    label: "启用",
    value: 1,
  },
  {
    label: "禁用",
    value: 0,
  },
]

const rules = {
  username: {
    required: true,
    message: '请输入用户名'
  },
  password: {
    required: model.id != null ? true : false,
    message: '请输入密码'
  },
  email: {
    required: model.id != null ? true : false,
    message: '请输入邮箱'
  },
  status: {
    required: true,
    message: '请选择状态'
  }
}

const open = (value) => {
  if (value) {
    getUserDetail({ id: value.id }).then(res => {
      if (res && res.code == 200) {
        model.username = res.data.username
        model.email = res.data.email
        model.status = res.data.status
        model.id = res.data.id
      }
    })
  }
  showModal.value = true;
};

const close = () => {
  showModal.value = false;

  model.username = ''
  model.password = ''
  model.email = ''
  model.status = 1
}

const handleSubmit = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      if (model.id != null) {
        editUser(model).then(res => {
          if (res && res.code == 200) {
            window["$message"].success("操作成功");
            emit("fresh");
            close();
          }
        })
      } else {
        addUser(model).then(res => {
          if (res && res.code == 200) {
            window["$message"].success("操作成功");
            emit("fresh");
            close();
          }
        })
      }
    }
  })
};

defineExpose({ open, close });
</script>