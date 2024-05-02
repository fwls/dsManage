<script setup>
import { RouterView } from 'vue-router'
import { DsAppProvider } from '@/components/DsAppProvider'
</script>

<template>
    <ds-app-provider>
        <router-view></router-view>
    </ds-app-provider>
</template>

<style scoped></style>
