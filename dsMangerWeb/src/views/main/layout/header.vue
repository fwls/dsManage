<template>
  <div class="header">
    <div class="left"></div>
    <div class="right">
        <div class="item">
            欢迎，管理员！
            </div>
      <div class="item">
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <n-avatar
            :style="{
              color: 'yellow',
              backgroundColor: 'red',
            }"
          >
            M
          </n-avatar>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
const options = [
  {
    label: "退出",
    key: "logout",
  },
];
const handleSelect = (key) => {
  console.log(String(key));
};
</script>

<style lang="scss">
.header {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
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
    }

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
</style>
