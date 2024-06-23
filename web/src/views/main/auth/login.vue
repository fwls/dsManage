<template>
  <!-- <div class="login">
    <n-card title="登录">
      <n-form ref="formRef" :model="model" label-placement="left" label-width="auto" :style="{
        maxWidth: '640px',
      }">
        <n-form-item label="用户名" path="inputValue" required>
          <n-input v-model:value="model.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="inputValue" required>
          <n-input type="password" v-model:value="model.password" placeholder="请输入密码" />
        </n-form-item>

        <div style="display: flex; justify-content: flex-end">
          <n-button @click="handleLogin">登录</n-button>
        </div>
      </n-form>

 
    </n-card>
  </div> -->
<div class="main">
  <div class="login-box">
    <form>
      <div class="user-box">
        <input type="text" v-model="model.username"  name="" required="" />
        <label>用户名</label>
      </div>
      <div class="user-box">
        <input type="password" v-model="model.password" name="" required="" />
        <label>密码</label>
      </div>
      <center>
        <a href="#" @click="handleLogin">
          登录
          <span></span>
        </a>
      </center>
    </form>
  </div>
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
.main {
  height: 100vh;
  width: 100vw;
  background-color: black;
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(24, 20, 20, 0.987);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #bdb8b8;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #03f40f;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03f40f,
              0 0 25px #03f40f,
              0 0 50px #03f40f,
              0 0 100px #03f40f;
}

.login-box a span {
  position: absolute;
  display: block;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(1) {
  bottom: 2px;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03f40f);
  animation: btn-anim1 2s linear infinite;
}
</style>

