<template lang="html">
  <header id="header">
    <!-- <h1 class="text-center">新闻后台发布系统</h1> -->
    <h1 class="login">新闻发布后台管理系统</h1>
    <div class="user" v-if="userInfo.email">
      <span class="user__email" v-text="userInfo.email"></span>
      <img class="user__icon" src="../assets/img/user.jpg" alt="用户" />
      <a href="javascript:;" class="btn btn-link" @click="loginOut">注销</a>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  computed: {},
  created(){
    let userStr = sessionStorage.userInfo
    this.userInfo = JSON.parse(userStr)
  },
  methods: {
    /**
     * 注销
     * @return {[url]} [返回登录界面]
     */
    loginOut(){
      firebase.auth().signOut().then(function() {
          sessionStorage.user = {}
          window.location.href = '/'
      }, function(error) {
         this.notice('注销失败')
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
};
</script>

<style media="screen" lang="less">
// @import "../assets/css/myToggle.less";

#header{
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background: #20A0FF;
  z-index: 99999;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14),0 3px 3px -2px rgba(0,0,0,0.12),0 1px 8px 0 rgba(0,0,0,0.2);
  .login{float: left;color: #fff;font-size: 24px;}
  .user{float: right;color: #fff;}
  .user__icon{width: 40px;height: 40px;margin-left: 5px;border-radius: 50%;}
  .btn{color: #fff;}

}
</style>
