import api from '../api'
import storage from '../api/storage'

export const fetchWebTypes = ({ commit }) => {
  api.getWebTypes().then(types => {
      commit('GET_WEBTYPES', types)
  })
}

// export const fetchNewsList = ({ commit }, page, count) => {
//   api.getNewsList().then(data => {
//     // console.log('page:'+ data);
//     commit('GET_NEWSLIST', data)
//   })
// }
//
export const fetchNewsList = ({ commit }, pageSize) => {
  api.getNewsList(pageSize).then(data => {
    // console.log('page:'+ data);
    commit('GET_NEWSLIST', data)
  })
}

export const fetchNewsListById = ({ commit }, newsID) => {
  api.getNewsListById(newsID).then(data => {
      commit('GET_NEWSLIST', data)
  })
}

export const fetchNewsListByDate = ({ commit }, date) => {
  api.getNewsListByDate(date).then(data => {
      // console.log('date:'+ data);
      commit('GET_NEWSLIST', data)
  })
}

export const fetchNewsListByWeb = ({ commit }, webType) => {
  api.getNewsListByWeb(webType).then(data => {
      // console.log('date:'+ data);
      commit('GET_NEWSLIST', data)
  })
}

export const fetchNewsItem = ({ commit }, newsID) => {
  api.getNewsItem(newsID).then(data => {
      commit('GET_NEWSITEM', data)
  })
}

export const clearNewsItem = ({ commit }) => {
  commit('CLEAR_NEWSITEM')
}

export const addNews = ({ commit }, newsItem) => {
  api.addNews(newsItem)
}

export const updateNews = ({ commit }, newsItem) => {
  api.updateNews(newsItem)
}

export const deleteNews = ({ commit }, newsID) => {
  api.deleteNews(newsID)
}

export const uploadImg = ({ commit }) => {
  storage.uploadImage()
}
