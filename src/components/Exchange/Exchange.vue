<template>
  <div class="content-main cabinet">
    <div class="page-title">
      <div class="page-title-text mo">{{ $t('exchange.title') }}</div>
      <PremiumTitle />
    </div>

    <div v-if="loader" class="loader">
      {{ $t('exchange.loader') }}
    </div>

    <div v-else-if="!loader && blockService">
      <div class="notification is-info">
        {{ $t('exchange.unavailable') }}
      </div>
    </div>

    <div v-else-if="!loader && !blockService" class="exchange-block">
      <div class="exchange" :class="{flip: flip}">
        <div class="exchange-wrap exchange-wrap-left">
          <div class="exchange-top">
            <div class="select">
              <select :disabled="loaderSend" @change="changeBalance($event, !flip ? 'from' : 'to')">
                <option v-for="(item, key) in balances" :key="key" :value="key" :selected="(!flip && fromSelect === key) || (flip && toSelect === key)">{{ key.toUpperCase() }}</option>
              </select>
            </div>
            <div>
              <div class="balance mo">{{ balances[!flip ? fromSelect: toSelect].toFixed(8)}}</div>
              <div class="balance-name">{{ $t('exchange.balance') }}</div>
            </div>
          </div>
          <div class="exchange-center">
            <div class="name mo">{{ !flip ? nameFrom : nameTo }}</div>
            <div class="price">1 {{ (!flip ? fromSelect : toSelect).toUpperCase() }} = {{ rateUsd[!flip ? fromSelect : toSelect] }}$</div>
          </div>
          <div class="exchange-down">
            <div class="amount"><input type="text" class="mo" v-model.number="oneAmount" @keyup="changeAmount(!flip ? 'from' : 'to')" :disabled="loaderSend"></div>
            <div class="ex-buttons">
              <a class="button-style" @click="setAmountMin(!flip ? 'from' : 'to')">min</a>
              <a class="button-style" @click="setAmountMax(!flip ? 'from' : 'to')">max</a>
            </div>
          </div>

        </div>
        <div class="exchange-wrap exchange-wrap-right">
          <div class="exchange-top">
            <div class="select">
              <select :disabled="loaderSend" @change="changeToBalance">
                <option v-for="(item, key) in balances" :key="key" :value="key" :selected="(!flip && toSelect === key) || (flip && fromSelect === key)">{{ key.toUpperCase() }}</option>
              </select>
            </div>
            <div>
              <div class="balance mo">{{ balances[!flip ? toSelect : fromSelect].toFixed(8) }}</div>
              <div class="balance-name">{{ $t('exchange.balance') }}</div>
            </div>
          </div>
          <div class="exchange-center">
            <div class="name mo">{{ !flip ? nameTo : nameFrom }}</div>
            <div class="price">1 {{ (!flip ? toSelect : fromSelect).toUpperCase() }} = {{ rateUsd[!flip ? toSelect : fromSelect] }}$</div>
          </div>
          <div class="exchange-down">
            <div class="amount"><input type="text" class="mo" v-model.number="twoAmount" @keyup="changeAmount(!flip ? 'to' : 'from')" :disabled="loaderSend"></div>
            <div class="ex-buttons">
              <a class="button-style" @click="setAmountMin(!flip ? 'to' : 'from')">min</a>
              <a class="button-style" @click="setAmountMax(!flip ? 'to' : 'from')">max</a>
            </div>
          </div>
        </div>

        <div class="reverse"><a :class="{active:flip}" @click="reverse"><font-awesome-icon icon="exchange-alt" /></a></div>

        <div class="rate">
          <div class="rate-block">
            <div class="rate-text rasp mo"><span>1 {{ fromSelect.toUpperCase() }}</span> <span class="separator">=</span> {{ exchangeRate }} {{ toSelect.toUpperCase() }}</div>
            <div class="rate-loader"><ExchangeTimer/></div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button v-if="!success" @click="send()" class="button-style" :disabled="loaderSend">{{ $t('exchange.exchangeBtn') }}</button>
        <div v-else class="button-success"><font-awesome-icon icon="check-circle" /><span>{{ $t('exchange.success') }}</span></div>
      </div>
    </div>

    <ExchangeList :reload="success" />

  </div>
</template>

<script>
  import PremiumTitle from '../Cabinet/PremiumTitle'
  import ExchangeTimer from './ExchangeTimer'
  import ExchangeList from './ExchangeList'
  export default {
    name: 'Exchange',
    components: { ExchangeList,  ExchangeTimer, PremiumTitle },
    data() {
      return {
        loader: true,
        loaderSend: true,
        success: false,
        flip: false,
        names: [],
        minAmount: [],
        rate: null,
        rateUsd: null,
        blockService: true,
        fromSelect: null,
        toSelect: null,
        oneAmount: 0,
        twoAmount: 0,
        fromAmount: 0,
        toAmount: 0,
        refreshTimer: 1000,
        refreshSec: 60,
        refreshTicker: null,
        token: null,
        changeType: 'from'
      }
    },
    created () {
      this.fromSelect = this.$store.getters.getSelectCurr
      this.toSelect = this.fromSelect

      this.loadExchangeData(true)
    },
    beforeDestroy () {
      this.refreshTimer = 1000
      this.refreshSec = 60
      this.token = null
      clearInterval(this.refreshTicker)
    },
    watch: {
      oneAmount: function(value) {
        if (!this.flip) this.fromAmount = value
        else this.toAmount = value
      },
      twoAmount: function(value) {
        if (!this.flip) this.toAmount = value
        else this.fromAmount = value
      },
      fromAmount: function(value) {
        if (!this.flip) this.oneAmount = value
        else this.twoAmount = value
      },
      toAmount: function(value) {
        if (!this.flip) this.twoAmount = value
        else this.oneAmount = value
      }
    },
    computed: {
      balances() {
        return this.$store.getters.getBalances
      },
      exchangeRate: function () {
        if (this.rate === null) {
          return 0
        }

        let ret = this.decimalAdjust('floor', this.rate[this.fromSelect][this.toSelect], -8).toFixed(8)
        return ret.replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1')
      },
      nameFrom: function () {
        let name = ""
        for (let i=0; i<this.names.length; i++) {
          if (this.names[i].acronym.toLowerCase() === this.fromSelect) {
            name = this.names[i].name
          }
        }
        return name
      },
      nameTo: function () {
        let name = ""
        for (let i=0; i<this.names.length; i++) {
          if (this.names[i].acronym.toLowerCase() === this.toSelect) {
            name = this.names[i].name
          }
        }
        return name
      }
    },
    methods: {
      loadExchangeData: function (isFirst) {
        this.loaderSend = true
        this.refreshTimer = 1000
        this.refreshSec = 60
        clearInterval(this.refreshTicker)

        this.axios.get('/api/exchange?t=' + new Date().getTime())
          .then(response => {

            if (response.data.status === 'success') {

              this.names        = response.data.data.names
              this.minAmount    = response.data.data.minimum
              this.blockService = response.data.data.disable
              this.rate         = response.data.data.rate
              this.rateUsd      = response.data.data.usd
              this.token        = response.data.data.token

              if (isFirst === true) {
                for (let key in this.balances) {
                  if (this.fromSelect !== key) {
                    this.toSelect = key
                  }
                }

                this.fromAmount = this.minAmount[this.fromSelect]
                this.changeFromAmount()

                this.loader = false
              } else {
                // обновляем данные которые введены
                if (this.changeType === "from") {
                  this.changeFromAmount()
                } else {
                  this.changeToAmount()
                }
              }

              //this.loaderMain = false
              this.loaderSend = false

              this.refreshTicker = setInterval(() => {
                this.refreshSec--
                this.refreshTimer -= (1000-750) / 60

                if (this.refreshSec <= 0) {
                  this.loadExchangeData(false)
                }
              }, 1000)
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      send: function() {
        if (this.loaderSend) return
        this.loaderSend = true

        this.axios.post('/api/exchange', {amount: this.fromAmount, from_curr: this.fromSelect, to_curr: this.toSelect, token: this.token})
          .then(response => {
            this.loaderSend = false
            if (response.data.status === 'success') {
              this.success = true
              this.loadExchangeData(false)

              setTimeout(() => {
                this.success = false
              }, 3000)
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 3000}).then()
            }
          })
          .catch( () => {
            this.loaderSend = false
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })

      },
      changeBalance: function(e, type) {
        if (type === 'from') this.changeFromBalance(e)
        if (type === 'to') this.changeToBalance(e)
      },
      changeFromBalance: function(e) {
        if (this.loader) return
        if (e.target.value === this.toSelect) {
          this.toSelect = this.fromSelect
        }

        this.changeType = "from"
        this.fromSelect = e.target.value
        this.changeFromAmount()
      },
      changeToBalance: function (e) {
        if (this.loader) return
        if (e.target.value === this.fromSelect) {
          this.fromSelect = this.toSelect
        }

        this.changeType = "to"
        this.toSelect = e.target.value
        this.changeToAmount()
      },
      setAmountMin: function(type) {
        if (type === 'from') this.setFromAmount(this.minAmount[this.fromSelect])
        if (type === 'to') this.setToAmount(this.minAmount[this.toSelect])
      },
      setAmountMax: function(type) {
        if (type === 'from') this.setFromAmount(this.balances[this.fromSelect])
        else this.setToAmountMax()
      },
      setFromAmount: function (value) {
        this.fromAmount = value
        this.changeFromAmount()
      },

      setToAmountMax: function() {
        this.setFromAmount(this.balances[this.fromSelect])
      },
      setToAmount: function (value) {
        this.toAmount = value
        this.changeToAmount()
      },
      changeAmount: function(type) {
        if (type === 'from') this.changeFromAmount()
        if (type === 'to') this.changeToAmount()
      },
      changeFromAmount: function() {

        this.toAmount = this.decimalAdjust('floor', this.fromAmount * this.rate[this.fromSelect][this.toSelect], -8)
      },
      changeToAmount: function() {
        this.fromAmount = this.decimalAdjust('ceil', this.toAmount / this.rate[this.fromSelect][this.toSelect], -8)
      },
      reverse: function() {
        this.flip = !this.flip

        let oldValue = this.fromSelect
          this.fromSelect = this.toSelect
          this.toSelect = oldValue

          this.fromAmount = 0
          this.toAmount = 0
      },
      decimalAdjust: function (type, value, exp) {
        // Если степень не определена, либо равна нулю...
        if (typeof exp === 'undefined' || +exp === 0) {
          return Math[type](value)
        }
        value = +value
        exp = +exp
        // Если значение не является числом, либо степень не является целым числом...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
          return NaN
        }
        // Сдвиг разрядов
        value = value.toString().split('e')
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))
        // Обратный сдвиг
        value = value.toString().split('e')
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
      },
    }
  }
</script>



<style lang="scss" scoped>
  .exchange-block {
    padding-top: 40px;
    .exchange {
      display: flex;
      justify-content: space-between;
      position: relative;
      transition: .5s ease-in-out;

      .exchange-wrap {
        flex: 1;
        border-radius: 8px;
        background-color: $color-blue-dark;
        position: relative;
        display: flex;
        flex-direction: column;

        transition: .5s ease-in-out;
        padding: 20px 30px;

        > div {
          display: flex;
          justify-content: space-between;
        }

        .exchange-top {
          align-items: flex-start;
          margin-bottom: 20px;
          .select {
            display: flex;
            justify-content: space-between;
            align-items: center;
            > select {
              height: 40px;
              padding-top: 11px;
            }
          }
          .balance {
            font-size: 28px;
            font-weight: bold;
          }
          .balance-name {
            text-align: right;
            font-size: 14px;
            line-height: 10px;
            color: $color-blue;
          }
        }
        .exchange-center {
          align-items: flex-end;
          //margin-bottom: 20px;
          .name {
            text-align: left;
            color: $color-blue;
            font-size: 30px;
            font-weight: bold;
          }
          .price {
            color: $color-red;
            font-size: 14px;
          }
        }
        .exchange-down {
          align-items: flex-end;
          margin-bottom: 10px;
          .amount {
            text-align: left;

            input {
              width: 100%;
              max-width: 275px;
              padding: 5px 0;
              font-size: 32px;
              font-weight: bold;
              background-color: $color-blue-dark;
              color: #FFF;
              border: none;
              border-bottom: 1px solid $color-red;
            }
          }

          .ex-buttons {
            display: flex;
            > a {
              color: $color-red;

              box-shadow: none;
              width: 40px;
              height: 40px;
              line-height: 36px;
              font-weight: normal;
              &:last-of-type {
                margin-left: 8px;
              }
            }
          }
        }

        &.exchange-wrap-left {
          margin-right: 20px;
        }
      }
      &.flip {
        .exchange-wrap {
          &.exchange-wrap-left {
            margin-right: 0;
            transform: translateX(calc(100% + 20px));
          }
          &.exchange-wrap-right {
            margin-right: 20px;
            transform: translateX(-100%);
          }
        }
        .rate {
          //transform: rotateX(360deg);
        }
      }
      .reverse {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(50% - 21px);
        z-index: 1;
        display: flex;
        align-items: center;
        > a {
          vertical-align: middle;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 34px;
          width: 41px;
          background-color: #3f3f78;
          border: 0.5px solid #3f3f78;
          border-radius: 4px;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.20);

          svg {
            font-size: 22px;
            transition: .5s ease;
          }

          &:hover {
            border-color: $color-red;
            box-shadow: none;

            svg {
              transform: rotateY(180deg);
            }
          }
        }
      }
      .rate {
        position: absolute;
        display: flex;
        justify-content: center;
        bottom: -30px;
        left: 0;
        right: 0;
        transition: .5s ease-in-out;

        .rate-block {
          padding: 5px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #3f3f78;
          border: 1px solid $color-blue;
          border-radius: 6px;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.20);
          .rate-text {
            font-weight: bold;
            font-size: 18px;
            .separator {
              margin: 0 3px;
              color: #FFF;
            }
          }
          .rate-loader {
            margin-left: 20px;
          }
        }
      }

      @media screen and (max-width: 1023px){
        flex-direction: column;
        align-items: center;
        .exchange-wrap {
          max-width: 500px;
          flex: 1;
          border-radius: 8px;
          background-color: $color-blue-dark;
          position: relative;
          display: flex;
          flex-direction: column;

          transition: .5s ease-in-out;
          padding: 20px 30px;

          > div {
            display: flex;
            justify-content: space-between;
          }
          .exchange-top {
            align-items: flex-start;
            margin-bottom: 20px;
            .select {
              display: flex;
              justify-content: space-between;
              align-items: center;
              > select {
                height: 40px;
                padding-top: 11px;
              }
            }
            .balance {
              font-size: 22px;
              font-weight: bold;
            }
            .balance-name {
              text-align: right;
              font-size: 14px;
              line-height: 10px;
              color: $color-blue;
            }
          }
          .exchange-center {
            align-items: flex-end;
            //margin-bottom: 20px;
            .name {
              text-align: left;
              color: $color-blue;
              font-size: 30px;
              font-weight: bold;
            }
            .price {
              color: $color-red;
              font-size: 14px;
            }
          }
          .exchange-down {
            align-items: flex-end;
            margin-bottom: 10px;
            .amount {
              text-align: left;

              input {
                width: 100%;
                max-width: 275px;
                padding: 5px 0;
                font-size: 32px;
                font-weight: bold;
                background-color: $color-blue-dark;
                color: #FFF;
                border: none;
                border-bottom: 1px solid $color-red;
              }
            }

            .ex-buttons {
              display: flex;
              > a {
                color: $color-red;

                box-shadow: none;
                width: 40px;
                height: 40px;
                line-height: 36px;
                font-weight: normal;
                &:last-of-type {
                  margin-left: 8px;
                }
              }
            }
          }

          &.exchange-wrap-left {
            margin: 0 0 40px 0;
          }
        }
        &.flip {
          .exchange-wrap {
            &.exchange-wrap-left {
              margin: 0;
              transform: translateY(calc(100% + 40px));
            }
            &.exchange-wrap-right {
              margin: 0 0 40px 0;
              transform: translateY(-100%);
            }
          }
          .rate {
            //transform: rotateX(360deg);
          }
        }
        .reverse {
          transform: rotate(90deg);
          > a {
            svg {
              font-size: 22px;
              transition: .5s ease;
            }

            &.active {
              svg {
                transform: rotateY(180deg) !important;
              }
            }
            &:hover {
              border-color: $color-red;
              box-shadow: none;

              svg {
                transform:none;
              }
            }
          }

        }
      }
    }

    .buttons {
      margin-top: 70px;
      > button {
        padding: 5px 30px;
        font-size: 20px;
      }
    }
  }
</style>
