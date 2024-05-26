<template>
    <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="重置密码" size="huge"
        :bordered="false" :segmented="segmented">
        <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="old_pass" label="旧密码">
                <n-input v-model:value="model.old_pass" type="password" @keydown.enter.prevent placeholder="请输入旧密码" />
            </n-form-item>
            <n-form-item path="new_pass" label="新密码">
                <n-input v-model:value="model.new_pass" type="password" @keydown.enter.prevent placeholder="请输入新密码" />
            </n-form-item>
            <n-form-item path="repeat_pass" label="确认新密码">
                <n-input v-model:value="model.repeat_pass" type="password" @keydown.enter.prevent
                    placeholder="请输入新密码" />
            </n-form-item>
        </n-form>
        <template #footer>
            <n-flex justify="end">
                <n-button attr-type="button" size="small" ghost @click="close"> 取消 </n-button>
                <n-button attr-type="button" ghost size="small" type="primary" @click="handleSubmit"> 确定 </n-button>
            </n-flex>
        </template>
    </n-modal>
</template>

<script setup>
import { reactive, ref } from "vue";
import { editPassword } from '@/api/user'

const formRef = ref(null)

const rules = {
    old_pass: {
        required: true,
        message: "请输入旧密码",
    },
    new_pass: {
        required: true,
        message: "请输入新密码",
    },
    repeat_pass: {
        required: true,
        message: "请再次输入新密码",
    }
}

const model = reactive({
    old_pass: '',
    new_pass: '',
    repeat_pass: ''
})

const bodyStyle = {
    width: "600px"
}
const segmented = {
    content: "soft",
    footer: "soft"
}
const showModal = ref(false)
const open = () => {
    showModal.value = true
}
const close = () => {
    showModal.value = false
    model.old_pass = ''
    model.new_pass = ''
    model.repeat_pass = ''
}

const handleSubmit = () => {
    formRef.value.validate((errors) => {
        if (!errors) {
            if (model.new_pass !== model.repeat_pass) {
                window.$message.warning('两次密码不一致')
                return
            }
            //正则验证新密码 最少8位，包含字母与数字
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
            if (!reg.test(model.new_pass)) {
                window.$message.warning('密码应为8-16位，包含字母与数字')
                return
            }
            editPassword(model).then(res => {
                if (res && res.code == 200) {
                    window.$message.success(res.msg)
                    close()
                }
            })
        }
    })
}

defineExpose({ open, close });
</script>