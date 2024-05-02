import {ref, h} from 'vue'
import { NButton } from "naive-ui";

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
            title: "创建时间",
            key: "created_at"
        },
        {
            title: "Action",
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
                    { default: () => "编辑" }
                );
            }
        }
    ];

    const data = [
        { no: 1, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL" },
        { no: 2, name: "111Mysql数据库", created_at: "4:18", type: "POSTGRESQL" },
        { no: 3, name: "111Mysql数据库", created_at: "4:18", type: "javascript" },
        { no: 4, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL" },
        { no: 5, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL" },
        { no: 6, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL" },
        { no: 7, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL" },
        { no: 8, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL" },
        { no: 9, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL" },
        { no: 10, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL" },
        { no: 11, name: "111Mysql数据库", created_at: "4:18", type: "MYSQL" },
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