import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDxUppBRTczs5FWVfmQaiqKve6zaw1_-_I",
  authDomain: "newssystem-2b6d6.firebaseapp.com",
  databaseURL: "https://newssystem-2b6d6.firebaseio.com",
  storageBucket: "newssystem-2b6d6.appspot.com",
  messagingSenderId: "830388281949"
}
firebase.initializeApp(config)

const db = firebase.database().ref()
const newsListRef = db.child('newsList')
const webTypesRef = db.child('webTypes')
const newsItemRef = newsID => db.child('newsList/' + newsID)
const newsExistRef = newsListRef.orderByChild('is').equalTo('0')
const newsWebRef = webType => newsListRef.orderByChild('wType').equalTo(webType)
const newsPageRef = page => newsListRef.orderByChild('is').equalTo('0').limitToFirst(page)
const newsDateRef = date => newsListRef.orderByChild('date').startAt(date.startTime).endAt(date.endTime)

let newsListArr = []
let newsItem = {}
  /**
   * 获取新闻列表
   * @param  {[String]} e       [触发事件]
   * @param  {[String]} ref     [数据节点]
   * @param  {[String]} errText [错误信息]
   * @return {[Promise]}        [新闻列表]
   */
const cb = (e, ref, errText) => {
  return new Promise(resolve => {
    newsListArr = []
    ref.on(e, snapshot => {
      newsListArr.push(snapshot.val())
      resolve(newsListArr)
    }, err => {
      console.log(`${errText}:` + err.code);
    })
  })
}

export default {
  /*** 查询事件 ****/
  getNewsList() {
      return cb("child_added", newsExistRef, "获取新闻列表失败")
    },

    // getNewsListByPage(page, count) {
    //   const newsPageRef = newsListRef.orderByChild('is').equalTo('0').limitToFirst(page)
    //   newsPageRef.on('child_added', snapshot => {
    //     snapshot.forEach(data => {
    //       newsListArr.push(data.val())
    //     })
    //   }, err => {
    //     console.log("The read getNewsListByPage failed: " + err.code);
    //   })
    //   return newsListArr
    // },

    getNewsListById(newsID) {
      return cb("value", newsItemRef(newsID), "通过新闻序号获取新闻列表失败")
    },

    getNewsListByText(keyWord) {
      const newsTextRef = ''
    },

    getNewsListByDate(date) {
      return cb("child_added", newsDateRef(date), "通过日期获取新闻列表失败")
    },

    getNewsListByWeb(webType) {
      return cb("child_added", newsWebRef(webType), "通过所属获取新闻列表失败")
    },

    /**
     * 获取所属网站列表
     * @return {[Promise]} [所属网站列表]
     */
    getWebTypes() {
      return new Promise(resolve => {
        webTypesRef.on('value', snapshot => {
          resolve(snapshot.val())
        }, err => {
          console.log("获取所属网站列表失败:" + err.code);
        })
      })
    },
    /**
     * 获取新闻详情
     * @param  {[String]} newsID [新闻序号]
     * @return {[Promise]}        [新闻详情]
     */
    getNewsItem(newsID) {
      const newsIdRef = firebase.database().ref('newsList/' + newsID)
      newsItem = {}
      return new Promise(resolve => {
        newsIdRef.on('value', snapshot => {
          newsItem = snapshot.val()
          resolve(newsItem)
        }, err => {
          console.log("获取新闻详情失败:" + err.code);
        })
      })
    },
    /**
     * 新增新闻
     * @param {[Object]} newsItem [新闻详情]
     */
    addNews(newsItem) {
      newsItemRef(newsItem.id).set(newsItem)
    },
    /**
     * 更新新闻
     * @param {[Object]} newsItem [新闻详情]
     */
    updateNews(newsItem) {
      newsItemRef(newsItem.id).update(newsItem)
    },
    /**
     * 删除新闻
     * @param {[String]} newsID [新闻序号]
     */
    deleteNews(newsID) {
      newsItemRef(newsItem.id).update({
        'is': '1'
      })
    },
}
