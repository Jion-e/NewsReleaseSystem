<style lang="less">
// @import "../assets/css/myToggle.less";
#login{
  position: fixed;
  top:50%;
  left: 0;
  width: 100%;
  margin-top: -250px;
  .form{
    width: 500px;
  }
  .form-group{
    width: 90%;
    margin: 0 auto;
  }
  .form-label{
    text-align: left;
  }
  .btn-block{
    margin: 30px 0 10px;
  }
}


</style>

<template lang="html">

<div id="login">
    <form class="form"  method="post">
        <div class="form-group">
          <h1 class="form-header">NEWS ADMIN</h1>
        </div>
        <div class="form-group">
            <label class="form-label" for="username">账号：</label>
            <input class="form-control" type="text" name="username" id="username" placeholder="请输入账号">
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
    </form>
</div>

</template>

<script>

export default {
    data: function() {
        return {}
    },
    computed: {},
    ready: function() {},
    attached: function() {},
    methods: {
      login(){
        this.$router.push({path: '/main'})
      }
    },
    components: {}
}

</script>
