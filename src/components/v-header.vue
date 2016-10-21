<template lang="html">
    <header id="header">
      <!-- <h1 class="text-center">新闻后台发布系统</h1> -->
      <h1 class="text-center">NewsReleaseSystem</h1>
    </header>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
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
  padding: 10px 0;
  background: #20A0FF;
  z-index: 99999;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14),0 3px 3px -2px rgba(0,0,0,0.12),0 1px 8px 0 rgba(0,0,0,0.2);
  h1{color: #fff;}
}
</style>
