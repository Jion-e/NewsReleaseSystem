<template lang="html">
<div class="newslist">
  <h2 class="newsTitle">新闻列表</h2>

  <el-form :inline="true" :model="searchData" @submit.prevent="searchNews" class="demo-form-inline">

    <el-form-item>
      <el-input v-model="searchData.text" placeholder="请输入关键字"></el-input>
    </el-form-item>

    <el-form-item>
      <el-select v-model="searchData.webTypes" placeholder="请选择网站">
       <el-option
         v-for="item in webTypes"
         :label="item.name"
         :value="item.id">
       </el-option>
     </el-select>
    </el-form-item>

    <el-date-picker
      v-model="searchData.date"
      type="daterange"
      readonly
      placeholder="选择日期范围"
      style="width: 220px">
    </el-date-picker>

    <el-form-item>
      <el-button type="primary" @click.native.prevent="searchNews">查询</el-button>
    </el-form-item>

  </el-form>

  <el-table :data="newsList" border stripe selection-mode="multiple" @selectionchange="handleSelectionChange">
     <!-- 增加一列显示选择框 -->
    <el-table-column type="selection" width="50"></el-table-column>
    <!-- <el-table-column type="index" width="50"></el-table-column> -->
    <el-table-column property="id" label="序号" width="180" sortable></el-table-column>
    <el-table-column property="title" label="标题" width="180"></el-table-column>
    <el-table-column property="type" label="所属网站" width="180" :formatter="formatWeb"></el-table-column>
    <el-table-column property="date" label="日期" width="180" sortable></el-table-column>
    <el-table-column align="center" inline-template label="操作" width="180">
      <div class="text-center">
        <el-button type="text" @click.native="editNews(row.id)">编辑</el-button>
        <el-button type="text" @click.native="deleteNews(row.id)">删除</el-button>
      </div>
    </el-table-column>
  </el-table>

 <div class="pagination-box">
   <el-pagination
     @sizechange="handleSizeChange"
     @currentchange="handleCurrentChange"
     :current-page="5"
     :page-sizes="[10, 20, 30, 40]"
     :page-size="10"
     layout="total, sizes, prev, pager, next, jumper"
     :total="400">
   </el-pagination>
 </div>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      searchData: {
         text: '',
         webTypes: '',
         date: '',
       },
      multipleSelection: [],
    }
  },
  computed: {
    ...mapGetters([
      'webTypes',
      'newsList'
   ])
  },
  mounted: function () {
    this.fetchWebTypes();
    this.fetchNewsList();
  },
  attached: function () {},
  methods: {
    ...mapActions([
      'fetchWebTypes',
      'fetchNewsList',
   ]),
    //表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //搜索
    searchNews() {
      console.log('searchData:' +　JSON.stringify(this.searchData));
    },
    //编辑新闻
    editNews(id){
      this.$router.push({path: '/main/newsAdd'});
      console.log('id:' + id);
    },
    //删除新闻
    deleteNews(){
      this.$confirm('此操作将删除该新闻, 是否继续?', '提示', {
         type: 'warning'
       }).then(() => {
         this.$message({
           type: 'success',
           message: '删除成功!'
         });
       }).catch(() => {
        //  this.$message({
        //    type: 'info',
        //    message: '已取消删除'
        //  });
       });
    },

    //格式化所属网站
    formatWeb(row){
      const type = parseInt(row.type);
      let typeName = ''
      switch (type) {
        case 0:
          typeName = '信用轻工网'
          break;
        case 1:
          typeName = '星数科技官网'
          break;
        default:
          typeName = '所属网站不明'
      }
      return typeName;
    }
  },
  components: {}
}
</script>

<style lang="less">
.newsTitle{margin: 30px auto;text-align: center;}
.el-checkbox__inner::after{top:3px;}
.el-table td .cell{width: 100%}
// .el-message{top: 60px}
.pagination-box{text-align: left;margin: 20px 0;}
</style>
