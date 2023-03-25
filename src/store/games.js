import Vue from 'vue'

const moduleGames = {
  state: {
    gameLobby: {
      online: 0,
      games_coin_flip:0,
      games_rps: 0,
    },
    ///////// COINFLIP
    gameLobbyCoinFlip: {
      games: []
    },
    subscribesCoinFlip: {
      create: null,
    },
    ///////// RockPaperScissors
    gameLobbyRps: {
      games: []
    },
    subscribesRps: {
      create: null,
    },

  },
  getters: {
    getGameLobbyOnline: state => state.gameLobby,
    ///////// COINFLIP
    getGameLobbyCoinFlipGames: state => state.gameLobbyCoinFlip.games,
    getSubscribesCoinFlipCreate: state => state.subscribesCoinFlip.create,
    ///////// RockPaperScissors
    getGameLobbyRpsGames: state => state.gameLobbyRps.games,
    getSubscribesRpsCreate: state => state.subscribesRps.create,
  },
  mutations: {
    SOCKET_game_lobby_online: (state, data) => state.gameLobby = data,
    ///////// COINFLIP
    // приходит информация о играх при загрузке страницы игры
    SOCKET_game_coin_flip: (state, data) => state.gameLobbyCoinFlip = data,
    // добавление игры при создании новой
    SOCKET_game_coin_flip_lobby: (state, data) => state.gameLobbyCoinFlip.games.unshift(data),
    // результат игры которая закончилась
    SOCKET_game_coin_flip_result: (state, data) => {
      let objIndex = state.gameLobbyCoinFlip.games.findIndex((obj => obj.id === data.id));
      Vue.set(state.gameLobbyCoinFlip.games, objIndex, data);
    },
    // результат выполнения game_coin_flip_create
    answer_game_coin_flip_create: (state, data) => state.subscribesCoinFlip.create = data,
    delete_GameCoinFlip: (state, data) => {
      let objIndex = state.gameLobbyCoinFlip.games.findIndex((obj => obj.id === data));
      Vue.delete(state.gameLobbyCoinFlip.games, objIndex);
    },
    ///////// RockPaperScissors
    SOCKET_game_rps: (state, data) => state.gameLobbyRps = data,
    SOCKET_game_rps_lobby: (state, data) => state.gameLobbyRps.games.unshift(data),
    SOCKET_game_rps_result: (state, data) => {
      let objIndex = state.gameLobbyRps.games.findIndex((obj => obj.id === data.id));
      Vue.set(state.gameLobbyRps.games, objIndex, data);
    },
    answer_game_rps_create: (state, data) => state.subscribesRps.create = data,
    delete_GameRps: (state, data) => {
      let objIndex = state.gameLobbyRps.games.findIndex((obj => obj.id === data));
      Vue.delete(state.gameLobbyRps.games, objIndex);
    },

  },
  actions: {
    sendSocketGameLobby: (context, data) => {
      Vue.prototype.$socket.sendObj({action: 'game_lobby', data: data})
    },
    ///////// COINFLIP
    sendSocketGameCoinFlip: (context, data) => {
      Vue.prototype.$socket.sendObj({action: 'game_coin_flip', data: data})
    },
    sendSocketGameCoinFlipCreate: (context, data) => {
      Vue.prototype.$socket.sendObj({action: 'game_coin_flip_create', data: data})
    },
    socket_game_coin_flip_create: (context, data) => {
      context.commit('answer_game_coin_flip_create', data)
    },
    socket_game_coin_flip_join: (context, data) => {
      if (data.message) {
        context.dispatch('addNotif', {type: 'danger', text: data.message, isClose: true, timer: 10000}).then()
      }
    },
    sendSocketGameCoinFlipJoin: (context, data) => {
      Vue.prototype.$socket.sendObj({action: 'game_coin_flip_join', data: data});
    },
    deleteGameCoinFlip: (context, data) => {
     context.commit('delete_GameCoinFlip', data)
    },
    ///////// RockPaperScissors
    sendSocketGameRps: (context, data) => {
      Vue.prototype.$socket.sendObj({action: 'game_rps', data: data})
    },
    sendSocketGameRpsCreate: (context, data) => {
      Vue.prototype.$socket.sendObj({action: 'game_rps_create', data: data})
    },
    socket_game_rps_create: (context, data) => {
      context.commit('answer_game_rps_create', data)
    },
    socket_game_rps_join: (context, data) => {
      if (data.message) {
        context.dispatch('addNotif', {type: 'danger', text: data.message, isClose: true, timer: 10000}).then()
      }
    },
    sendSocketGameRpsJoin: (context, data) => {
      Vue.prototype.$socket.sendObj({action: 'game_rps_join', data: data});
    },
    deleteGameRps: (context, data) => {
      context.commit('delete_GameRps', data)
    },
  }
}

export default moduleGames
