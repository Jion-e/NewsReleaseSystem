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
const moduleTypesRef = wid => db.child('moduleTypes').orderByChild('wid').equalTo(wid)
const newsItemRef = newsID => db.child('newsList/' + newsID)
const newsExistRef = newsListRef.orderByChild('is').equalTo('0')
const newsWebRef = webType => newsListRef.orderByChild('wType').equalTo(webType)
const newsPageRef = pageSize => newsListRef.orderByChild('is').equalTo('0').limitToFirst(pageSize)
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
  // console.log(ref.toString());
  return new Promise(resolve => {
    newsListArr = []

    //如果查询节点存在就会执行下面的代码，否则直接返回newsListArr为空
    ref.on(e, snapshot => {
      newsListArr.push(snapshot.val())
    }, err => {
      console.log(`${errText}:` + err.code);
    })

    resolve(newsListArr)
  })
}

export default {
  /*** 查询事件 ****/
  getNewsList(pageSize) {
      return cb("child_added", newsPageRef(pageSize), "获取新闻列表失败")
    },

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
        webTypesRef.once('value', snapshot => {
          resolve(snapshot.val())
        }, err => {
          console.log("获取所属网站列表失败:" + err.code)
        })
      })
    },
    /**
     * 获取所属模块列表
     * @param  {[string]} wid [所属网站id]
     * @return {[Promise]}     [所属模块列表]
     */
    getModuleTypes(wid) {
      return new Promise(resolve => {
        moduleTypesRef(wid).once('value', snapshot => {
          resolve(snapshot.val())
        }, err => {
          console.log("获取所属模块列表失败:" + err.code)
        })
      })
    },
    /**
     * 获取新闻详情
     * @param  {[String]} newsID [新闻序号]
     * @return {[Promise]}        [新闻详情]
     */
    getNewsItem(newsID) {

      return new Promise(resolve => {
        newsItemRef(newsID).once('value', snapshot => {
          resolve(snapshot.val())
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
      console.log(newsItem);
      newsItemRef(newsItem.id).update(newsItem)
    },
    /**
     * 删除新闻
     * @param {[String]} newsID [新闻序号]
     */
    deleteNews(newsID) {
      // newsItemRef(newsID).update({
      //   'is': '1'
      // })
      newsItemRef(newsID).remove()
    },
}
