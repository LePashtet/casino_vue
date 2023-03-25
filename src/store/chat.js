const moduleChat = {
  state: {
    chatData: {
      maxMessages: 50,
      selectChatLang: localStorage.getItem('chatLang') || null,
      countMsg: 0,
      isLoad: false,
      msgData: [],
      share: "",
      languages: [
        {name: 'English',   code: 'en',  icon: 'flag_en.svg'},
        {name: 'Русский',   code: 'ru',  icon: 'flag_ru.svg'},
        {name: 'Español',   code: 'es',  icon: 'flag_es.svg'},
        {name: 'Português', code: 'pt',  icon: 'flag_pt.svg'},
        //{name: 'Filipino',  code: 'ph',  icon: 'flag_ph.svg'},
        //{name: 'Indian',    code: 'in',  icon: 'flag_in.svg'},
        //{name: 'Rage',      code: 'any', icon: 'flag_any.svg'},
      ]
    },
    chatDeleteBan: null,
    chatAds: [],
  },
  getters : {
    getChatLanguages: state => state.chatData.languages,
    getChatIsLoad: state => state.chatData.isLoad,
    getChatMsgData: state => state.chatData.msgData,
    getChatLang: state => {
      if (state.chatData.selectChatLang === null) {
        let lang = navigator.language
        if (lang === undefined || lang === null) {
          return 'en'
        }
        let languages = state.chatData.languages
        for (let key in languages) {
          if (languages.hasOwnProperty(key) && languages[key].code === lang.substr(0, 2).toLowerCase()){
            return languages[key].code
          }
        }
        return 'en'
      }
      return state.chatData.selectChatLang
    },
    getChatAds: state => state.chatAds,
    getChatShare: state => state.chatData.share,
  },
  mutations: {
    chat_load: function(state, messages) {
      clearInterval(state.chatDeleteBan)
      state.chatData.msgData = []
      state.chatData.isLoad = false

      state.chatData.msgData = messages.data
      state.chatData.isLoad = true

      let newInterval = () => {
        let date = Math.round((new Date()).getTime() / 1000)

        // delete old ban messages
        for (let lang in state.chatData.msgData) {
          if (state.chatData.msgData.hasOwnProperty(lang) && state.chatData.msgData[lang].length > 0) {
            for (let i = 0; i < state.chatData.msgData[lang].length; i++) {
              if (state.chatData.msgData[lang][i].type === "ban" && state.chatData.msgData[lang][i].time + 60 < date) {
                state.chatData.msgData[lang].splice(i, 1)
                i--
              }
            }
          }
        }
      }

      newInterval()
      state.chatDeleteBan = setInterval(() => {
        newInterval()
      }, 30000)
    },

    pushChatData: (state, data) => {
      state.chatData.msgData[data.lang].push(data)

      if (state.chatData.msgData[data.lang].length > state.chatData.maxMessages) {
        state.chatData.msgData[data.lang].splice(0, 1)
      }
    },
    changeChatLang: (state, lang) => {
      state.chatData.selectChatLang = lang
      localStorage.setItem('chatLang', lang)
    },
    setChatShare: (state, payload) => {
      state.chatData.share = payload
    },
    SOCKET_chat_ads_load: (state, data) => {
      //console.log('ads load socket', data)
      state.chatAds = data
    },
    SOCKET_chat_ads: (state, data) => {
      let adsTmp = []
      for (let i=1; i<state.chatAds.length; i++) {
        adsTmp[i] = state.chatAds[i-1]
      }
      adsTmp[0] = data
      state.chatAds = adsTmp
      //console.log(state.chatAds)
    },
  },
  actions: {
    chat_new: (context, data) => {
      if (context.getters.getChatIsLoad === true) {
        context.commit('pushChatData', data)

        if (data.data !== undefined && data.data.data !== undefined && data.data.data.users !== undefined && data.data.data.users !== null) {
          for (let i = 0; i < data.data.data.users.length; i++) {
            if (data.data.data.users[i].hash === context.getters.getAuthData.hash) {
              // user mark in chat

              if (!context.getters.isChatOpen || data.lang !== context.getters.getChatLang) {
                let message = {
                  isMessage: true,
                  user: {
                    avatar: data.user.avatar,
                    username: data.user.username,
                    rating: data.user.rating,
                  },
                  text: data.lang.toUpperCase() + ' chat: ' + data.data.text,
                }
                context.dispatch('addNotif', {type: 'info', text: message, isClose: false, timer: 3000}).then()
              }
            }
          }
        }

        //if (!context.getters.isChatOpen && data.lang === context.getters.getChatLang) {
        //  context.commit('addChatCount')
        //}
      }
    },


  }
}
export default moduleChat
