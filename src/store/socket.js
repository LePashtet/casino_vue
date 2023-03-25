import Vue from 'vue'

const moduleSocket = {
  state: {
    domains_ws: process.env.VUE_APP_WS,
    socketTimeout: null,
    isAuthSocket: false,
    isConnectedSocket: false,
    socketSubscribes: {
      update_help_data: null,
      update_payout: null,
      chat_send: null,
    },
  },
  getters: {
    getDomainWs: state => state.domains_ws,
    isConnectedSocket: state => state.isConnectedSocket,
    socketSubscribesChatSend: state => state.socketSubscribes.chat_send,
  },
  mutations: {
    SOCKET_ONERROR: (state, event) => {
      console.log("Error on socket server")
      console.error(event)
    },
    SOCKET_RECONNECT: () => {
      console.log('reconnection')
    },
    SOCKET_RECONNECT_ERROR: () => {
      console.log('reconnection error')
    },
    SOCKET_ONMESSAGE: (state, message) => {
      //SOCKET_ONMESSAGE: () => {
      console.log('ack message')
      console.log(message)
    },
    SOCKET_ONCLOSE: (state, event) => {
      clearTimeout(state.socketTimeout)
      console.log('close')
      console.log(event)

      //state.chatData.msgData = []
      //state.chatData.isLoad = false

      console.log('disconnect socket')
      state.isAuthSocket = false
      state.isConnectedSocket = false

      //state.statMainLoad = false

      setTimeout(() => {
        Vue.prototype.$connect()
      }, 3000)
    },
    SOCKET_ONOPEN: (state) => {
      console.log('connect socket')

      state.isAuthSocket = false
      state.isConnectedSocket = true

      //state.isPageLoad = true

      clearTimeout(state.socketTimeout)

      state.socketTimeout = setTimeout(() => {
        Vue.prototype.$disconnect()

        console.log('no ping after connect')
      }, 35000);
    },

    socketActive: (state) => {
      clearTimeout(state.socketTimeout)

      state.socketTimeout = setTimeout(() => {
        Vue.prototype.$disconnect()

        console.log('no ping')
      }, 35000);
    },
    socketAuthStatus: (state, status) => state.isAuthSocket = status,
    SOCKET_chat_send: (state, data) => state.socketSubscribes.chat_send = data,
    subscribe_chat_send: state => state.socketSubscribes.chat_send = null,
  },
  actions: {
    socket_auth: (context, msg) => {
      if (msg.status === 'success') {
        context.commit('socketAuthStatus', true)
      } else if (msg.status === 'error' && msg.message === 'Authentication error') {
        context.dispatch('addNotif', {type: 'danger', text: msg.message, isClose: true, timer: false}).then()
      } else {
        context.commit('socketAuthStatus', false)
      }
    },
    socket_chat_load: (context, message) => {
      context.commit('chat_load', message)
    },
    socket_chat_new: (context, data) => {
      context.dispatch('chat_new', data).then()
    },
    socket_ping: (context) => {
      //console.log('ping')
      context.commit('socketActive')
      context.dispatch('sendSocketPong', null).then()
    },
    sendSocketAuth: (context) => {
      console.log('send auth')
      Vue.prototype.$socket.sendObj({action: 'auth', data: context.getters.getAuthToken})
    },
    sendSocketPong: (context, data) => {
      Vue.prototype.$socket.sendObj({action: 'pong', data: data})
    },
    sendSocketChatSend: (context, data) => {
      Vue.prototype.$socket.sendObj({action: 'chat_send', data: data})
    },
  }
}

export default moduleSocket
