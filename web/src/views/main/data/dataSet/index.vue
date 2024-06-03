<template>
  <div>
    <n-card>
      <n-form
        ref="formRef"
        inline
        label-placement="left"
        label-width="auto"
        :model="formValue"
        :size="`small`"
      >
        <n-form-item label="名称" path="name">
          <n-input
            v-model:value="formValue.name"
            placeholder="输入数据集名称"
          />
        </n-form-item>
        <n-form-item>
          <n-button
            attr-type="button"
            style="margin-right: 5px"
            @click="handleSearch"
          >
            验证
          </n-button>
          <n-button attr-type="button" type="primary" @click="handleAdd"> 新增 </n-button>
        </n-form-item>
      </n-form>

      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
      />

      <div style="margin-top: 20px;display: flex; justify-content: end;">
      <n-pagination :item-count="pagination.itemCount" :page-sizes="pagination.pageSizes"
        :on-update:page="pagination.onChange" :on-update:page-size="pagination.onUpdatePageSize" show-size-picker />
    </div>
    </n-card>

    <jsonPreviewResult :value="jsonValue" ref="jsonPreviewRef" />
  </div>
</template>

<script setup>
import { ref, h, onMounted, reactive } from "vue";
import { NButton, NTag } from "naive-ui";
import { useRouter } from "vue-router";
import { getDataSetList, testDataSet } from "@/api/dataApi";
import jsonPreviewResult from "@/views/main/data/components/jsonPreviewResult.vue";

const router = useRouter();

const formValue = ref({ name: "" });
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: async (page) => {
    pagination.page = page;
    await getList();
  },
  onUpdatePageSize: async (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    await getList();
  },
});
const data = ref([]);
const jsonPreviewRef = ref(null);
const jsonValue = ref({});

const columns = [
  {
    title: "No",
    key: "id",
    width: "120px",
  },
  {
    title: "名称",
    key: "name",
  },
  {
    title: "数据源",
    key: "data_sources_name",
    // render(row) {
    //   return h(NTag, {}, { default: () => row.data_sources_name });
    // },
  },
  {
    title: "状态",
    key: "status",
    width: "120px",
    render(row) {
      if (row.status == 1) {
        return h(
          NTag,
          {
            type: "success",
          },
          { default: () => "启用" }
        );
      } else {
        return h(
          NTag,
          {
            type: "error",
          },
          { default: () => "禁用" }
        );
      }
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
    width: "200px",
    render(row) {
      const edit = h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          type: "info",
          style: "margin-right: 5px",
          onClick: () => handleEdit(row),
        },
        { default: () => "编辑" }
      );
      const test = h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          type: "primary",
          style: "margin-right: 5px",
          onClick: () => handleTest(row),
        },
        { default: () => "测试" }
      );
      const del = h(
        NButton,
        {
          strong: true,
          tertiary: true,
          type: "error",
          size: "small",
          style: "margin-right: 5px",
          onClick: () => handleDelete(row),
        },
        { default: () => "删除" }
      );
      return h("div", [edit, test, del]);
    },
  },
];

const handleSearch = () => {};

const handleAdd = () => {
  router.push({ name: "dataSetAdd" });
};

const handleEdit = (row) => {
  router.push({ name: "dataSetAdd", query: { id: row.id } });
};

const handleDelete = (row) => {
  window["$dialog"].warning({
    title: "警告",
    content: "确定要删除吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const res = await deleteDataSet({ id: row.id });
      if (res.code == 200) {
        getList();
        window["$message"].success("删除成功");
      }
    },
  });
};

const handleTest = async (row) => {
  const res = await testDataSet(row);
  if (res && res.code == 200) {
    jsonValue.value = res.data;
    jsonPreviewRef.value.open();
  }
};

const getList = async () => {
  const params = {
    pageSize: pagination.pageSize,
    page: pagination.page,
    name: formValue.name,
  };
  getDataSetList(params).then((res) => {
    if (res) {
      pagination.itemCount = res.total;
      data.value = res.data;
    }
  });
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped></style>
