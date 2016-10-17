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
@import "../assets/css/myToggle.less";

#header{
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  padding: 10px 0;
  background: @base-color;
  z-index: 999;
  h1{color: #fff;}
}
</style>
