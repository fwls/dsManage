<template>
  <n-card>
    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="age">
        <n-input v-model:value="formValue.age" placeholder="输入年龄" />
      </n-form-item>
      <n-form-item label="类型" path="type">
          <n-select
            v-model:value="formValue.type"
            placeholder="数据源类型"
            :options="options"
          />
        </n-form-item>
      <n-form-item label="电话号码" path="phone">
        <n-input v-model:value="formValue.phone" placeholder="电话号码" />
      </n-form-item>
      <n-form-item label="content" path="content">
        <n-input v-model:value="formValue.content" type="textarea" placeholder="content" />
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
import { ref } from "vue";
import { useDataSourceHook } from "@/views/main/data/dataSource/hooks/dataSource.hook";

const { options } = useDataSourceHook();

const formRef = ref(null);
const formValue = ref({
  name: "",
  age: "",
  phone: "",
  content: ''
});

const rules = {
  name: {
    required: true,
    message: "请输入姓名",
    trigger: "blur",
  },
};

const handleValidateClick = async (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success("Valid");
    } else {
      console.log(errors);
      message.error("Invalid");
    }
  });
};
</script>

<style lang="scss" scoped></style>
