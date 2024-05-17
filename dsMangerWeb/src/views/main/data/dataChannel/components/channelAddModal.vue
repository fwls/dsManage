<template>
  <n-button @click="showModal = true">  </n-button>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>数据频道添加</div>
    </template>

    <n-form ref="formRef" :label-width="80" label-position="left" :model="formValue" :rules="rules" :size="size">
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formValue.name" maxlength="30" placeholder="输入数据频道名称" />
      </n-form-item>
      <n-form-item label="备注" path="remark">
        <n-input v-model:value="formValue.remark" maxlength="120" placeholder="输入数据频道备注" />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-select v-model:value="formValue.status" :options="statusOptions" placeholder="请选择数据频道状态"/>
      </n-form-item>
    </n-form>

    <template #action>
      <n-flex justify="end">
        <n-button @click="close">取消</n-button>
        <n-button type="primary" @click="close">确定</n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<script lang="js" setup>
import { ref } from 'vue'

const showModal = ref(false)
const formRef = ref(null)
const formValue = ref({})

const rules = {
  name: {
    required: true,
    message: "请输入数据频道名称",
    trigger: "blur"
  },
  remark: {
    required: true,
    message: "请输入数据频道备注",
  },
  status: {
    required: true,
    message: "请选择数据频道状态",
  },
}

const statusOptions = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '禁用',
    value: 0,
  }
]

const handleValidateClick = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      window['$message'].success("Valid");
    } else {
      console.log(errors);
      window['$message'].error("Invalid");
    }
  });
}

const open = () => {
  showModal.value = true
}

const close = () => {
  showModal.value = false
}

defineExpose({ open, close })
</script>
