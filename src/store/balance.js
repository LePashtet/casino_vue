const moduleBalance = {
  state: {
    balances: {},
    selectCurr: 'btc',
  },
  getters: {
    getSelectCurr: state => {
      if (localStorage.selectCurr !== undefined && localStorage.selectCurr !== state.selectCurr) {
        state.selectCurr = localStorage.selectCurr
      }
      return state.selectCurr
    },
    getBalances: state => state.balances,
    getBalance: state => state.balances[state.selectCurr],
  },
  mutations: {
    changeSelectCurr: (state, curr) => {
      state.selectCurr = curr
      localStorage.setItem('selectCurr', state.selectCurr)
    },
    changeCurrBalance: (state, {curr, amount}) => {
      state.balances[curr] = +((state.balances[curr] +  amount).toFixed(8))
    },
    loadBalances: (state, balances) => state.balances = balances
  },
  actions: {
    socket_update_balance: (context, data) => {
      context.commit('changeCurrBalance', {curr: data.curr, amount: data.amount})

      if (data.notif.length > 0) {
        context.dispatch('addNotif', {type: 'balance', data:{text: data.notif, amount: data.amount, curr: data.curr}, isClose: true, timer: 10000}).then()
      }
    }
  }
}
export default moduleBalance
