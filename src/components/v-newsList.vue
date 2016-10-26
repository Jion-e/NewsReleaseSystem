<template lang="html">
<div class="newslist" v-loading.fullscreen="isload">
  <h2 class="newsTitle">新闻列表</h2>

  <el-form :inline="true" :model="searchData" @submit.prevent="searchNews" class="demo-form-inline">

    <el-form-item>
      <el-input v-model="searchData.text" placeholder="请输入关键字"></el-input>
    </el-form-item>

    <el-form-item>
      <el-select
        v-model="searchData.webType"
        placeholder="请选择网站"
        clearable
        @change="fetchModuleTypes(searchData.webType)">
       <el-option
         v-for="item in webTypes"
         :label="item.name"
         :value="item.wid">
       </el-option>
     </el-select>
    </el-form-item>

    <el-form-item>
      <el-select v-model="searchData.moduleType" placeholder="请选择模块" clearable>
       <el-option
         v-for="item in moduleTypes"
         :label="item.name"
         :value="item.mid">
       </el-option>
     </el-select>
    </el-form-item>

    <el-date-picker
      v-model="searchData.date"
      type="daterange"
      readonly
      format="yyyy-MM-dd"
      placeholder="选择日期范围"
      style="width: 220px">
    </el-date-picker>

    <el-form-item>
      <el-button type="primary" @click.native.prevent="searchNews">查询</el-button>
    </el-form-item>

  </el-form>

  <el-table :data="newsData" border stripe selection-mode="multiple" @selectionchange="handleSelectionChange">
     <!-- 增加一列显示选择框 -->
    <el-table-column type="selection" width="50"></el-table-column>
    <!-- <el-table-column type="index" width="50"></el-table-column> -->
    <el-table-column property="id" label="编号" width="160" sortable></el-table-column>
    <el-table-column property="title" label="标题" width="230" resizable></el-table-column>
    <el-table-column property="wType" label="所属网站" width="160" :formatter="formatWeb"></el-table-column>
    <!-- <el-table-column property="mType" label="网站模块" width="160" :formatter="formatModule"></el-table-column> -->
    <el-table-column property="date" label="日期" width="150" sortable></el-table-column>
    <el-table-column align="center" inline-template label="操作" width="200">
      <div class="text-center" v-if="row.id">
        <el-button type="text" @click.native="edit(row.id)">编辑</el-button>
        <el-button type="text" @click.native="view(row.id)">预览</el-button>
        <el-button type="text" @click.native="del(row.id)">删除</el-button>
      </div>
    </el-table-column>
  </el-table>

 <div class="pagination-box">
   <el-pagination
     @sizechange="handleSizeChange"
     @currentchange="handleCurrentChange"
     :current-page="page.current"
     :page-sizes="page.sizes"
     :page-size="page.size"
     layout="total, sizes, prev, pager, next, jumper"
     :total="page.total">
   </el-pagination>
 </div>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  data: function () {
    return {
      page:{
        total: 300,
        current: 1,
        size: 10,
        sizes: [10, 20, 30, 40]
      },
      searchData: {
         text: '',
         webType: '',
         moduleType: '',
         date: '',
       },
      multipleSelection: [],
    }
  },
  computed: {
    ...mapGetters([
      'webTypes',
      'moduleTypes',
      'newsList',
      'newsItem',
      'newsData'
   ]),
   isload(){
     if(this.newsList.length > 0){
       return false
     }else{
       return true
     }
   },
   newsData(){
     const allNews = this.newsList

     //分页处理
     this.page.total = this.newsList.length
     const pageNews = allNews.slice(this.page.size * (this.page.current - 1), this.page.size * this.page.current)

     return pageNews
   }
  },
  mounted(){
    this.fetchWebTypes()
    this.fetchNewsList()
  },
  methods: {
    ...mapActions([
      'fetchWebTypes',
      'fetchModuleTypes',
      'fetchNewsList',
      'fetchNewsListById',
      'fetchNewsListByDate',
      'fetchNewsListByWeb',
      'fetchNewsItem',
      'deleteNews'
   ]),
    //表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page.size = parseInt(val)
    },
    //当前页
    handleCurrentChange(val) {
      this.page.current = parseInt(val)
    },
    //搜索
    searchNews() {

      const text = this.searchData.text
      const webType = this.searchData.webType
      const date = this.searchData.date
      if(!(text || webType || date)){
        this.fetchNewsList(this.page.size)
        return false
      }

      if(date){
        const startTime = moment(date[0]).format('YYYY-MM-DD')
        const endTime = moment(date[1]).format('YYYY-MM-DD')
        const queryDate = {startTime, endTime}
        this.fetchNewsListByDate(queryDate)
      }

      if(text){
        //输入的是正整数
        if(/^[1-9]\d*$/.test(text)){
          this.fetchNewsListById(text)
        }
      }

      if(webType){
        this.fetchNewsListByWeb(webType)
      }
    },
    //编辑新闻
    edit(id){
      this.$router.push({path: '/main/newsAdd/' + id});
    },
    //删除新闻
    del(id){
      this.$confirm('此操作将删除该新闻, 是否继续?', '提示', {
         type: 'warning',
         lockScroll: true
       }).then(() => {
         this.deleteNews(id);
         this.fetchNewsList(this.page.size)
         this.$message({
           type: 'success',
           message: '删除成功!'
         });
       }).catch(() => {

       });
    },
    //预览
    view(id){
      this.$router.push({path: '/preview/' + id})
    },

    //格式化所属网站
    formatWeb(row){
      const type = parseInt(row.wType);
      let typeName = ''
      switch (type) {
        case 0:
          typeName = '信用轻工网'
          break;
        case 1:
          typeName = '星数科技官网'
          break;
        default:
          typeName = ''
      }
      return typeName;
    }
  }
}
</script>

<style lang="less">
.newsTitle{margin: 30px auto;text-align: center;}
.el-checkbox__inner::after{top:3px;}
.el-table td .cell{width: 100%}
.el-message{z-index: 99999}
.pagination-box{text-align: left;margin: 20px 0;}
.cell span{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
</style>
