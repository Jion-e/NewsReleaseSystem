export const webTypes = state => state.webTypes
export const webTypesArr = state => {
  const arr = []
  for (let key in state.webTypes){
    arr.push(state.webTypes[key])
  }
  return arr
}
export const moduleTypes = state => state.moduleTypes
export const newsList = state => state.newsList
export const newsItem = state => state.newsItem
export const userInfo = state => state.userInfo
// export const newsData = (state, page) => {
//   const allNews = state.newsList
//   let count
//   if(!(page && count)){
//     page = 1
//     count = 5
//   }else{
//     page = parseInt(page)
//     count = parseInt(count)
//   }
//   console.log(allNews.slice((page -1), count));
//   return allNews.slice((page -1), count)
// }
