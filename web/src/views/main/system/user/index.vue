<template>
  <n-card>
    <div>
      <n-form ref="formRef" inline label-placement="left" :model="formValue" :size="`small`">
        <n-form-item label="用户名" path="name">
          <n-input v-model:value="formValue.name" placeholder="输入用户名" />
        </n-form-item>
        <n-form-item>
          <n-space>
            <n-button attr-type="button" @click="getList">
              搜索
            </n-button>
            <n-button attr-type="button" ghost type="primary" @click="handleAdd">
              新增
            </n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </div>
    <div>
      <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
    </div>
  </n-card>

  <add-component ref="addRef" @fresh="getList"></add-component>

</template>

<script setup>
import { getUserList, deleteUser } from "@/api/user.js"
import { ref, h, onMounted, reactive } from 'vue';
import { NButton, NTag, NSpace } from "naive-ui";
import addComponent from "./add.vue";

const formValue = ref({})
const addRef = ref(null)
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page) => {
    pagination.page = page
    getList()
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getList()
  }
})


const columns = [
  {
    title: "No",
    key: "id"
  },
  {
    title: "用户名",
    key: "username"
  },
  {
    title: "注册时间",
    key: "created_at"
  },
  {
    title: "状态",
    key: "status",
    render(row) {
      return h(NTag, {
        type: row.status == 1 ? "success" : "error"
      }, {
        default: () => row.status == 1 ? "启用" : "禁用"
      })
    }
  },
  {
    title: "动作",
    key: "action",
    render(row) {
      const edit = h(NButton, {
        size: "tiny",
        type: "primary",
        ghost: true,
        onClick: () => handleEdit(row)
      }, {
        default: () => "编辑"
      })

      const del = h(NButton, {
        size: "tiny",
        ghost: true,
        type: "error",
        onClick: () => handleDel(row)
      }, {
        default: () => "删除"
      });

      return h(NSpace, null, { default: () => [edit, del] })
    }
  },
]

const data = ref([])

const getList = () => {
  const params = {
    page: pagination.page,
    pageSize: pagination.pageSize,
  }

  if (formValue.value.name) {
    params.name = formValue.value.name
  }

  getUserList(params).then(res => {
    if (res.code == 200) {
      data.value = res.data
    }
  })
}

const handleAdd = async () => {
  addRef.value.open()
}

const handleEdit = async (value) => {
  addRef.value.open(value)
}

const handleDel = async (row) => {
  window["$dialog"].warning({
    title: "警告",
    content: "确定要删除吗?",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      const res = await deleteUser({ id: row.id })
      if (res.code == 200) {
        getList()
        window["$message"].success("删除成功")
      }
    },
  })
}

onMounted(() => {
  getList()
})
</script>

<style scoped></style>