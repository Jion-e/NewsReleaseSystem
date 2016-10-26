<style lang="less">
// @import "../assets/css/myToggle.less";
// #login{
//   position: fixed;
//   top:50%;
//   left: 0;
//   width: 100%;
//   margin-top: -250px;
//   .form{
//     width: 500px;
//   }
//   .form-group{
//     width: 90%;
//     margin-left: auto;
//     margin-right: auto;
//   }
//   .form-label{
//     text-align: left;
//   }
//   .btn-block{
//     margin: 30px 0 10px;
//   }
// }
#login{
    // padding-top: 200px;
    background: url('../assets/img/body_bg.jpg') no-repeat;
    background-size:cover;
    box-sizing: border-box;
    position: relative;
    .el-form{
      margin: auto;
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      width: 450px;
      max-height: 300px;
      background: rgba(255, 255, 255, 0.52);
    }
    .login__title{
      width: 100%;
      text-align: center;
      position: absolute;
      top: 10%;
      img{width: 50%}
    }
}
</style>

<template lang="html">

<div id="login">
    <!-- <form class="form"  method="post">
        <div class="form-group">
          <h1 class="form-header">NEWS ADMIN</h1>
        </div>
        <div class="form-group">
            <label class="form-label" for="username">账号：</label>
            <input class="form-control" type="text" name="username" id="username" placeholder="请输入账号" v-model="userInfo.email">
        </div>
        <div class="form-group">
            <label class="form-label" for="password">密码：</label>
            <input class="form-control" type="password" name="password" id="password" placeholder="请输入密码">
        </div>
        <div class="form-group">
          <label class="form-label"><input type="checkbox" name="remember">记住我</label>
          <a class="btn-link fl-right" href="javascript:;">忘记密码？</a>
        </div>
        <div class="form-group">
          <button class="btn-radius btn-block btn-default waves-effect" type="button" name="submit"
                  @click="login">登录</button>
        </div>
    </form> -->
    <!-- <h1 class="login__title">新闻发布后台管理系统</h1> -->
    <h1 class="login__title">
      <img src="../assets/img/login_text.png" alt="新闻发布后台管理系统" />
    </h1>
    <el-form :model="userInfo" :rules="loginRules" ref="loginForm" label-position="left" label-width="60px" class="form">
      <div class="form-group">
        <h1 class="form-header">ADMIN</h1>
      <div>
      <el-form-item prop="email" label="账户">
        <el-input v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="userInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" class="btn-block"
        v-loading.fullscreen="open"
        @click.native.prevent="submit"
        @keyup.enter.native="submit">登录</el-button>
      </el-form-item>
    </el-form>
</div>

</template>

<script>
import firebase from 'firebase'
export default {
    data: function() {
        return {
          open: false,
          userInfo:{
            email: '',
            password: ''
          },
          loginRules: {
            email: [
              { required: true, message: '账号不能为空', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ],
            password: [
              { required: true, message: '密码不能为空', trigger: 'blur' }
            ]
          }
        }
    },
    computed: {},
    mounted(){
      this.fullBg()
      const vm = this
      $("body").keydown(function() {
          if (event.keyCode == "13") {
              vm.submit()
          }
      });
    },
    methods: {
    /**
     * 邮箱密码登录
     * @param  {object} userInfo [登录用户信息]
     * @return {[object]}          [登录信息]
     */
      login(userInfo){
        // console.log("userInfo" + JSON.stringify(userInfo))
        const vm = this
        vm.open = true
        firebase.auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(() => {
            vm.isLogin(userInfo)
        })
        .catch(function(error) {
          vm.notice('用户名和密码不匹配')
          vm.open = false
        });
      },
      fullBg(){
        const _width = $(window).width()
        const _height = $(window).height()
        $('#login').width(_width)
        $('#login').height(_height)
      },
      /**
       * 判断用户是否登录
       * @return {[obj]} [用户信息]
       */
      isLogin(userInfo){
        const vm = this
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            window.location.href = '/#/main/'
            sessionStorage.userInfo = JSON.stringify(userInfo)
          } else {
              // vm.notice('登录用户不存在')
          }
        })

        this.open = false
      },
      submit(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
             this.login(this.userInfo)
          } else {
            this.notice('请输入正确的用户名或密码')
            return false;
          }
        });
      },
      notice(msg){
        this.$notify.error({
           title: '错误',
           message: msg
        });
      }
    },
    components: {}
}

</script>
