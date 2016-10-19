'use strict'
const Login = resolve => require(['./pages/login.vue'], resolve)
const Main = resolve => require(['./pages/main.vue'], resolve)
const NewsList = resolve => require(['./components/v-newsList.vue'], resolve)
const NewsAdd = resolve => require(['./components/v-newsAdd.vue'], resolve)

export const routes = [
  {path: '/', name: '登录', component: Login},
  {path: '/main', name: '主页面', component: Main,
    children: [
      {path: '/', name: '', component: NewsList},
      {path: 'newsList', name: '新闻列表', component: NewsList},
      {path: 'newsAdd', name: '添加新闻', component: NewsAdd},
      {path: 'newsAdd/:id', name: '添加新闻', component: NewsAdd},
    ]
  },
]
