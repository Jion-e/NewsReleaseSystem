<template lang="html">
  <div class="newsContainer">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main/newsList' }">新闻列表</el-breadcrumb-item>
      <el-breadcrumb-item>新闻预览</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="news">
      <h1 class="news__title" v-text="newsItem.title"></h1>
      <div class="news__cont"  v-html="newsItem.cont"></div>
    </div>

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
      'newsItem'
    ])
  },
  mounted() {
    debugger
    const newsID = this.$route.params.id
    this.fetchNewsItem(newsID)
  },
  attached() {},
  methods: {
    ...mapActions([
      'fetchNewsItem'
    ])
  },
  components: {}
};
</script>

<style lang="less">
  .el-breadcrumb__item{font-size: 14px;}
  .newsContainer{width: 80%;min-height: 500px;margin: 50px auto;
    .news{margin-top: 20px;padding: 5px;box-shadow: 0 0 3px #20A0FF;}
    .news__title{text-align: center;margin: 10px 0;}
    .news__cont p{text-indent: 28px;margin-bottom: 10px;}
  }

</style>
