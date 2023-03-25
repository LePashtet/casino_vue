export default {
  methods: {
    getTxUrl: function (curr, txid) {
      let prefix = ''
      if (curr === 'btc') {
        prefix = 'https://www.blockchain.com/btc/tx/'
      } else if (curr === 'eth') {
        prefix = 'https://etherscan.io/tx/'
      } else if (curr === 'ltc') {
        prefix = 'https://chainz.cryptoid.info/ltc/tx.dws?'
      } else if (curr === 'doge') {
        prefix = 'https://blockchair.com/dogecoin/transaction/'
      } else if (curr === 'bch') {
        prefix = 'https://blockchair.com/bitcoin-cash/transaction/'
      } else if (curr === 'xrp') {
        prefix = 'https://bithomp.com/explorer/'
      }
      return prefix + txid
    },
  }
};
