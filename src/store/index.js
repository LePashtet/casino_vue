import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import moduleSocket from "./socket"
import moduleBalance from './balance'
import moduleChat from './chat'
import modulePtcAds from './ptcads'
import moduleGames from './games'

Vue.use(Vuex)

export default new Vuex.Store( {
  state: {
    apiServer: process.env.VUE_APP_API,
    authServer: process.env.VUE_APP_API_AUTH,

    modalAuth: false,
    notifData: {
      index: 0,
      data: []
    },

    isAuth: false,
    auth: {
      session: null,
      hash: null,
      username: null,
      avatar: null,
      premium: 0
    },

    isChatOpen: false,
    captchaKey: '6LfD59EUAAAAAIpkRJI1uvPHVbGo5V1aIbsVZAB1',
    host: 'https://freebitme.com',
    name: 'freebitme',
    version: localStorage.getItem('version') || null,
    timeSiteStart: 1585161862,
    isMobile: false
  },
  getters: {
    getApiServer: state => state.apiServer,
    getAuthServer: state => state.authServer,
    getModalAuth: state => state.modalAuth,
    getNotifData: state => state.notifData.data,
    getNotifIndex: state => state.notifData.index,

    getAuthToken: state => state.auth.session,

    isAuth: state => state.isAuth,
    getUsername: state => state.auth.username,
    getUserHash: state => state.auth.hash,
    //getAvatar: state => state.auth.avatar !== null && state.auth.avatar !== '' ? state.authServer + '/api/avatar/' + state.auth.avatar + '.png' : null,
    getAvatar: state => state.auth.avatar !== null && state.auth.avatar !== '' ? state.auth.avatar : null,
    getPremiumEnd: state => state.auth.premium !== undefined ? state.auth.premium : 0,
    getAuthData: state => state.auth,

    isChatOpen: state => state.isChatOpen,
    getCaptchaKey: state => state.captchaKey,
    getHost: state => state.host,
    getName: state => state.name,
    getVersion: state => state.version,
    timeSiteStart: state => state.timeSiteStart,
    isMobile: state => state.isMobile
  },
  mutations: {
    openModalAuth: state => state.modalAuth = true,
    closeModalAuth: state => state.modalAuth = false,

    setVersion: (state, data) => state.version = data,

    addNotif: (state, data) => state.notifData.data.unshift(data),
    addNotifIndex: state => state.notifData.index++,
    closeNotif: (state, index) => {
      for (let i = 0; i < state.notifData.data.length; i++) {
        if (state.notifData.data[i].index === index) {
          state.notifData.data.splice(i, 1)
          i--
        }
      }
    },

    chatToggle: state => {
      /*const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
      if (width <= 768) {
        state.chatData.width = width
      } else {
        state.chatData.width = 334
      }

      state.chatData.countMsg = 0
      */
      state.isChatOpen = !state.isChatOpen
      localStorage.setItem('isChatOpen', state.isChatOpen)

      /*
      if (width <= 768 && state.isChatOpen === true) {
        document.getElementsByTagName("body")[0].style.overflow = "hidden"
        document.getElementsByTagName("html")[0].style.overflow = "hidden"
      } else {
        document.getElementsByTagName("body")[0].style.overflow = ""
        document.getElementsByTagName("html")[0].style.overflow = ""
      }
       */
    },
    /*
    openUserPage: (state, hash) => {
      console.log(hash)
      Vue.prototype.$Progress.start()
    },
    */
    chatClose: state => {
      state.isChatOpen = false
      localStorage.setItem('isChatOpen', state.isChatOpen)
      /*
      document.getElementsByTagName("body")[0].style.overflow = ""
      document.getElementsByTagName("html")[0].style.overflow = ""
      */
    },
    chatOpen: state => {
      state.isChatOpen = true
      localStorage.setItem('isChatOpen', state.isChatOpen)
      /*
      document.getElementsByTagName("body")[0].style.overflow = ""
      document.getElementsByTagName("html")[0].style.overflow = ""
      */
    },
    updateAvatar: (state, value) => state.auth.avatar = value,
    auth: (state, data) => {
      axios.defaults.headers.common['Authorization']  = 'Bearer ' + data.session
      localStorage.setItem('auth', data.session)

      state.isAuth = true
      state.auth.session = data.session
      state.auth.hash = data.hash
      state.auth.username = data.username
      state.auth.avatar = data.avatar
      state.auth.premium = data.premium
    },
    logout: state => {
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('auth')
      state.isAuth = false
      state.auth.session = null
      state.auth.username = null
    },
    setPremiumTime: (state, value) => state.auth.premium = value,
    setScreenResolution: (state, payload) => state.isMobile = payload
  },
  actions: {
    addNotif: (context, data) => {
      data.index = context.getters.getNotifIndex + 1
      context.commit('addNotifIndex')
      context.commit('addNotif', data)
      if (data.timer !== false) {
        setTimeout(function () {
          context.commit('closeNotif', data.index)
        }, data.timer)
      }
    },
  },
  modules: {
    moduleSocket,
    moduleBalance,
    moduleChat,
    modulePtcAds,
    moduleGames,
  }
})
