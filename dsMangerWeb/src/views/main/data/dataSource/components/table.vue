<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
  />

  <add-modal ref="addModalRef" @fresh="getDataList" />
</template>

<script setup>
import { onMounted, h } from "vue";
import { deleteDataSource } from "@/api";
import { useDataSourceHook } from "../hooks/dataSource.hook";
import { NButton, NTag } from "naive-ui";
import addModal from "./addModal.vue";

const { data, pagination, getDataList, addModalRef } = useDataSourceHook();

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
      if (row.conn_status == true) {
        return h(
          NTag,
          {
            type: "success",
          },
          { default: () => "正常" }
        );
      } else if (row.conn_status == false) {
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
    title: "创建时间",
    key: "created_at",
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
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
        { default: () => [edit, del] }
      );
    },
  },
];

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

const search = async (value) => {
    getDataList(value);
};

onMounted(() => {
  getDataList();
});

defineExpose({ search });
</script>
