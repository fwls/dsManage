import {ref, h} from 'vue'
import {NButton, NTag} from "naive-ui";

export const useDataSourceHook = () => {
    const pagination = ref(true)
    const columns = [
        {
            title: "No",
            key: "no"
        },
        {
            title: "名称",
            key: "name"
        },
        {
            title: "类型",
            key: "type"
        },
        {
            title: "连通性",
            key: "conn_status",
            render(row) {
                if (row.conn_status == true) {
                    return h(
                        NTag,
                        {
                            type: "success"
                        },
                        {default: () => "正常"}
                    );
                } else if (row.conn_status == false) {
                    return h(
                        NTag,
                        {
                            type: "error"
                        },
                        {default: () => "错误"}
                    );
                } else {
                    return h(
                        NTag,
                        {},
                        {default: () => "未知"}
                    );
                }

            }
        },
        {
            title: "创建时间",
            key: "created_at"
        },
        {
            title: "操作",
            key: "actions",
            render(row) {
                return h(
                    NButton,
                    {
                        strong: true,
                        tertiary: true,
                        size: "small",
                        onClick: () => play(row)
                    },
                    {default: () => "编辑"}
                );
            }
        }
    ];

    const data = [
        {no: 1, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL", conn_status: true},
        {no: 2, name: "111Mysql数据库", created_at: "4:18", type: "POSTGRESQL", conn_status: null},
        {no: 3, name: "111Mysql数据库", created_at: "4:18", type: "javascript", conn_status: true},
        {no: 4, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL", conn_status: false},
        {no: 5, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL", conn_status: false},
        {no: 6, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL", conn_status: false},
        {no: 7, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL", conn_status: true},
        {no: 8, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL", conn_status: true},
        {no: 9, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL", conn_status: true},
        {no: 10, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL", conn_status: true},
        {no: 11, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL", conn_status: true},
    ];

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
            value: "POSTGRESQL"
        },
        {
            label: "Javascript",
            value: "javascript"
        },
    ]

    return {
        columns,
        data,
        pagination,
        options
    }
}