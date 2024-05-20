<template>
  <n-drawer v-model:show="showModal" :width="`35%`" :placement="placement">
    <n-drawer-content title="结果预览">
      <div>
        <monaco-editor
          v-model:modelValue="model"
          :style="editorStyle"
          language="json"
        />
      </div>
      <n-flex justify="end" style="margin-top: 10px">
        <n-button @click="clsoe"> 关闭 </n-button>
      </n-flex>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref, watch } from "vue";
import MonacoEditor from "@/components/MonacoEditor/index.vue";

const model = ref("");
const showModal = ref(false);
const placement = ref("right");

const props = defineProps({
  value: {
    type: Object,
    default: "right",
  },
});

const open = () => {
  showModal.value = true;
};

const editorStyle = {
  height: "86vh",
  width: "100%",
};

const clsoe = () => {
  model.model = "";
  showModal.value = false;
};

watch(
  () => props.value,
  (newValue) => {
    model.value = JSON.stringify(newValue);
  }
);

defineExpose({ open, clsoe });
</script>

<style scoped></style>
