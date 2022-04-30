import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
/** 解决移动端点击延迟事件 移动端浏览器在派发点击事件的时候，通常会出现300ms左右的延迟 */
import fastclick from 'fastclick'
/** 图片懒加载 */
import VueLazyload from 'vue-lazyload'
import store from './store'
import './common/scss/index.scss'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3300'

fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyload, {
    loading: require('./common/image/default.png')
})

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
