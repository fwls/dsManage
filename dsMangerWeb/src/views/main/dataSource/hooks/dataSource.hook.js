import { ref, reactive } from "vue";

import { getDataSourceList } from "@/api";

export const useDataSourceHook = () => {
  const addModalRef = ref(null);

  const pagination = reactive({
    page: 2,
    pageSize: 5,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    onChange: (page) => {
      pagination.page = page;
    },
    onUpdatePageSize: (pageSize) => {
      pagination.pageSize = pageSize;
      pagination.page = 1;
    },
  });
  const data = ref([]);

  const options = [
    {
      label: "所有",
      value: "",
    },
    {
      label: "MYSQL",
      value: "MYSQL",
    },
    {
      label: "POSTGRESQL",
      value: "POSTGRESQL",
    },
    {
      label: "Javascript",
      value: "javascript",
    },
  ];

  const getDataList = async () => {
    const res = await getDataSourceList({});
    if (res && res.data.code == 200) {
      data.value = res.data.data;
    }
  };

  return {
    addModalRef,
    data,
    pagination,
    options,
    getDataList,
  };
};
