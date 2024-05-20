<template>
  <n-card>
    <n-flex>
      <div class="left">
        <n-form
          ref="formRef"
          inline
          label-placement="left"
          label-width="auto"
          :model="formValue"
          :size="`small`"
        >
          <n-form-item label="名称">
            <n-input v-model:value="formValue.name" placeholder="输入名称" />
          </n-form-item>
          <n-form-item label="类型">
            <n-select
              v-model:value="formValue.type"
              :options="options"
              style="width: 150px"
            />
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="handleSearch"> 搜索 </n-button>
          </n-form-item>
        </n-form>
      </div>
      <div class="right">
        <n-button attr-type="button" size="small" @click="openAddModal">
          新增
        </n-button>
      </div>
    </n-flex>

    <div>
      <table-component ref="tableRef" />
    </div>
  </n-card>
  <add-modal ref="addModalRef" />
</template>

<script setup>
import { ref } from "vue";
import addModal from "./components/addModal.vue";
import { useDataSourceHook } from "./hooks/dataSource.hook";
import tableComponent from "./components/table.vue";

const { options, addModalRef } = useDataSourceHook();

const tableRef = ref(null);

const formValue = ref({
  name: "",
  value: "",
});

const handleSearch = () => {
  tableRef.value?.search(formValue.value);
};

const openAddModal = () => {
  addModalRef.value?.open();
};
</script>

<style lang="scss" scoped></style>
