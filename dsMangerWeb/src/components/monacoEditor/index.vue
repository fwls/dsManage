<template>
  <div
    ref="editorContainer"
    class="editor-container"
    :style="{ height: style.height, width: style.width }"
  ></div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

export default {
  name: "MonacoEditor",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript",
    },
    style: {
      type: Object,
      default: () => {
        return {
          height: "200px",
          width: "100%",
        };
      },
    },
  },
  setup(props, { emit }) {
    const editorContainer = ref(null);
    let editor = null;
    let model = null;

    onMounted(() => {
      self.MonacoEnvironment = {
        getWorker(workerId, label) {
          if (label === "json") {
            return new jsonWorker();
          }
          if (label === "typescript" || label === "javascript") {
            return new tsWorker();
          }
          if (label === "html") {
            return new htmlWorker();
          }
          return new editorWorker();
        },
      };
      editor = monaco.editor.create(editorContainer.value, {
        value: props.modelValue,
        language: props.language,
        theme: "vs-dark",
        automaticLayout: true,
      });

      model = editor.getModel();

      editor.onDidChangeModelContent(() => {
        emit("update:modelValue", editor.getValue());
      });
    });

    onUnmounted(() => {
      if (editor) {
        editor.dispose();
      }
    });

    watch(
      () => props.modelValue,
      (newVal) => {
        if (model && model.getValue() !== newVal) {
          model.setValue(newVal);
        }
      }
    );

    watch(
      () => props.language,
      (newVal) => {
        if (model) {
          monaco.languages.setLanguage(model.uri, newVal);
        }
      }
    );

    // 返回暴露给模板的ref和其他计算属性
    return {
      editorContainer,
    };
  },
};
</script>

<style scoped></style>
