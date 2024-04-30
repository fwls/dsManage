<template>
  <div class="sliderBar">
    <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
  </div>
</template>

<script setup>
import { defineComponent, h } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon,
} from "@vicons/ionicons5";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "main",
            params: {},
          },
        },
        { default: () => "ds管理系统" }
      ),
    key: "go-back-home",
    icon: renderIcon(HomeIcon),
  },
  {
    key: "divider-1",
    type: "divider",
    props: {
      style: {
        marginLeft: "32px",
      },
    },
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "dataSource",
          },
        },
        { default: () => "数据源" }
      ),
    key: "go-data-source",
    icon: renderIcon(HomeIcon),
  },
  {
    label: "饮品",
    key: "beverage",
    icon: renderIcon(WineIcon),
    children: [
      {
        label: "威士忌",
        key: "whisky",
      },
    ],
  },
];

const handleUpdateValue = (key, item) => {
  // message.info("[onUpdate:value]: " + JSON.stringify(key));
  // message.info("[onUpdate:value]: " + JSON.stringify(item));
};
</script>

<style lang="scss">
.sliderBar {

  height: 100vh;
}
.n-menu {
  height: 100%;
}

.n-menu .n-menu-item-content .n-menu-item-content__icon ,.n-menu .n-menu-item-content .n-menu-item-content-header a {

}
.n-layout-sider-scroll-container {
  padding: 0 !important;
}
</style>
