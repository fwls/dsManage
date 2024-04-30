<template>
  <div style="">
    <n-layout has-sider style="">
      <n-layout-sider>
        <slideVue />
      </n-layout-sider>
      <n-layout>
        <n-layout-header>
          <headerVue />
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <router-view></router-view>
        </n-layout-content>
        <n-layout-footer style="bottom: 0;">成府路</n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup>
import headerVue from "./header.vue";
import slideVue from "./slide.vue";
import { RouterView } from "vue-router";
</script>

<style>
.n-layout .n-layout--static-positioned {
    background-color: #f1f2f5 !important
}

.n-layout-header {
    height: 64px;
}

.n-layout-content {
    height: calc(100vh - 64px - 64px);
}
</style>
