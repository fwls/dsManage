<template>
  <n-card>
    <n-form ref="formRef" :label-width="80" label-position="left" :model="formValue" :rules="rules" :size="`small`"
      style="padding: 0 10vw">
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入数据源名称" />
      </n-form-item>
      <n-form-item label="类型" path="data_sources_type">
        <n-select v-model:value="formValue.data_sources_type" placeholder="数据源类型" :options="options" />
      </n-form-item>

      <n-form-item label="数据源" path="data_source_id">
        <n-select filterable v-model:value="formValue.data_source_id" :options="dataSourceOptions" />
      </n-form-item>
      <n-form-item :label="language == 'javascript' ? '脚本' : 'SQL'" path="content">
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
        <monaco-editor v-model:modelValue="formValue.content" v-if="language == 'javascript'" language="javascript" />
        <monaco-editor v-model:modelValue="formValue.content" v-if="language == 'json'" language="json" />
        <monaco-editor v-model:modelValue="formValue.content" v-if="language == 'sql'" language="sql" />
      </n-form-item>
      <n-form-item >
        <n-space>
          <n-tag type="success" @click="handleClick(`jsvm`)" style="cursor: pointer;">插入js(沙盒)代码示例</n-tag>
          <n-tag type="success" @click="handleClick(`jscus`)" style="cursor: pointer;">插入js(高级)代码示例</n-tag>
          <n-tag type="success" @click="handleClick(`jsvmHttp`)" style="cursor: pointer;">插入js(高级)Http代码示例</n-tag>
        </n-space>
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-select v-model:value="formValue.status" :options="statusOptions" />
      </n-form-item>
      <n-form-item>
        <n-flex justify="center" style="width: 100%">
          <n-button attr-type="button" type="error" ghost @click="handleGoBack" style="margin-right: 10px">
            取消
          </n-button>

          <n-button attr-type="button" type="info" ghost @click="handleTest" style="margin-right: 10px">
            测试
          </n-button>
          <n-button attr-type="button" type="primary" ghost @click="handleValidateClick">

            提交
          </n-button>
        </n-flex>
      </n-form-item>
    </n-form>
  </n-card>
  <jsonPreviewResult :value="jsonValue" ref="jsonPreviewRef" />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { cloneDeep } from 'lodash'
// import { MonacoEditor } from "@/components/Pages/MonacoEditor";
import MonacoEditor from "@/components/MonacoEditor/index.vue";
import jsonPreviewResult from "@/views/main/data/components/jsonPreviewResult.vue";
import { useDataSourceHook } from "@/views/main/data/dataSource/hooks/dataSource.hook";
import {
  getDataSourceList,
  getDataSetDetail,
  addDataSet,
  editDataSet,
  testDataSet,
} from "@/api/dataApi";

const route = useRoute();
const router = useRouter();

const { options } = useDataSourceHook();

const language = ref("javascript");
const formRef = ref(null);
const jsonPreviewRef = ref(null);
const jsonValue = ref({});
const dataSourceOptions = ref([]);
const formValue = ref({
  name: "",
  data_sources_type: "",
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
  data_sources_type: {
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
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const id = route.query.id;
      let res = null;
      if (id) {
        res = await editDataSet(formValue.value);
      } else {
        res = await addDataSet(formValue.value);
      }
      if (res && res.code == 200) {
        window["$message"].success("操作成功");
        router.push({ name: "dataSet" });
      }
    }
  });
};

const handleTest = async (e) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const parmas = cloneDeep(formValue.value);
      delete parmas.id;
      const res = await testDataSet(parmas);
      if (res && res.code == 200) {
        // console.log(res);
        // jsonPreviewRef.value.open(JSON.stringify(res.data));
        jsonValue.value = res.data;
        jsonPreviewRef.value.open();
      }
    }
  });
};

const getDataSourceOptions = async () => {
  const res = await getDataSourceList({ status: 1 });
  if (res) {
    res.data.map((item) => {
      dataSourceOptions.value.push({
        label: item.name,
        value: item.id,
      });
    });
  }
};

const getDatail = async () => {
  const id = route.query.id;
  if (id) {
    const res = await getDataSetDetail({ id: id });
    if (res) {
      formValue.value = res.data;
    }
  }
};

const handleClick = (key) => {
  switch (key) {
    case 'jsvm':
      formValue.value.content = `function main(){
                return {
                    value: "ok1"
                }
            }
            main()`
      break;
    case 'jscus':
      formValue.value.content = `console.log("hello world")`
      break;
    case 'jsvmHttp':
      formValue.value.content = `fetch('http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome')
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => console.error('Error:', error));
`
      break;
    default:
      break;
  }
};

watch(
  () => formValue.value.data_sources_type,
  (newValue) => {
    if (newValue.includes("javascript")) {
      language.value = "javascript";
    } else if (newValue === "json") {
      language.value = "json";
    } else if (newValue.includes("sql")) {
      language.value = "sql";
    }
  }
);

const handleGoBack = () => {
  router.go(-1);
}

onMounted(async () => {
  await getDataSourceOptions();
  await getDatail();
});
</script>

<style lang="scss" scoped></style>
