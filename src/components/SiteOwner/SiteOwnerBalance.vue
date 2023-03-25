<template>
  <div class="balance-page">

    <div v-if="loader">
      <Loader />
    </div>

    <div v-else>
      <div class="balance-title">
        <div class="form-back"><a @click="$router.go(-1)"><font-awesome-icon icon="angle-double-left"/>Back</a></div>
        <div class="balance-title-text rasp">Balance service <span>#{{hash}}</span></div>
        <div></div>
      </div>

      <div class="balance-selector">
        <div v-for="(item, key) in balances" :key="key" class="balance-block">
          <div class="balance-name">
            <div><cryptoicon :symbol="item.acronym" size="24" /></div>
            <div>{{item.name}}</div>
          </div>
          <div class="balance-value mo">{{item.amount.toFixed(8)}}</div>

        </div>
      </div>

      <div class="buttons-block">
        <div><button @click="openAction('deposit')" class="button button-style">Deposit</button></div>
        <div><button @click="openAction('withdraw')" class="button button-style">Withdraw</button></div>
      </div>

      <SiteOwnerBalanceGraph :hash="hash" :balances="balances" />

      <div class="balance-menu slider-links">
        <a @click="changeHistoryType('send')" class="slider-link" :class="{active: historyType === 'send'}">Pay out logs</a>
        <a @click="changeHistoryType('logs')" class="slider-link" :class="{active: historyType === 'logs'}">Deposit / Withdraw logs</a>
      </div>

      <div>
        <transition name="fade" mode="out-in">
          <SiteOwnerBalanceSend v-if="historyType === 'send'" :hash="hash" />
          <SiteOwnerBalanceLogs v-if="historyType === 'logs'" :hash="hash" :reload="reloadLogs" />
        </transition>
      </div>
    </div>

    <SiteOwnerBalanceAction v-if="modalAction" :hash="hash" :action="modalActionType" @close="closeAction()" @reload="reloadBalance()" />
  </div>
</template>

<script>
  import SiteOwnerBalanceSend from './SiteOwnerBalanceSend'
  import SiteOwnerBalanceLogs from './SiteOwnerBalanceLogs'
  import SiteOwnerBalanceAction from './SiteOwnerBalanceAction'
  import SiteOwnerBalanceGraph from './SiteOwnerBalanceGraph'
  export default {
    name: 'SiteOwnerBalance',
    components: { SiteOwnerBalanceGraph, SiteOwnerBalanceAction, SiteOwnerBalanceLogs, SiteOwnerBalanceSend },
    props: ['hash'],
    data() {
      return {
        loader: true,
        reloadLogs: false,
        balances: [],
        historyType: 'send',
        modalAction: false,
        modalActionType: 'deposit',

      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/sites/${this.hash}/balance?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.balances = response.data.data

            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      changeHistoryType: function(type) {
        this.historyType = type
      },

      openAction: function(action) {
        this.modalActionType = action
        this.modalAction = true
      },
      closeAction: function() {
        this.modalAction = false
      },
      reloadBalance: function() {
        this.load()
        if (this.historyType === 'logs') this.reloadLogs = !this.reloadLogs
      }
    }
  }
</script>

<style lang="scss" scoped>
  .balance-page {
    margin-top: 60px;

    .balance-title {
      display: flex;
      justify-content: space-between;
      .balance-title-text {
        font-size: 26px;
        font-weight: bold;
      }
    }



    .buttons-block {
      display: flex;
      justify-content: center;
      margin-bottom: 50px;

      .button {
        margin: 0 15px;
        min-width: 13px;
        font-weight: bold;
        font-size: 16px;
        padding: 5px 25px;
      }
    }

    .balance-menu {
      margin-top: 40px;
    }
  }
</style>
