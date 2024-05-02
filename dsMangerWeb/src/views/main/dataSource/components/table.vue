<template>
    <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
</template>

<script setup>
import { useDataSourceHook } from '../hooks/dataSource.hook'

const { columns, data, pagination } = useDataSourceHook()
</script>