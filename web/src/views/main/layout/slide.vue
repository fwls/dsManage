<template>
  <div class="sliderBar">
    <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
  </div>
</template>

<script setup>
import { h } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  BarChart as BarChartIcon,
  BookmarksOutline as BookmarksOutlineIcon,
  BookOutline as BookOutlineIcon,
  DesktopOutline as DesktopOutlineIcon,
  HomeOutline as HomeIcon,
  SettingsOutline as SettingsOutlineIcon,
  PeopleOutline as PeopleOutlineIcon,
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
    label: "数据",
    key: "dataIndex",
    icon: renderIcon(BarChartIcon),
    children: [
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
        icon: renderIcon(BookmarksOutlineIcon),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "dataSet",
              },
            },
            { default: () => "数据集" }
          ),
        key: "go-data-set",
        icon: renderIcon(BookOutlineIcon),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "dataChannel",
              },
            },
            { default: () => "数据频道" }
          ),
        key: "go-data-channel",
        icon: renderIcon(DesktopOutlineIcon),
      },
    ],
  },
  {
    label: "系统管理",
    key: "system",
    icon: renderIcon(SettingsOutlineIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "systemUser",
                params: {},
              },
            },
            { default: () => "用户管理" }
          ),
        key: "user",
        icon: renderIcon(PeopleOutlineIcon),
      },
    ],
  },
];

const handleUpdateValue = (key, item) => {
  // message.info("[onUpdate:value]: " + JSON.stringify(key));
  // message.info("[onUpdate:value]: " + JSON.stringify(item));
};
</script>

<style lang="scss" scoped>
.sliderBar {
  height: 100vh;
  border-right: 1px solid rgb(33 32 44 / 16%);
  transition: background-color 0.3s var(--n-bezier);
}

.n-menu {
  height: 100%;
}

.n-menu .n-menu-item-content .n-menu-item-content__icon,
.n-menu .n-menu-item-content .n-menu-item-content-header a {}

.n-layout-sider-scroll-container {
  padding: 0 !important;
}
</style>
