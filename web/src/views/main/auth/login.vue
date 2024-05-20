<template>
  <div class="login">
    <n-card title="登录">
      <n-form
        ref="formRef"
        :model="model"
        label-placement="left"
        label-width="auto"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item label="用户名" path="inputValue" required>
          <n-input v-model:value="model.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="inputValue" required>
          <n-input
            type="password"
            v-model:value="model.password"
            placeholder="请输入密码"
          />
        </n-form-item>

        <div style="display: flex; justify-content: flex-end">
          <n-button @click="handleLogin">登录</n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "@/api/dataApi";

const router = useRouter();

const model = ref({
  username: "admin",
  password: "123456",
});

const handleLogin = async () => {
  if (!model.value.username || !model.value.password) {
    window["$message"].error("账号或密码不能为空");
    return false;
  }

  const res = await loginApi(model.value);

  if (!res || res.code != 200) {
    window["$message"].error("账号或密码错误");
    return false;
  } else {
    window["$message"].success("登录成功");
    localStorage.setItem("token", res.token);
    router.push({ name: "mainDashboardIndex" });
  }
};
</script>

<style lang="scss" scoped>
.n-card {
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15vh;
}
</style>
@/api/dataApi