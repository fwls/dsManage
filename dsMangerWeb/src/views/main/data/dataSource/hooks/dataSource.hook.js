import { ref, reactive } from "vue";

import { getDataSourceList } from "@/api";

export const useDataSourceHook = () => {
  const addModalRef = ref(null);

  const pagination = reactive({
    page: 1,
    pageSize: 10,
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
      label: "JavaScript",
      value: "javaScript",
    },
    {
      label: "MySQL",
      value: "MySQL",
    },
    {
      label: "POSTGRESQL",
      value: "POSTGRESQL",
    },
  ];

  const getDataList = async (value) => {
    let res = null;
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
    if (value) {
      params.type = value.type;
      params.name = value.name;
    }
    res = await getDataSourceList(params);
    if (res && res.code == 200) {
      data.value = res.data;
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
