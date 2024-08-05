<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>

    <el-form
      label-width="auto"
      :model="loginInfo"
      style="max-width: 600px"
      :rules="loginRules"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="loginInfo.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password" class="pwd">
        <el-input v-model="loginInfo.password" show-password />
      </el-form-item>
      <el-form-item class="remember">
        <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
      </el-form-item>
    </el-form>

    <div class="login-btn">
      <el-button type="primary" class="login-btn" size="large" @click="loginAction">
        登录
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/store/login/login'
import Cookies from 'js-cookie'

const loginInfo = reactive({
  name: '',
  password: ''
})

const rememberMe = ref(false)

const loginRules = {
  name: [{ required: true, message: '请输入帐号信息', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const formRef = ref(null)
const loginStore = useLoginStore()
const router = useRouter()

const loginAction = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const userAccount = loginInfo.name
      const userPassword = loginInfo.password
      try {
        const response = await loginStore.loginAccountAction({
          userAccount,
          userPassword
        })
        if (response && response.code === 0) {
          ElMessage.success('登录成功')
          if (rememberMe.value) {
            localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
          } else {
            localStorage.removeItem('loginInfo')
          }
        } else {
          ElMessage.error(response.message || '登录失败')
        }
      } catch (error) {
        ElMessage.error('登录失败')
      }
    } else {
      ElMessage.error('登录失败')
    }
  })
}

onMounted(() => {
  const savedLoginInfo = localStorage.getItem('loginInfo')
  if (savedLoginInfo) {
    const parsedLoginInfo = JSON.parse(savedLoginInfo)
    loginInfo.name = parsedLoginInfo.name
    loginInfo.password = parsedLoginInfo.password
    rememberMe.value = true
  }
})
</script>
<style lang="less" scoped>
.login-panel {
  width: 330px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 48px 50px;
  border-radius: 5px;
  border: 0.5px solid #dcdfe6;

  .title {
    text-align: center;
    margin-bottom: 30px;
  }

  .login-btn {
    margin-top: 5px;
    width: 100%;
  }
  .pwd {
    margin: 0 !important;
  }
  .remember {
    position: relative;
    left: 250px;
    margin: 0 !important;
    margin-top: 5px !important;
  }
}
</style>
