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
            placeholder="输入数据频道名称"
          />
        </n-form-item>
        <n-form-item>
          <n-button
            attr-type="button"
            style="margin-right: 5px"
            @click="getChannelListData"
          >
            搜索
          </n-button>
          <n-button attr-type="button" @click="handleAdd"> 新增 </n-button>
        </n-form-item>
      </n-form>

      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
      />
    </n-card>
  </div>
  <channel-add-modal ref="channelAddModalRef" @fresh="getChannelListData" />
  <sets-list ref="setsListRef" />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { h } from "vue";
import { NButton, NTag } from "naive-ui";
import { getChannelList, deleteChannel } from "@/api/dataApi";
import channelAddModal from "./components/channelAddModal.vue";
import setsList from "./components/setsList.vue";

const formValue = ref({ name: "" });
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: async (page) => {
    pagination.page = page;
    await getChannelListData();
  },
  onUpdatePageSize: async (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    await getChannelListData();
  },
});
const data = ref([]);
const channelAddModalRef = ref(null);
const setsListRef = ref(null);

const columns = [
  {
    title: "No",
    key: "id",
    width: "150px",
  },
  {
    title: "名称",
    key: "name",
  },
  {
    title: "状态",
    key: "status",
    width: "180px",
    render(row) {
      if (row.status == 1) {
        return h(NTag, { type: "primary" }, { default: () => "启用" });
      } else {
        return h(NTag, { type: "error" }, { default: () => "禁用" });
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
    width: "300px",
    render(row) {
      const edit = h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          type: "info",
          style: { marginRight: "5px" },
          onClick: () => handleEdit(row),
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
          style: { marginRight: "5px" },
          onClick: () => handleDelete(row),
        },
        { default: () => "删除" }
      );

      const sets = h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          type: "primary",
          style: { marginRight: "5px" },
          onClick: () => handOpenSetList(row),
        },
        { default: () => "数据集" }
      );
      return h("div", [sets, edit, del]);
    },
  },
];

const handOpenSetList = async (row) => {
  await setsListRef.value.open(row);
};

const handleEdit = async (row) => {
  channelAddModalRef.value.open(row);
};

const handleDelete = (row) => {
  window["$dialog"].warning({
    title: "警告",
    content: "确定要删除吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const res = await deleteChannel({ id: row.id });
      if (res) {
        getChannelListData();
        window["$message"].success("删除成功");
      }
    },
  });
};

const handleAdd = () => {
  channelAddModalRef.value.open();
};

const getChannelListData = async () => {
  const params = {
    name: formValue.value.name,
    pageSize: pagination.pageSize,
    page: pagination.page,
  };
  const res = await getChannelList(params);
  if (res) {
    data.value = res.data;
  }
};

onMounted(async () => {
  await getChannelListData();
});
</script>

<style lang="scss" scoped></style>
