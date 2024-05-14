<template>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>数据源管理</div>
    </template>
    <div>
      <n-form
        ref="formRef"
        :model="model"
        label-placement="left"
        label-width="auto"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item label="名称" path="name">
          <n-input v-model:value="model.name" placeholder="数据源名称" />
        </n-form-item>
        <n-form-item label="类型" path="type">
          <n-select
            v-model:value="model.type"
            placeholder="数据源类型"
            :options="options"
          />
        </n-form-item>
        <n-form-item label="地址" path="url">
          <n-input v-model:value="model.url" placeholder="数据源地址" />
        </n-form-item>
        <n-form-item label="端口" path="port">
          <n-input v-model:value="model.port" placeholder="数据源端口" />
        </n-form-item>
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="model.username" placeholder="数据源账户" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="model.password" placeholder="数据源密码" />
        </n-form-item>
        <n-form-item label="数据库名称" path="database">
          <n-input v-model:value="model.database" placeholder="数据库名称" />
        </n-form-item>
        <n-form-item label="字符集" path="charset">
          <n-input
            v-model:value="model.charset"
            placeholder="数据源字符集(utf8)"
          />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-flex>
        <n-button @click="handleTestConn" v-show="model.id">测试连接</n-button>
        <n-button @click="handleSubmit">提交</n-button>
        <n-button @click="close">关闭</n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<script setup>
import { ref } from "vue";
import { addDataSource, editDataSource, getDataSourceDetail } from "@/api";
import { useDataSourceHook } from "../hooks/dataSource.hook";

const { options } = useDataSourceHook();

const emit = defineEmits(["fresh"]);

const showModal = ref(false);
const model = ref({});

const open = async (value) => {
  showModal.value = true;
  if (!value) {
    model.value = {};
  } else {
    model.value = value;
    const res = await getDataSourceDetail({ id: value.id });
    if (res && res.code == 200) {
      model.value = res.data;
    }
  }
};

const close = () => {
  showModal.value = false;
};

const handleSubmit = async () => {
  let res = null;
  if (model.value.id) {
    res = await editDataSource(model.value);
    emit("fresh");
  } else {
    res = await addDataSource(model.value);
  }
  if (res && res.code == 200) {
    window["$message"].success(res.msg);
    setTimeout(() => {
      close();
    });
  }
};

const handleTestConn = () => {
  window["$message"].success("测试成功");
};

defineExpose({ open, close });
</script>
