import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/rem'
import './assets/css/reset.css'
// import download from './common/fileSave'
import download from './common/download'

import './assets/font/iconfont.css'

import BackTop from './components/comment/BackTop.vue'
import Back from './components/comment/Back.vue'

import tip from "./components/comment/tip/index"

Vue.config.productionTip = false
Vue.component('backTop', BackTop);
Vue.component('back', Back);

Vue.use(tip)
Vue.prototype.$saveFile = download

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')