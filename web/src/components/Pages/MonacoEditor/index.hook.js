import { ref, onBeforeUnmount, nextTick } from 'vue'
import { useSystemSettingStore } from '@/store'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

export const useMonacoEditor = (language = 'javascript') => {
  const systemSettingStore = useSystemSettingStore()


  let monacoEditor = null
  let initReadOnly = false
  const el = ref(null)

  // 格式化
  const onFormatDoc = async () => {
    await monacoEditor?.getAction('monacoEditor.action.formatDocument')?.run()
  }

  // 更新
  const updateVal = (val) => {
    nextTick(async () => {
      monacoEditor?.setValue(val)
      initReadOnly && monacoEditor?.updateOptions({ readOnly: false })
      await onFormatDoc()
      initReadOnly && monacoEditor?.updateOptions({ readOnly: true })
    })
  }

  // 创建实例
  const createEditor = (editorOption) => {
    if (!el.value) return
    const javascriptModel = monaco.editor.createModel('', language)
    initReadOnly = !!editorOption.readOnly
    // 创建
    monacoEditor = monaco.editor.create(el.value, {
      model: javascriptModel,
      // 是否启用预览图
      minimap: { enabled: false },
      // 圆角
      roundedSelection: true,
      // 主题
      // theme: systemSettingStore.theme !== null ? 'vs-dark' : 'vs',
      theme: 'vs-dark',
      // 主键
      multiCursorModifier: 'ctrlCmd',
      // 滚动条
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8
      },
      // 行号
      lineNumbers: 'off',
      // tab大小
      tabSize: 2,
      //字体大小
      fontSize: 16,
      // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
      autoIndent: 'advanced',
      // 自动布局
      automaticLayout: true,
      ...editorOption
    })

    return monacoEditor
  }

  // 卸载
  onBeforeUnmount(() => {
    if (monacoEditor) monacoEditor.dispose()
  })

  return {
    el,
    updateVal,
    getEditor: () => monacoEditor,
    createEditor,
    onFormatDoc
  }
}
