<template lang="html">
  <div class="editor" v-loading.fullscreen="isload">
    <el-form :model="newsData" :rules="formRule" ref="newsForm" label-width="100px">

      <el-form-item prop="title" label="新闻标题">
        <el-input v-model="newsData.title"></el-input>
      </el-form-item>

      <el-form-item label="所属网站">
        <el-select
        v-model="newsData.wType"
        placeholder="请选择网站"
        clearable
        @change="webTypesChange">
         <el-option
           v-for="item in webTypes"
           :label="item.name"
           :value="item.wid">
         </el-option>
       </el-select>
      </el-form-item>

      <el-form-item label="所属模块">
        <el-select v-model="newsData.mType" placeholder="请选择模块" clearable>
         <el-option
           v-for="item in moduleTypes"
           :label="item.name"
           :value="item.mid">
         </el-option>
       </el-select>
      </el-form-item>

      <!-- <el-form-item label="上传图片">
          <input type="file" name="name" id="upload" value="">
          <el-button type="primary" @click.native="uploadImg">上传</el-button>
      </el-form-item> -->

      <el-form-item label="发布日期">
        <el-date-picker
          v-model="newsData.date"
          type="date"
          readonly
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="来源">
        <el-input v-model="newsData.source"></el-input>
      </el-form-item>

      <el-form-item label="内容编辑">
        <textarea id="editor-trigger"  style="height:400px;max-height:500px">
            <p>请输入内容...</p>
        </textarea>
      </el-form-item>

      <el-form-item>
        <el-button
         type="primary"
         v-loading.fullscreen="open"
         @click.native.prevent="save">保存</el-button>
        <el-button @click.native.prevent="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <p>
      {{newsData}}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      open: false,
      empty: {
          id: '',
          wType: '',
          mType: '',
          title: '',
          source: '',
          cont: '',
          date: '',
          creatTime: '',
          is: '0'
      },
      formRule: {
         title: [
           { required: true, message: '请输入新闻标题', trigger: 'blur' },
          //  { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
         ]
       }
    };
  },
  computed: {
    ...mapGetters([
      'webTypes',
      'moduleTypes',
      'newsItem'
    ]),
    isload(){
      const newsID = this.$route.params.id
      if(newsID){
        if(this.newsData.id){
          return false
        }else {
          return true
        }
      }
      return false
    },
    newsData(){
      const newsID = this.$route.params.id

      if(newsID){
        if(this.webTypes.length == 0){
          return this.empty
        }
        if(this.moduleTypes.length == 0){
          return this.empty
        }
        // if(this.newsItem.wType == undefined){
        //   return this.empty
        // }
        // if(this.newsItem.mType == undefined){
        //   return this.empty
        // }
        $('.wangEditor-txt').html(this.newsItem.cont)
        console.log(this.newsItem)
        return this.newsItem
      }else {
        $('.wangEditor-txt').html('')
        return this.empty
      }
    },

  },
  created(){
    // this.pageInit()
  },
  mounted (){
    this.pageInit()
  },
  methods: {
    ...mapActions([
      'fetchWebTypes',
      'fetchModuleTypes',
      'fetchNewsItem',
      'addNews',
      'updateNews',
      'uploadImg'
    ]),
    pageInit(){
      const newsID = this.$route.params.id

      //数据初始化，防止v-model初始化时出错
      this.newsData = this.empty

      this.fetchWebTypes()
      console.log(this.moduleTypes);
      this.fetchNewsItem(newsID)
      this.wangEditorInit()

    },
    /**
     * 富文本编译器初始化
     */
    wangEditorInit(){
      const UPLOAD_SERVER = 'http://testadmin.chinaeid.org:2002/upload'
      const editor = new wangEditor('editor-trigger')
      const vm = this

      editor.config.uploadImgUrl = UPLOAD_SERVER
      editor.onchange = function () {
         //获取编辑器内容
        //  vm.newsData.cont = editor.$txt.html();
         vm.newsData.cont = $('.wangEditor-txt').html()
      }
      editor.create()
    },
    webTypesChange(){
      if(this.newsData.wType){
        this.fetchModuleTypes(this.newsData.wType)
        this.newsData.mType = ''
      }
    },
    /**
     * 保存新闻详情
     */
    save(){
      // debugger
      const creatTime = moment().format('YYYY-MM-DD HH:mm:ss')
      const id = Date.parse(new Date())/1000

      if(!this.newsData.title){
        this.$notify.error({
          title: '错误',
          message: '请输入标题'
        });
        return false
      }

      this.open = true;

      //判断新增还是更新
      const newsID = this.$route.params.id

      if(!newsID){ //新增
        this.newsData.id = id
        this.newsData.creatTime = creatTime
        this.newsData.date = moment(this.newsData.date).format('YYYY-MM-DD')
        this.addNews(this.newsData)
      }else{ //更新
        this.newsData.date = moment(this.newsData.date).format('YYYY-MM-DD')
        this.updateNews(this.newsData)
      }

       setTimeout(() => {
         this.open = false;
         this.$router.push({path: '/main/newsList'});
       }, 500);

    },
    reset(){
      this.$confirm('此操作将重置表单, 是否继续?', '提示', {
         type: 'warning'
       }).then(() => {
         this.clearPage()
       })
    },
    clearPage(){
      this.newsData = this.empty
      // console.log(this.newsData);
      // this.$refs.newsForm.resetFields()
      // $('.editor input').val('')
      // $('.wangEditor-txt').html('')
    }
  },
  components: {}
};
</script>

<style lang="less">
.editor{width: 800px;}
// .el-notification{top: 20% !important}
.wangEditor-container .content{margin: 0}
.wangEditor-fullscreen{margin-top: 60px}
.menu-item i{font-size: 16px;}
.el-notification{z-index: 999999}
</style>
