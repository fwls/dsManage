<template>
  <n-modal v-model:show="showModal" preset="card" title="数据源管理" style="width: 500px">
    <div>
      <n-form ref="formRef" :model="model" label-placement="left" label-width="auto" size="small" :style="{
        maxWidth: '640px',
      }">
        <n-form-item label="名称" path="name">
          <n-input v-model:value="model.name" placeholder="数据源名称" />
        </n-form-item>
        <n-form-item label="类型" path="type">
          <n-select v-model:value="model.type" placeholder="数据源类型" :options="options" />
        </n-form-item>
        <n-form-item label="地址" path="url" v-if="language == 'sql'">
          <n-input v-model:value="model.url" placeholder="数据源地址" />
        </n-form-item>
        <n-form-item label="端口" path="port" v-if="language == 'sql'">
          <n-input v-model:value="model.port" placeholder="数据源端口" />
        </n-form-item>
        <n-form-item label="用户名" path="username" v-if="language == 'sql'">
          <n-input v-model:value="model.username" placeholder="数据源账户" />
        </n-form-item>
        <n-form-item label="密码" path="password" v-if="language == 'sql'">
          <n-input v-model:value="model.password" placeholder="数据源密码" />
        </n-form-item>
        <n-form-item label="数据库名称" path="database" v-if="language == 'sql'">
          <n-input v-model:value="model.database" placeholder="数据库名称" />
        </n-form-item>
        <n-form-item label="字符集" path="charset" v-if="language == 'sql'">
          <n-input v-model:value="model.charset" placeholder="数据源字符集(utf8)" />
        </n-form-item>
        <n-form-item label="状态" path="status">
          <n-switch v-model:value="model.status" />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-flex justify="end">
        <n-button @click="handleTestConn" ghost size="small" v-show="model.id">测试连接</n-button>
        <n-button @click="close" ghost size="small">取消</n-button>
        <n-button @click="handleSubmit" ghost size="small">确定</n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  addDataSource,
  editDataSource,
  getDataSourceDetail,
} from "@/api/dataApi";
import { useDataSourceHook } from "../hooks/dataSource.hook";

const { options } = useDataSourceHook();

const emit = defineEmits(["fresh"]);

const showModal = ref(false);
const model = ref({});
const language = ref("javascript");

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
  } else {
    res = await addDataSource(model.value);
  }
  if (res && res.code == 200) {
    window["$message"].success(res.msg);
    setTimeout(() => {
      close();
      // window.location.reload();
      emit("fresh");
    });
  }
};

const handleTestConn = () => {
  window["$message"].success("测试成功");
};

defineExpose({ open, close });

watch(
  () => model.value.type,
  (newValue) => {
    if(newValue){
      if (newValue.includes("javascript")) {
      language.value = "javascript";
    } else if (newValue === "json") {
      language.value = "json";
    } else if (newValue.includes("sql")) {
      language.value = "sql";
    }
    }
  }
);
</script>
@/api/dataApi
