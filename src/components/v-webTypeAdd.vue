<template lang="html">
  <div class="web-add">
    <el-form :model="webAdd" :rules="webAddRule" ref="webAddForm" label-width="100px">

      <el-form-item prop="wkey" label="网站编号">
        <el-input v-model="webAdd.wType.wkey" placeholder="请输入网站首字母缩写"></el-input>
      </el-form-item>

      <el-form-item prop="wname" label="网站名称">
        <el-input v-model="webAdd.wType.wname"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(mType, index) in webAdd.mTypes"
        :label="'模块名称'"
        :mId="mType.mid"
        :prop="'mTypes:' + index"
        :rules="{
          type: 'object', required: true,
          fields: {
            mName: { required: true, message: '模块名称不能为空', trigger: 'blur' }
          }
        }"
      >
        <el-input v-model="mType.name"></el-input>
        <el-button @click.native.prevent="removeDomain(mType)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleSubmit">提交</el-button>
        <el-button @click.native.prevent="addDomain">新增模块</el-button>
      </el-form-item>
    </el-form>
    <p>
      {{webAdd}}
    </p>
    <p>
      {{webTypesArr.length}}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      webAdd: {
        mTypes: [{
          mid: '',
          name: '',
          wid: ''
        }],
        wType: {
          wname: '',
          wid: '',
          wkey: ''
        },
      },
       webAddRule: {
        //  wname: [
        //    { required: true, message: '请输入网站名称', trigger: 'blur' }
        //  ],
        //  wkey: [
        //    { required: true, message: '请输入网站编号', trigger: 'blur' }
        //  ]
       }
    };
  },
  computed: {
    ...mapGetters([
      'webTypesArr'
    ])
  },
  mounted() {
    this.fetchWebTypes()
  },
  attached() {},
  methods: {
    ...mapActions([
      'fetchWebTypes',
      'addWebType'
    ]),
    handleSubmit(ev) {
        this.$refs.webAddForm.validate((valid) => {
          if (valid) {
            const wTypesLength = this.webTypesArr.length
            if(!wTypesLength){
              return false
            }

            this.wType.wid = wTypesLength
            this.addWebType(this.wType)

          } else {
            console.log('error submit!!');
            this.$notify.error({
              title: '错误',
              message: '信息输入不全'
            })

            return false;
          }
        });
      },
      removeDomain(item) {
        var index = this.webAdd.mTypes.indexOf(item)
        if (index !== -1) {
          this.webAdd.mTypes.splice(index, 1)
        }
      },
      addDomain() {
        this.webAdd.mTypes.push({
          mId: this.webAdd.mTypes.length,
          mName: ''
        });
      }
  },
  components: {}
};
</script>

<style lang="less">
  .web-add{
    .el-input{float: left;width: 250px;margin-right: 20px;}
  }
  .el-notification{z-index: 999999}
</style>
