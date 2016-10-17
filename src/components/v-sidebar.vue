<template lang="html">
<div class="sidebar">
  <el-menu theme="dark" default-active="/main/newsList"  mode="vertical" router>
     <!-- <el-submenu index="1">
       <template slot="title"><i class="el-icon-message"></i>新闻列表</template>
       <el-menu-item-group title="分组一">
         <el-menu-item index="1-1">选项1</el-menu-item>
         <el-menu-item index="1-2">选项2</el-menu-item>
       </el-menu-item-group>
       <el-menu-item-group title="分组2">
         <el-menu-item index="1-3">选项3</el-menu-item>
       </el-menu-item-group>
     </el-submenu> -->
     <el-menu-item index="/main/newsList"><i class="el-icon-menu"></i>新闻列表</el-menu-item>
     <el-menu-item index="/main/newsAdd"><i class="el-icon-plus"></i>添加新闻</el-menu-item>
     <el-menu-item index="2"><i class="el-icon-menu"></i>添加新闻</el-menu-item>
     <el-menu-item index="2"><i class="el-icon-menu"></i>添加新闻</el-menu-item>
     <el-menu-item index="2"><i class="el-icon-menu"></i>添加新闻</el-menu-item>
     <el-menu-item index="2"><i class="el-icon-menu"></i>添加新闻</el-menu-item>
   </el-menu>

</div>
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

<style lang="less">
.sidebar{position: fixed;top:60px;left: 0;width: 300px;}
</style>
