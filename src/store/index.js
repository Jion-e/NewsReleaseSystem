import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var config = {
  apiKey: "AIzaSyDxUppBRTczs5FWVfmQaiqKve6zaw1_-_I",
  authDomain: "newssystem-2b6d6.firebaseapp.com",
  databaseURL: "https://newssystem-2b6d6.firebaseio.com",
  storageBucket: "newssystem-2b6d6.appspot.com",
  messagingSenderId: "830388281949"
};
firebase.initializeApp(config);

const state = {
    newsData: [],
    typeData: [],
}

const mutations = {
    GET_NEWSDATA(state, newsData){ //获取新闻信息
      state.newsData = newsData;
    },
    GET_TYPEDATA(state, typeData){ //获取网站类别
      state.typeData = typeData;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    strict: true,
})


fetchAllNews = () => {
  const newsDataRef = firebase.database().ref().child('newsData');

  newsDataRef.on('value', snapshot => {
      this.getNewsData(snapshot.val());
  }, err => {
      console.log("The read failed: " + err.code);
  })
})

fetchNewsItem = (id) => {
  
}
