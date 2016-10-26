<template lang="html">
  <div class="web-type">
    <div class="web-type__add">
      <el-button type="primary" @click.native="addWebType">添加网站</el-button>
    </div>
    <el-table :data="webTypesArr" border stripe>
       <!-- 增加一列显示选择框 -->
      <!-- <el-table-column type="selection" width="50"></el-table-column> -->
      <el-table-column property="wid" label="编号" width="160" sortable></el-table-column>
      <el-table-column property="name" label="网站名称" width="230"></el-table-column>
     <el-table-column align="center" inline-template label="操作" width="200">
        <div class="text-center" v-if="row.wid">
          <el-button type="text" @click.native="view(row.wid)">查看关联模块</el-button>
        </div>
      </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters([
        'webTypesArr',
        'moduleTypes'
      ])
    },
    mounted(){
      this.fetchWebTypes()
      console.log(this.webTypes)
    },
    methods: {
      ...mapActions([
        'fetchWebTypes',
        'fetchModuleTypes'
      ]),
      view(wid){

      },
      addWebType(){
        this.$router.push({path: 'WebTypeAdd'})
      }
    }
  }
</script>

<style lang="less">
.web-type{
  .el-table{width: 700px;}
  .el-input{float: left;width: 250px;margin-right: 20px;}
  .el-table td .cell{width: 100%}
}
.web-type__add{margin-bottom: 20px;}
</style>
