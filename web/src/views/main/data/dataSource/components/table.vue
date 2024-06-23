<template>
  <n-flex>
    <div class="left">
      <n-form ref="formRef" inline label-placement="left" label-width="auto" :model="formValue" :size="`small`">
        <n-form-item label="名称">
          <n-input v-model:value="formValue.name" placeholder="输入名称" />
        </n-form-item>
        <n-form-item label="类型">
          <n-select v-model:value="formValue.type" :options="options" style="width: 150px" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" ghost @click="handleSearch"> 搜索 </n-button>
        </n-form-item>
      </n-form>
    </div>
    <div class="right">
      <n-button attr-type="button" type="primary" ghost size="small" @click="openAddModal">
        新增
      </n-button>
    </div>
  </n-flex>
  <n-data-table :columns="columns" :data="data" :bordered="false" />

  <div style="margin-top: 20px;display: flex; justify-content: end;">
    <n-pagination :item-count="pagination.itemCount" :page-sizes="pagination.pageSizes"
      :on-update:page="pagination.onChange" :on-update:page-size="pagination.onUpdatePageSize"
      show-size-picker />
  </div>

  <add-modal ref="addModalRef" @fresh="getDataList" />
</template>

<script setup>
import { onMounted, h, ref, reactive, nextTick } from "vue";
import { deleteDataSource, testDataSourceConn } from "@/api/dataApi";
import { useDataSourceHook } from "../hooks/dataSource.hook";
import { NButton, NTag } from "naive-ui";
import { getDataSourceList } from "@/api/dataApi";
import addModal from "./addModal.vue";

const { options } = useDataSourceHook();

const data = ref([])
const addModalRef = ref(null)
const formValue = ref({
  name: "",
  value: "",
});

const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  itemCount: 10,
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

const getDataList = async (value) => {
  let res = null;
  const params = {
    page: pagination.page,
    pageSize: pagination.pageSize,
  };
  if (value) {
    params.type = value.type;
    params.name = value.name;
  }
  res = await getDataSourceList(params);
  if (res && res.code == 200) {
    pagination.itemCount = res.total
    data.value = res.data;
  }
};

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
    title: "类型",
    key: "type",
  },
  {
    title: "连通性",
    key: "conn_status",
    render(row) {
      if (row.conn_status == 1) {
        return h(
          NTag,
          {
            type: "success",
          },
          { default: () => "正常" }
        );
      } else if (row.conn_status == 0) {
        return h(
          NTag,
          {
            type: "error",
          },
          { default: () => "错误" }
        );
      } else {
        return h(NTag, { type: "warning" }, { default: () => "未知" });
      }
    },
  },

  {
    title: "状态",
    key: "status",
    render(row) {
      if (row.status == 1) {
        return h(
          NTag,
          {
            type: "success",
          },
          { default: () => "启用" }
        );
      } else if (row.status == 0) {
        return h(
          NTag,
          {
            type: "error",
          },
          { default: () => "禁用" }
        );
      } else {
        return h(NTag, { type: "warning" }, { default: () => "未知" });
      }
    },
  },
  {
    title: "创建时间",
    key: "created_at",
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
      const test_connt = h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          style: { marginRight: "5px" },
          onClick: () => hanleTestConn(row),
        },
        { default: () => "测试连接" }
      )
      const edit = h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          style: { marginRight: "5px" },
          onClick: () => handleOpenAddModal(row),
        },
        { default: () => "编辑" }
      );
      const del = h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          type: "error",
          onClick: () => handleDel(row),
        },
        { default: () => "删除" }
      );
      return h(
        "div",
        {
          style: {
            display: "flex",
          },
        },
        { default: () => [test_connt, edit, del] }
      );
    },
  },
];

const hanleTestConn = async (row) => {
  const res = await testDataSourceConn({ id: row.id });
  if (res.code == 200) {
    window["$message"].success("测试连接成功");
  } else {
    window["$message"].error("测试连接失败");
  }

  nextTick(async () => {
    await getDataList();
  });
}


const handleOpenAddModal = (value) => {
  addModalRef.value?.open(value);
};

const handleDel = async (row) => {
  window["$dialog"].warning({
    title: "警告",
    content: "确定要删除吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const res = await deleteDataSource({ id: row.id });
      if (res.code == 200) {
        getDataList();
        window["$message"].success("删除成功");
      }
    },
  });
};

const handleSearch = async () => {
  await search(formValue.value);
};

const openAddModal = () => {
  addModalRef.value?.open();
};


const search = async (value) => {
  getDataList(value);
};

onMounted(() => {
  getDataList();
});

defineExpose({ search });
</script>
@/api/dataApi