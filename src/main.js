import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Mint from 'bh-mint-ui2';
import route from './router';
import * as utils from './utils'
import api from './api'
import axios from 'axios'
import 'bh-mint-ui2/lib/style.css'
Vue.use(Mint);
Vue.use(VueRouter);

if (window.smile) {
  window.Vue = Vue
  window.axios = axios
  if (WEBPACK_CONIFG_HOST) {
    window.WEBPACK_CONIFG_HOST = WEBPACK_CONIFG_HOST
  }
  // 初始化eventBus
  window.smile.eventBus = new Vue()
}

const router = new VueRouter(route);

router.beforeEach((to, from, next) => {
  // 加载页面smile依赖
  if (window.smile && to.meta.require && to.meta.require.length > 0) {
    var require = to.meta.require
    var promiseArr = []
    require.map(function (item) {
      if (!window.smile.components[item]) {
        promiseArr.push(window.smile.loadPage(item))
      }
    })
    if (promiseArr.length > 0) {
      Promise.all(promiseArr).then(function () {
        next()
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
