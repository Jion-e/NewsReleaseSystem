// var config = {
//   apiKey: "AIzaSyDxUppBRTczs5FWVfmQaiqKve6zaw1_-_I",
//   authDomain: "newssystem-2b6d6.firebaseapp.com",
//   databaseURL: "https://newssystem-2b6d6.firebaseio.com",
//   storageBucket: "newssystem-2b6d6.appspot.com",
//   messagingSenderId: "830388281949"
// };
// firebase.initializeApp(config);
//
// const db = firebase.database().ref;
// const newsRef = db.child('newsData');
//
// fetchNewsList = () => {
//   newsRef.on('value', snapshot => {
//       this.getNewsData(snapshot.val());
//   }, err => {
//       console.log("The read failed: " + err.code);
//   })
// })
//
// fetchNewsItem = (id) => {
//
// }
// const _get = ({ url, query }, commit) => {
//   if(commit) commit('START_LOADING')
//   // let _url
//   // if(query){
//   //   _url = `http://m.maizuo.com/v4/api${url}?${query}`
//   // }else{
//   //    _url = `http://m.maizuo.com/v4/api${url}`
//   // }
//   newsRef.on('value', snapshot => {
//     console.log(snapshot.val(););
//     return snapshot.val();
//   }, err => {
//       console.log("The read failed: " + err.code);
//   })
// }

//
// export const fetchNewsList = ({commit}, page, count) => {
//   const url = ''
//   const query = ''
//   return _get({ url, query }, commit)
//   .then((json) => {
//     if(json.status == 0){
//       return commit('FETCH_NEWSLIST', json.data)
//     }
//     return Promise.reject(new Error('fetchNewsList failed'))
//   })
//   .catch((error) => {
//     return Promise.reject(error)
//   })
// }
//
//
let webTypes = [
  {id: 0,name: '信用轻工网'},
  {id: 1,name: '星数科技官网'}
]
let newsList = [
  {id: '10001',type: '0',date: '2016-05-02',title: '今日阳光明媚',cont: ''},
  {id: '10002',type: '1',date: '2016-06-02',title: '今日风调雨顺',cont: ''},
  {id: '10003',type: '0',date: '2016-07-02',title: '今日大雨倾盆',cont: ''},
  {id: '10004',type: '2',date: '2016-05-02',title: '今日阳光明媚',cont: ''},
  {id: '10005',type: '1',date: '2016-05-02',title: '今日阳光明媚',cont: ''},
]

export const fetchWebTypes = ({ commit }) => {
  commit('GET_WEBTYPES', webTypes)
}

export const fetchNewsList = ({ commit }) => {
  commit('GET_NEWSLIST', newsList)
}

export const addNews = ({ commit }, newsItem) => {
  commit('ADD_NEWS', newsItem)
}
