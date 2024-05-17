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
          <n-button attr-type="button" style="margin-right: 5px;" @click="handleSearch"> 验证 </n-button>
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

    <channel-add-modal  ref="channelAddModalRef"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { h } from "vue";
import { NButton } from "naive-ui";
import channelAddModal from "./components/channelAddModal.vue";

const formValue = ref({ name: "" });
const pagination = ref({ pageSize: 10 });
const data = ref([]);
const channelAddModalRef = ref(null)

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
    title: "操作",
    key: "actions",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => () => {},
        },
        { default: () => "Play" }
      );
    },
  },
];

const handleSearch = () => {};

const handleAdd = () => {
  channelAddModalRef.value.open()
}
</script>

<style lang="scss" scoped></style>
