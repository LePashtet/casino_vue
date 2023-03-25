import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Cryptoicon from 'vue-cryptoicon'
import VueNativeSock from 'vue-native-websocket'
//import VueProgressBar from 'vue-progressbar'
import VueCookie from 'vue-cookie'
import Loader from './components/Loader'

import 'typeface-open-sans'
import 'typeface-montserrat'

import './utils/filters'

import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import './utils/icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Loader', Loader)

import { Btc, Eth, Usd } from 'vue-cryptoicon/src/icons'
import Fbm from './utils/icon_fbm'

Cryptoicon.add([Btc, Eth, Usd, Fbm])
Vue.use(Cryptoicon)
Vue.use(VueCookie)

import VueClipboard from 'vue-clipboard2';
import i18n from './i18n'
Vue.use(VueClipboard)

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

//Vue.use(VueProgressBar, options)


Vue.config.productionTip = false


Vue.use(VueNativeSock, store.getters.getDomainWs + "?t=" + new Date().getTime(), {
  store: store,
  format: 'json',
  //reconnection: true,
  //reconnectionAttempts: Infinity,
  //reconnectionDelay: 3000,
  connectManually: true,
  passToStoreHandler: function (eventName, event) {
    //console.log(event)
    if (!eventName.startsWith('SOCKET_')) { return }
    let target = eventName.toUpperCase()
    let msg = event

    if (this.format === 'json' && event.data) {
      msg = JSON.parse(event.data)
      if (msg.action) {

        if ('socket_'+msg.action in this.store._actions) {
          this.store.dispatch('socket_'+msg.action, msg.data).then()
          return
        }

        if ('SOCKET_'+msg.action in this.store._mutations) {
          this.store.commit('SOCKET_'+msg.action, msg.data)
          return
        }
      }
    }
    this.store['commit'](target, msg)
  }
})


//axios.defaults.baseURL = store.getters.getApiServer
axios.defaults.withCredentials = true

Vue.use(VueAxios, axios)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuth) {
      next({path: '/', query: { redirect: to.fullPath } })
      return
    }
  }
  next() // make sure to always call next()!
})


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

