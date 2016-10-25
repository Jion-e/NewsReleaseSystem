import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters'
import * as actions from './actions'
Vue.use(Vuex);

const state = {
    newsItem: {},
    newsList: [],
    webTypes: {},
    moduleTypes: {},
}
const mutations = {
    GET_NEWSLIST(state, newsList){ //获取新闻列表
      state.newsList = newsList
    },
    GET_NEWSITEM(state, newsItem){ //获取新闻信息
      state.newsItem = newsItem
    },
    GET_WEBTYPES(state, webTypes){  //获取网站类别
      state.webTypes = webTypes
    },
    GET_MODULETYPES(state, moduleTypes){
      state.moduleTypes = moduleTypes  //获取网站模块
    },
    ADD_NEWS(state, newsItem){   //添加新闻
      state.newsItem = newsItem
    },
    UPDATE_NEWS(state, newsItem){  //更新新闻
      state.newsItem = newsItem
    },
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    // strict: debug,
})
