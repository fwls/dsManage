<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    title="频道数据集管理"
    :bordered="false"
    :segmented="segmented"
    style="width: 500px;"
  >
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :size="`small`"
      :style="{
        maxWidth: '500px',
      }"
    >
      <n-form-item label="名称" path="name">
        <n-input
          v-model:value="formValue.name"
          placeholder="请选择频道数据集名称"
        />
      </n-form-item>
      <n-form-item label="数据集" path="data_set_id">
        <n-select
          filterable
          v-model:value="formValue.data_set_id"
          placeholder="请选择数据集"
          :options="dataSetOptions"
        />
      </n-form-item>
      <n-form-item label="推送方式" path="push_type">
        <n-select
          v-model:value="formValue.push_type"
          :options="pushTypeOptions"
          placeholder="请选择频道数据集推送方式"
        />
      </n-form-item>
      <n-form-item label="推送间隔" path="push_cron">
        <n-input
          v-model:value="formValue.push_cron"
          placeholder="请选择频道数据集间隔"
        />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-select
          v-model:value="formValue.status"
          :options="statusOptions"
          placeholder="请选择频道数据集状态"
        />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-flex justify="end">
        <n-button attr-type="button" @click="handleTest"> 测试 </n-button>
        <n-button attr-type="button" @click="close"> 取消 </n-button>
        <n-button attr-type="button" @click="handleValidateButtonClick">
          确定
        </n-button>
      </n-flex>
    </template>
  </n-modal>

  <jsonPreviewResult :value="jsonValue" ref="jsonPreviewRef" />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import jsonPreviewResult from "@/views/main/data/components/jsonPreviewResult.vue";
import {
  getDataSetList,
  editChannelDataSet,
  addChannelDataSet,
  testDataSet,
  getDataChannelSetDetail,
} from "@/api/dataApi";

const emit = defineEmits(["fresh"]);

const props = defineProps({
  dataChannel: {
    type: Object,
    default: () => {},
  },
});

const formValue = ref({
  push_type: "http",
  status: 1,
  push_cron: "*/30 * * * *",
  data_channel_id: null,
  data_set_id: null,
  name: "",
});
const dataSetOptions = ref([]);
const showModal = ref(false);
const formRef = ref(null);
const currDataChannel = ref({});
const jsonPreviewRef = ref(null);
const jsonValue = ref({});
const segmented = { content: true, footer: true };

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

const pushTypeOptions = [
  {
    label: "主动",
    value: "http",
  },
  {
    label: "被动(暂不可用)",
    value: "websocket",
  },
];

const rules = {
  name: {
    required: true,
    message: "请输入数据集名称",
  },
  data_set_id: {
    required: true,
    message: "请选择数据集",
  },
  push_type: {
    required: true,
    message: "请选择推送方式",
  },
  push_cron: {
    required: true,
    message: "请输入推送间隔",
  },
  status: {
    required: true,
    message: "请选择状态",
  },
};

const handleValidateButtonClick = async (e) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let res = null;
      if (formValue.value.id) {
        res = await editChannelDataSet(formValue.value);
      } else {
        formValue.value.data_channel_id = currDataChannel.value.id;
        console.log('currDataChannel',formValue.value, currDataChannel.value)
        res = await addChannelDataSet(formValue.value);
      }
      if (res && res.code == 200) {
        window["$message"].success("操作成功");
        close();
        emit("fresh");
      }
    }
  });
};

const handleTest = async () => {
  if (!formValue.value.data_set_id) {
    window["$message"].error("请选择数据集");
    return;
  }
  const res = await testDataSet({ id: formValue.value.data_set_id });
  if (res && res.code == 200) {
    jsonValue.value = res.data;
    jsonPreviewRef.value.open();
  }
};

const getDataSetOptions = async () => {
  const res = await getDataSetList();
  if (res.code == 200) {
    dataSetOptions.value = res.data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }
};

const getDataSetDetail = async (id) => {
  const res = await getDataChannelSetDetail({ id });
  if (res.code == 200) {
    formValue.value = res.data;
  }
};

const open = async (currDataChannelValue, value) => {
  showModal.value = true;
  currDataChannel.value = currDataChannelValue;
  await getDataSetOptions();
  if(value){
    await getDataSetDetail(value.id);
  }
};


const close = () => {
  showModal.value = false;
};

defineExpose({ open, close });

</script>
