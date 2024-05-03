<template>
    <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
        <template #header>
            <div>数据源管理</div>
        </template>
        <div>
            <n-form ref="formRef" :model="model" label-placement="left" label-width="auto" :style="{
                maxWidth: '640px'
            }">
                <n-form-item label="名称" path="name">
                    <n-input v-model:value="model.inputValue" placeholder="数据源名称" />
                </n-form-item>
                <n-form-item label="类型" path="selectValue">
                    <n-select v-model:value="model.selectValue" placeholder="数据源类型" :options="options" />
                </n-form-item>
                <n-form-item label="地址" path="inputValue">
                    <n-input v-model:value="model.inputValue" placeholder="数据源地址" />
                </n-form-item>
                <n-form-item label="端口" path="inputValue">
                    <n-input-number v-model:value="model.inputValue" placeholder="数据源端口" />
                </n-form-item>
                <n-form-item label="用户名" path="inputValue">
                    <n-input v-model:value="model.inputValue" placeholder="数据源账户" />
                </n-form-item>
                <n-form-item label="密码" path="inputValue">
                    <n-input v-model:value="model.inputValue" placeholder="数据源密码" />
                </n-form-item>
            </n-form>
        </div>
        <template #action>
            <n-flex>
              <n-button @click="handleTestConn">测试连接</n-button>
                <n-button @click="handleSubmit">提交</n-button>
                <n-button @click="close">关闭</n-button>
            </n-flex>
        </template>
    </n-modal>
</template>


<script setup>
import { ref } from 'vue'
import { useDataSourceHook } from '../hooks/dataSource.hook'

const { options } = useDataSourceHook()

const showModal = ref(false)
const model = ref({})
const open = () => {
    showModal.value = true
}

const close = () => {
    showModal.value = false
}

const handleSubmit = () => {
    window['$message'].success("提交成功")
    setTimeout(() => {
        close()
    })
}

const handleTestConn = () => {
  window['$message'].success("测试成功")
}

defineExpose({ open, close })
</script>