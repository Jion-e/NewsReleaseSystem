<template lang="html">
  <div class="editor">
    <el-form :model="newsData" :rules="formRule" ref="newsForm" label-width="100px">

      <el-form-item prop="title" label="新闻标题">
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

      <!-- <el-form-item label="上传图片">
          <input type="file" name="name" id="upload" value="">
          <el-button type="primary" @click.native="uploadImg">上传</el-button>
      </el-form-item> -->

      <el-form-item label="发布日期">
        <el-date-picker
          v-model="newsData.date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="内容编辑">
        <textarea v-model="newsData.text" id="ckEditor" name="ckEditor" cols="20" rows="2" class="ckeditor"></textarea>
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
      newsData: {},
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
      'newsItem'
    ])
  },
  mounted (){
    CKEDITOR.replace( 'ckEditor', {
      language: 'zh-cn',
      // filebrowserUploadUrl:"http://ccqr.themistech.cn:80/servlet/UploadServerlet?type=image"
      filebrowserUploadUrl: "http://127.0.0.1:3000/upload"
    });

    const vm = this
    //
    // uploadBtn.addEventListener('click', function(){
    //   alert('ss')
    //   // vm.uploadImg
    // })
    const uploadBtn = document.getElementById("cke_157_label")
    if(!!uploadBtn){
      uploadBtn.addEventListener("click", function(){
        alert('ss')
      });
    }
    this.$nextTick(function () {


    })

    // $('#cke_105_label').click(function(){
    //   debugger
    //   vm.uploadImg()
    // })
    //进入页面加载数据
    const newsID = this.$route.params.id
    this.fetchNewsItem(newsID)

    if(newsID){
      setTimeout(() =>{
        this.newsData = this.newsItem
        CKEDITOR.instances.ckEditor.setData(this.newsItem.cont)
      }, 1000)
    }else{
      this.newsData = {
        id: '',
        wType: '',
        mType: '',
        title: '',
        cont: '',
        date: '',
        creatTime: '',
        is: '0'
      }
    }
    this.fetchWebTypes();
  },
  attached() {},
  methods: {
    ...mapActions([
      'fetchWebTypes',
      'fetchNewsItem',
      'addNews',
      'updateNews',
      'uploadImg'
    ]),
    save(){
      const textData = $.trim(CKEDITOR.instances.ckEditor.getData())
      const creatTime = moment().format('YYYY-MM-DD HH:mm:ss')
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

      if(!newsID){ //新增
        this.newsData.id = id
        this.newsData.cont = textData
        this.newsData.creatTime = creatTime
        this.newsData.date = moment(this.newsData.date).format('YYYY-MM-DD')
        this.addNews(this.newsData)
      }else{ //更新
        this.newsData.cont = textData
        this.newsData.date = moment(this.newsData.date).format('YYYY-MM-DD')
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
