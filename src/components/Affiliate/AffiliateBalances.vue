<template>
  <div class="affiliate-balances">

    <Loader v-if="loader"/>

    <div v-else>

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
        <div><button @click="openWithdraw" class="button button-style">{{ $t('affiliates.balances.withdraw') }}</button></div>
      </div>


      <div class="balance-transactions">

        <Loader v-if="loaderTransactions"/>

        <div v-else-if="transactions.length > 0" class="transactions">
          <div class="transaction-title">{{ $t('affiliates.balances.history') }}</div>
          <div class="transaction-table">

            <table class="full-width">
              <tbody class="items items-border">
                <tr v-for="(item, key) in transactions" :key="key">
                  <td data-label="AMOUNT"><div class="amount amount-left"><cryptoicon :symbol="item.curr" size="16" /> {{ item.amount.toFixed(8) }}</div></td>
                  <td data-label="DATE"><div class="color">{{item.time | printTimeFull}}</div></td>
                </tr>
              </tbody>
            </table>

          </div>
          <div class="transaction-pages">
            <Pagination :total-page="currentTotal" :current-page="currentPage" @btn-click="changePage" />
          </div>
        </div>

      </div>

    </div>

    <AffiliateBalancesAction v-if="openAction" :balances="balances" @close="closeWithdraw" @reload="reloadData" />
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  import AffiliateBalancesAction from './AffiliateBalancesAction'
  export default {
    name: 'AffiliateBalances',
    components: { AffiliateBalancesAction, Pagination },
    data() {
      return {
        loader: true,
        loaderTransactions: true,
        openAction: false,
        balances: [],
        transactions: [],
        currentTotal: 0,
        currentPage: 1
      }
    },
    created () {
      this.load()
      this.loadLogs(this.currentPage)
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/affiliate/balances?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {
              this.balances = response.data.data

              this.loader = false
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      reloadData: function() {
        this.load()
        this.loadLogs(this.currentPage)
      },
      openWithdraw: function() {
        this.openAction = true
      },
      closeWithdraw: function() {
        this.openAction = false
      },
      loadLogs: function(page) {
        this.loaderTransactions = true

        this.axios.get(`/api/affiliate/balances/logs/${page}?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.transactions = response.data.data.transactions
              this.currentTotal = response.data.data.pages
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loaderTransactions = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      changePage: function(value) {
        this.currentPage = value
        this.loadLogs(this.currentPage)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .affiliate-balances {


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
  }
</style>
