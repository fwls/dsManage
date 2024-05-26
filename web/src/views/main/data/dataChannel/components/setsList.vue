<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    title="频道数据集"
    :bordered="false"
    :segmented="segmented"
    style="width: 56vw; min-height: 75vh;"
  >
    <n-form
      ref="formRef"
      inline
      label-placement="left"
      :model="formValue"
      :size="`small`"
    >
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入名称" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" ghost @click="getDataList" style="margin-right: 10px">
          搜索
        </n-button>
        <n-button attr-type="button" type="primary" ghost @click="handleOpenAddSetModal">
          新增
        </n-button>
      </n-form-item>
    </n-form>

    <n-data-table
      :columns="columns"
      :data="data"
      size="small"
      :pagination="pagination"
      :bordered="false"
    />

    <template #footer>
      <n-flex justify="end">
        <n-button attr-type="button" @click="close"> 关闭 </n-button>
      </n-flex>
    </template>
  </n-modal>

  <add-set ref="addSetRef" @fresh="getDataList" />
  <jsonPreviewResult :value="jsonValue" ref="jsonPreviewRef" />
</template>

<script setup>
import { ref, reactive, h, onMounted, nextTick } from "vue";
import { NButton, NTag } from "naive-ui";
import jsonPreviewResult from "@/views/main/data/components/jsonPreviewResult.vue";
import { getChannelDataSetList, testDataSet, deleteChannelDataSet } from "@/api/dataApi";
import addSet from "./addSet.vue";

const showModal = ref(false);
const segmented = { content: true, footer: true };
const data = ref([]);
const formValue = ref({});
const currDataChannel = ref({});
const formRef = ref(null);
const addSetRef = ref(null);
const jsonPreviewRef = ref(null);
const jsonValue = ref({});
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: async (page) => {
    pagination.page = page;
    await getDataList();
  },
  onUpdatePageSize: async (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    await getDataList();
  },
});

const columns = [
  {
    title: "No",
    key: "id",
  },
  {
    title: "名称",
    key: "name",
  },
  {
    title: "状态",
    key: "status",
    width: "120px",
    render(row) {
      return h(
        NTag,
        {
          type: row.status == 1 ? "info" : "error",
          size: "small",
        },
        { default: () => row.status == 1 ? "启用" : "禁用" }
      );
    },
  },
  {
    title: "创建时间",
    key: "created_at",
    width: "180px",
  },
  {
    title: "操作",
    key: "actions",
    width: "220px",
    render(row) {
      const test =  h(
        NButton,
        {
          strong: true,
          tertiary: true,
          type: "primary",
          size: "small",
          style: "margin-right: 5px",
          onClick: () => handleTest(row),
        },
        { default: () => "测试" }
      );
      const edit =  h(
        NButton,
        {
          strong: true,
          tertiary: true,
          type: "info",
          size: "small",
          style: "margin-right: 5px",
          onClick: () => handleEdit(row),
        },
        { default: () => "编辑" }
      );
      const del =  h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          type: "error",
          style: "margin-right: 5px",
          onClick: () => handleDelete(row),
        },
        { default: () => "删除" }
      );
      return h(
        "div",{ style: {
          display: "flex",
          justContent: "space-between",
        }}, [test, edit , del]
      )

    },
  },
];

const getDataList = async () => {
  const params = {
    pageSize: pagination.pageSize,
    page: pagination.page,
    data_channel_id: currDataChannel.value.id,
  };
  if (formValue.value.name) {
    params.name = formValue.value.name;
  }
  const res = await getChannelDataSetList(params);
  if (res.code == 200) {
    data.value = res.data;
  }
};

const handleTest = async (row) => {
  const res = await testDataSet({id: row.data_set_id});
  if (res && res.code == 200) {
    jsonValue.value = res.data;
    jsonPreviewRef.value.open();
  }
};

const handleEdit = (row) => {
  addSetRef.value.open(currDataChannel.value, row);
};

const handleDelete = (row) => {
  window["$dialog"].warning({
    title: "警告",
    content: "确定要删除吗?",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const res = await deleteChannelDataSet({ id: row.id });
      if (res.code == 200) {
        getDataList();
        window["$message"].success("删除成功");
      }
    },
  });
};

const handleOpenAddSetModal = () => {

  addSetRef.value.open(currDataChannel.value, null);
};

const open = (value) => {
  showModal.value = true;
  currDataChannel.value = value;
  nextTick(() => {
    getDataList();
  })
};

const close = () => {
  showModal.value = false;
};

defineExpose({ open, close });

onMounted(() => {

});
</script>
