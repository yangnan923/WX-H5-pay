import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import http from 'common/httpRequest.js'
Vue.prototype.$http = http

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
