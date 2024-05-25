<template>
  <n-card>
    <div>
      <n-form ref="formRef" inline :label-width="80" :model="formValue" :size="`small`">
        <n-form-item label="姓名" path="user.name">
          <n-input v-model:value="formValue.name" placeholder="输入姓名" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" @click="handleValidateClick">
            验证
          </n-button>
        </n-form-item>
      </n-form>
    </div>
    <div>
      <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
    </div>
  </n-card>
</template>

<script setup>
import {ref, h} from 'vue';

const formValue = ref({})

const columns = [
  {
    title: "No",
    key: "id"
  },
  {
    title: "用户名",
    key: "username"
  },
  {
    title: "注册时间",
    key: "created_at"
  },
  {
    title: "状态",
    key: "status"
  },
  {
    title: "动作",
    key: "action"
  },
]
</script>

<style scoped></style>