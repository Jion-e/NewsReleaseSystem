import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters'
import * as actions from './actions'
Vue.use(Vuex);

// const state = {
//     newsItem: {
//       id: '',         //唯一ID
//       type: '',       //所属网站
//       title: '',      //新闻标题
//       cont: '',       //新闻内容 (HTML)
//       date: '',       //日期 (2016-05-20)
//       detele: '',     //是否删除 (0:没删除, 1:删除)
//     },
//     newsList: [],
//     webTypes: {
//       id: '',         //网站id  (0:信用轻工网, 1:星数科技官网, )
//       name: '',       //网站名称
//     },
// }
const state = {
    newsItem: {},
    newsList: [],
    webTypes: [],
}
const mutations = {
    GET_NEWSLIST(state, newsList){ //获取新闻列表
      state.newsList = newsList
    },
    GET_WEBTYPES(state, webTypes){  //获取网站类别
      state.webTypes = webTypes
    },
    ADD_NEWS(state, newsItem){   //添加新闻
      state.newsItem = newsItem;
      state.newsList.push(newsItem);
    }
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: debug,
})
