<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>数据源管理后台</h2>
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="model.username" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="model.password" required />
      </div>
      <button type="submit" class="login-button">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "@/api/dataApi";
import { useSystemSettingStore } from "@/store";
import { storeToRefs } from "pinia";

const { userInfo } = storeToRefs(useSystemSettingStore());

const router = useRouter();

const model = ref({
  username: "",
  password: "",
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
    userInfo.value = res.data;
    router.push({ name: "dataSource" });
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>