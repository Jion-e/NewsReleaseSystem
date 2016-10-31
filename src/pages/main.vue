<style lang="less">
.content{margin-left: 266px;margin-top: 80px;margin-right: 10px;}

</style>

<template lang="html">
<div class="mainPage clearfix">
  <v-header></v-header>
  <v-sidebar></v-sidebar>
  <div class="content">
    <router-view></router-view>
  </div>
</div>

</template>

<script>
import vHeader from '../components/v-header.vue'
import vSidebar from '../components/v-sidebar.vue'
export default {
    data() {
      return {};
    },
    computed: {},
    methods: {},
    components: {
      vHeader,
      vSidebar
    }
};

</script>
