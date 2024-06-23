<template>
  <div style="">
    <n-config-provider :theme="theme">
      <n-spin :show="requestLoading">
      <n-layout has-sider style="">
        <n-layout-sider>
          <slideVue />
        </n-layout-sider>
        <n-layout>
          <n-layout-header>
            <headerVue />
          </n-layout-header>
          <n-layout-content>
            <div class="main-content">
              <router-view></router-view>
            </div>
          </n-layout-content>
          <!-- <n-layout-footer style="bottom: 0;"></n-layout-footer> -->
        </n-layout>
      </n-layout>
      </n-spin>
    </n-config-provider>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import headerVue from "./header.vue";
import slideVue from "./slide.vue";
import { useThemeHook } from "./hooks/theme.hook";
import { requestLoading } from "@/views/hooks/request.hook";

const { theme } = useThemeHook();

</script>

<style>
.n-layout .n-layout--static-positioned {
  /* background-color: #f1f2f5 !important */
}

.n-layout-header {
  height: 64px;
}

.n-layout-content {
  height: calc(100vh - 64px);
}

.main-content {
  margin: 2px;
  padding: 12px 12px;
  /* background-color: #fff; */
}
</style>
