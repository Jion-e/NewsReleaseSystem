<template lang="html">
  <div class="editor">
    <el-form :model="newsData" ref="newsForm" label-width="80px">

      <el-form-item label="新闻标题">
        <el-input v-model="newsData.title"></el-input>
      </el-form-item>

      <el-form-item label="所属网站">
        <el-select v-model="newsData.wType" placeholder="请选择网站">
         <el-option
           v-for="item in webTypes"
           :label="item.name"
           :value="item.id">
         </el-option>
       </el-select>
      </el-form-item>

      <el-form-item label="内容编辑">
        <textarea id="ckEditor" name="ckEditor" cols="20" rows="2" class="ckeditor"></textarea>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
         v-loading.fullscreen="open"
         @click.native.prevent="save">保存</el-button>
        <el-button @click.native.prevent="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      open: false,
      newsData: {
        // id: '',
        // wType: '',
        // mType: '',
        // title: '',
        // cont: '',
        // date: '',
        // delete: '0'
      }
    };
  },
  computed: {
    ...mapGetters([
      'webTypes',
      'newsItem'
    ])
  },
  mounted (){
    CKEDITOR.replace( 'ckEditor', {
      language: 'zh-cn',
      filebrowserUploadUrl:"http://ccqr.themistech.cn:80/servlet/UploadServerlet?type=image"
    });

    //进入页面加载数据
    const newsID = this.$route.params.id
    if(newsID){
      this.fetchNewsItem(newsID)
      this.newsData = this.newsItem
      CKEDITOR.instances.ckEditor.setData(this.newsItem.cont)
    }else{
      this.newsData = {}
    }
    this.fetchWebTypes();
  },
  attached() {},
  methods: {
    ...mapActions([
      'fetchWebTypes',
      'fetchNewsItem',
      'clearNewsItem',
      'addNews',
      'updateNews'
    ]),
    save(){
      const textData = $.trim(CKEDITOR.instances.ckEditor.getData())
      const date = moment().format('YYYY-MM-DD HH:mm:ss')
      const id = Date.parse(new Date())/1000

      if(!this.newsData.title){
        this.$notify.error({
          title: '错误',
          message: '请输入标题'
        });
        return false
      }
      //判断新增还是更新
      const newsID = this.$route.params.id
      if(!newsID){ //新增新闻
        this.newsData.date = date
        this.newsData.cont = textData
        this.newsData.id = id
        this.newsData.is = '0'
        this.addNews(this.newsData)
      }else{
        // this.newsData.cont = textData
        // this.newsData.date = date
        this.updateNews(this.newsData)
      }

      this.open = true;
       setTimeout(() => {
         this.open = false;
         this.$router.push({path: '/main/newsList'});
       }, 1000);
    },
    reset(){
      this.$confirm('此操作将重置表单, 是否继续?', '提示', {
         type: 'warning'
       }).then(() => {
         this.$refs.newsForm.resetFields();
        //  for(let key in this.newsData){
        //    this.newsData[key] = ''
        //  }
         CKEDITOR.instances.ckEditor.setData('');
       }).catch(() => {

       });
    }
  },
  components: {}
};
</script>

<style lang="less">
.editor{width: 682px;}
#cke_1_contents{height: 380px !important;}
.el-notification{top: 20% !important}
</style>
