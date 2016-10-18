import Vue from 'vue';
import App from './app';
import store from './store'
import { routes } from './routes';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)

import './assets/css/animate.min.css'
import './assets/css/myToggle.less'
import './assets/css/FontAwesome/font-awesome.css'
import './assets/js/waves.js'


const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
