<template lang="html">
  <div class="editor">
    <el-form :model="newsData" ref="newsForm" label-width="80px">

      <el-form-item label="所属网站">
        <el-select v-model="newsData.type" placeholder="请选择网站">
         <el-option
           v-for="item in webTypes"
           :label="item.name"
           :value="item.id">
         </el-option>
       </el-select>
      </el-form-item>

      <el-form-item label="新闻标题">
        <el-input v-model="newsData.title"></el-input>
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
export default {
  data() {
    return {
      open: false,
      newsData: {
       id: '',
       type: '',
       title: '',
       cont: '',
       date: '',
       detele: '',
     },
    };
  },
  computed: {
    ...mapGetters([
      'webTypes'
    ])
  },
  mounted (){
    this.fetchWebTypes();
    CKEDITOR.replace( 'ckEditor', {
      language: 'zh-cn',
      filebrowserUploadUrl:"http://ccqr.themistech.cn:80/servlet/UploadServerlet?type=image"
    });
  },
  attached() {},
  methods: {
    ...mapActions([
      'fetchWebTypes',
      'addNews'
    ]),
    save(){
      console.log('newsData:' + JSON.stringify(this.newsData));
      const data =   $.trim(CKEDITOR.instances.ckEditor.getData());
      console.log('content:' + data);
      this.newsData.cont = data;
      this.addNews(this.newsData);
      this.open = true;
       setTimeout(() => {
         this.open = false;
       }, 3000);

    },
    reset(){
      this.$confirm('此操作将重置表单, 是否继续?', '提示', {
         type: 'warning'
       }).then(() => {
         this.$refs.newsForm.resetFields();
         CKEDITOR.instances.ckEditor.setData('');
       }).catch(() => {

       });
    }
  },
  components: {}
};
</script>

<style lang="less">
.editor{
  width: 682px;
}
</style>
