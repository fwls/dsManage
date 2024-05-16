<template>
  <n-card>
    <n-form
      ref="formRef"
      :label-width="80"
      label-position="left"
      :model="formValue"
      :rules="rules"
      :size="`small`"
    >
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入数据源名称" />
      </n-form-item>
      <n-form-item label="类型" path="type">
        <n-select
          v-model:value="formValue.type"
          placeholder="数据源类型"
          :options="options"
        />
      </n-form-item>

      <n-form-item label="数据源" path="data_source_id">
        <n-select
          filterable
          v-model:value="formValue.data_source_id"
          :options="dataSourceOptions"
        />
      </n-form-item>
      <n-form-item
        :label="formValue.type == 'javascript' ? '脚本' : 'SQL'"
        path="content"
      >
        <!-- <monaco-editor
          v-model:modelValue="formValue.content"
          v-if="language == 'javascript'"
          :language="`javascript`"
          :height="`240px`"
          :width="`100%`"
          :editorOptions="{
            lineNumbers: 'on',
            minimap: { enabled: true },
          }"
        /> -->
        <monaco-editor
          v-model:modelValue="formValue.content"
          v-if="language == 'javascript'"
          language="javascript"
        />
        <monaco-editor
          v-model:modelValue="formValue.content"
          v-if="language == 'json'"
          language="json"
        />
        <monaco-editor
          v-model:modelValue="formValue.content"
          v-if="language == 'sql'"
          language="sql"
        />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-select v-model:value="formValue.status" :options="statusOptions" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="handleValidateClick">
          提交
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
// import { MonacoEditor } from "@/components/Pages/MonacoEditor";
import MonacoEditor from "@/components/monacoEditor/index.vue";
import { useDataSourceHook } from "@/views/main/data/dataSource/hooks/dataSource.hook";
import { getDataSourceList } from "@/api/dataApi";

const { options } = useDataSourceHook();

const language = ref("javascript");
const formRef = ref(null);
const dataSourceOptions = ref([]);
const formValue = ref({
  name: "",
  type: "javascript",
  content: "",
  data_source_id: "",
  status: 1,
});

const statusOptions = [
  {
    label: "启用",
    value: 1,
  },
  {
    label: "禁用",
    value: 0,
  },
];

const rules = {
  name: {
    required: true,
    message: "请输入数据集名称",
    trigger: "blur",
  },
  type: {
    required: true,
    message: "请输入数据集类型",
    trigger: "blur",
  },
  data_source_id: {
    required: true,
    message: "请输入数据集所属数据源",
  },
  content: {
    required: true,
    message: "请输入数据集内容",
  },
};

const handleValidateClick = async (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(formValue.value);
      // window["$message"].success("Valid");
    } else {
      console.log(errors);
      // window["$message"].error("Invalid");
    }
  });
};

const getDataSourceOptions = () => {
  getDataSourceList().then((res) => {
    if (res) {
      res.data.map((item) => {
        dataSourceOptions.value.push({
          label: item.name,
          value: item.id,
        });
      });
    }
  });
};

watch(
  () => formValue.value.type,
  (newValue) => {
    if (newValue === "javascript") {
      language.value = "javascript";
    } else if (newValue === "json") {
      language.value = "json";
    } else if (newValue.includes("sql")) {
      language.value = "sql";
    }

    console.log(newValue, language.value);
  }
);

onMounted(() => {
  getDataSourceOptions();
});
</script>

<style lang="scss" scoped></style>
