<template>
  <div class="header">
    <div class="left"></div>
    <div class="right">
      <div class="item">
        <n-button strong secondary @click="handleChange">
          {{ active ? '浅色' : '深色' }}
        </n-button>
      </div>
      <div class="item">
        欢迎，管理员！
      </div>
      <div class="item" style="">
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <n-avatar :style="{
            color: 'yellow',
            marginTop: '10px',
            backgroundColor: 'red',
          }">
            M
          </n-avatar>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeHook } from './hooks/theme.hook'
const { active, handleChange } = useThemeHook()

const options = [
  {
    label: "退出",
    key: "logout",
  },
];
const handleSelect = (key) => {
  console.log(String(key));
  switch(key) {
    case "logout":
      doLogout()
      break
    default:
      break
  }
};

const doLogout = () => {
  localStorage.removeItem('token')
  window['$message'].success('退出成功');
  setTimeout(() => {
    window.location.href = '/main/login'
  }, 3000)
}
</script>

<style lang="scss">
.header {
  height: 100%;
  width: 100%;
  // background-color: #ffffff;
  box-shadow: inset 0 -0.5px 0 rgba(33, 32, 44, 0.16);

  .left {
    float: left;
  }

  .right {
    height: 100%;
    float: right;
    display: table;
    padding-right: 24px;

    .item {
      display: table-cell;
      vertical-align: middle;
      padding-right: 20px;
    }

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
</style>
