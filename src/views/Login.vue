<template>
  <div class="login">
    <s-header :name="state.type === 'login' ? '登录' : '注册'" :back="'/home'"></s-header>
    
    <!-- Logo区域 -->
    <div class="logo-section">
      <div class="logo">Z-app</div>
      <p class="subtitle">校园二手交易平台</p>
    </div>

    <!-- 登录表单 -->
    <div v-if="state.type === 'login'" class="form-section">
      <van-form @submit="onSubmit">
        <van-field 
          v-model="state.username" 
          name="username" 
          label="用户名" 
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" 
        />
        <van-field 
          v-model="state.password" 
          type="password" 
          name="password" 
          label="密码" 
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]" 
        />
        
        <div class="form-actions">
          <div class="link-register" @click="toggle('register')">还没有账号？立即注册</div>
          <van-button round block color="#1baeae" native-type="submit" :loading="state.loading">
            登录
          </van-button>
        </div>
      </van-form>
    </div>

    <!-- 注册表单 -->
    <div v-else class="form-section">
      <van-form @submit="onSubmit">
        <van-field 
          v-model="state.username1" 
          name="username1" 
          label="用户名" 
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" 
        />
        <van-field 
          v-model="state.password1" 
          type="password" 
          name="password1" 
          label="密码" 
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]" 
        />
        <van-field 
          v-model="state.password2" 
          type="password" 
          name="password2" 
          label="确认密码" 
          placeholder="请再次输入密码"
          :rules="[
            { required: true, message: '请确认密码' },
            { validator: validatePassword, message: '两次密码输入不一致' }
          ]" 
        />
        
        <div class="form-actions">
          <div class="link-login" @click="toggle('login')">已有账号？立即登录</div>
          <van-button round block color="#1baeae" native-type="submit" :loading="state.loading">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'
import sHeader from '@/components/SimpleHeader.vue'
import { login, register } from '@/service/user'
import { setLocal } from '@/common/js/utils'

const router = useRouter()

const state = reactive({
  //用于登录
  username: '',
  password: '',
  //用于注册
  username1: '',
  password1: '',
  password2: '',
  type: 'login',
  loading: false
})

// 切换登录和注册模式
const toggle = (type) => {
  state.type = type
  // 清空表单
  state.username = ''
  state.password = ''
  state.username1 = ''
  state.password1 = ''
  state.password2 = ''
}

// 验证密码一致性
const validatePassword = (value) => {
  return value === state.password1
}

// 提交表单
const onSubmit = async (values) => {
  state.loading = true
  
  try {
    if (state.type === 'login') {
      // 登录逻辑
      const { data } = await login({
        loginName: values.username,
        passwordMd5: values.password // 这里简化处理，实际应该加密
      })
      
      setLocal('token', data)
      showSuccessToast('登录成功')
      
      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        router.push('/home')
      }, 1000)
      
    } else {
      // 注册逻辑
      await register({
        loginName: values.username1,
        password: values.password1
      })
      
      showSuccessToast('注册成功，请登录')
      toggle('login')
    }
  } catch (error) {
    showFailToast(state.type === 'login' ? '登录失败' : '注册失败')
    console.error('Error:', error)
  } finally {
    state.loading = false
  }
}
</script>

<style lang="less" scoped>
.login {
  min-height: 100vh;
  // background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%);
  background-image: 
    // linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%),
    url('/images/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 44px;

  .logo-section {
    text-align: center;
    padding: 60px 20px 40px;
    
    .logo {
      font-size: 48px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 16px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .subtitle {
      font-size: 16px;
      color: rgba(255,255,255,0.9);
      margin: 0;
    }
  }

  .form-section {
    background: #fff;
    margin: 0 20px;
    border-radius: 16px;
    padding: 30px 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);

    .form-actions {
      margin-top: 24px;
      
      .link-register,
      .link-login {
        font-size: 14px;
        color: #1989fa;
        text-align: center;
        margin-bottom: 20px;
        cursor: pointer;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  // 自定义输入框样式
  :deep(.van-field) {
    margin-bottom: 16px;
    
    .van-field__label {
      color: #333;
      font-weight: 500;
    }
    
    .van-field__control {
      color: #333;
    }
  }

  // 自定义按钮样式
  :deep(.van-button) {
    height: 44px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>