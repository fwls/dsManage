<template>
  <n-modal v-model:show="showModal" preset="card" title="Dialog" style="width: 500px;">
    <template #header>
      <div>数据频道管理</div>
    </template>

    <n-form
      ref="formRef"
      :label-width="80"
      label-position="left"
      :model="formValue"
      :rules="rules"
      size="small"
    >
      <n-form-item label="名称" path="name">
        <n-input
          v-model:value="formValue.name"
          maxlength="30"
          placeholder="输入数据频道名称"
        />
      </n-form-item>
      <n-form-item label="备注" path="remark">
        <n-input
          v-model:value="formValue.remark"
          maxlength="120"
          placeholder="输入数据频道备注"
        />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-select
          v-model:value="formValue.status"
          :options="statusOptions"
          placeholder="请选择数据频道状态"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <n-flex justify="end">
        <n-button ghost @click="close">取消</n-button>
        <n-button type="primary" ghost @click="handleValidateClick"
          >确定</n-button
        >
      </n-flex>
    </template>
  </n-modal>
</template>

<script lang="js" setup>
import { ref } from 'vue'
import { addChannel, editChannel, getChannelDetail } from '@/api/dataApi';

const emit = defineEmits(['fresh']);

const showModal = ref(false)
const formRef = ref(null)
const formValue = ref({
  name: '',
  remark: '',
  status: 1
})

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

const getDetail = async (value) => {
  const res = await getChannelDetail({ id: value.id })
  if(res && res.code == 200) {
    formValue.value = res.data
  }
}

const handleValidateClick = async (e) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let res = null;
      if(formValue.value.id) {
        res = await editChannel(formValue.value);
      }else{
        res = await addChannel(formValue.value);
      }
      if (res && res.code == 200) {
        window['$message'].success("操作成功");
        await close()
        emit('fresh')
      }
    }
  });
}

const open = async (value) => {
  if(value){
    await getDetail(value)
  }
  showModal.value = true
}

const close = async () => {
  formValue.value = {
    name: '',
    remark: '',
    status: 1
  }
  showModal.value = false
}

defineExpose({ open, close })
</script>
