<template>
    <n-flex>
        <div class="left">
            <n-form ref="formRef" inline label-placement="left" label-width="auto" :model="formValue" :size="`small`">
                <n-form-item label="名称">
                    <n-input v-model:value="formValue.name" placeholder="输入名称" />
                </n-form-item>
                <n-form-item label="类型">
                    <n-select v-model:value="formValue.value" :options="options" />
                </n-form-item>
                <n-form-item>
                    <n-button attr-type="button">
                        验证
                    </n-button>
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
        <table-component />
    </div>
    <add-modal ref="addModalRef" />
</template>

<script setup>
import { ref } from 'vue';
import addModal from './components/addModal.vue';
import { useDataSourceHook } from './hooks/dataSource.hook'
import tableComponent from './components/table.vue'

const { options } = useDataSourceHook()

const formValue = ref({
    name: '',
    value: ''
})

const addModalRef = ref(null)

const openAddModal = () => {
    addModalRef.value?.open()
}

</script>

<style>
.n-base-selection {
    width: 180px;
}
</style>