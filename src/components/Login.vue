<template>
  <div class="login">
    <i class="fa fa-user-circle fa-5x" aria-hidden="true"></i>
    <div class="mini-title">登录后台管理系统</div>
    <div class="content">
      <div class="row">用户名</div>
      <el-input placeholder="请输入用户名" v-model="name"></el-input>
      <div class="row">密码</div>
      <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      <el-button class="confirm" @click="loginIn">登录</el-button>
    </div>
    <i class="fa fa-home goback fa-1x" aria-hidden="true" @click="goHome">返回首页</i>
  </div>
</template>
<script>
import axios from 'axios'
import {appStore} from '../store/appStore'
import MD5 from 'crypto-js/md5'
export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    loginIn() {
      const user = {
        name: this.name,
        password: MD5(this.password).toString()
      }
      axios.post('/api/login', user).then(result => {
        appStore.user = result.data
        this.$router.push({path: '/editor'})
      }).catch(err => {
        const eMsg = err.response.data
        console.log('登录失败：' + eMsg.message)
        switch(eMsg.errorType) {
          case 1:
          case 2:
            this.$notify.error({
              title: '错误',
              message: eMsg.message
            })
            break
          default:
            this.$notify.error({
              title: '错误',
              message: '登录失败'
            })
        } 
      })
    },
    goHome() {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    margin-top: 5%;
    text-align: center;
    .mini-title {
      margin: 15px 0px 15px 0px;
      font-size: 24px;
      font-weight: 300;
      letter-spacing: -.5px;
    }
    .content {
      width: 400px;
      text-align: left;
      border: 1px solid #d8dee2;
      padding: 20px;
      display: inline-block;
      .row {
        margin-bottom: 10px;
      }
      .confirm {
        margin-top: 10px;
        float: right;
      }
    }
    .goback {
      display: block;
      margin-top: 20px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>

