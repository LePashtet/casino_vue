<template>
  <div class="exchange-transactions">

    <div v-if="loader">
      <Loader />
    </div>

    <div v-else class="transactions">
      <div class="transaction-title">History</div>
      <div class="transaction-table">

        <table class="full-width">

          <tbody class="items" v-if="transactions.length > 0">
            <tr v-for="(item, key) in transactions" :key="key">
              <td data-label="HASH"><div class="color">#{{ item.hash }}</div></td>
              <td data-label="FROM"><div class="amount amount-left"><cryptoicon :symbol="item.curr_from" size="16" /> {{ item.amount_from.toFixed(8) }}</div></td>
              <td class="arrow-center"><div><div><font-awesome-icon icon="long-arrow-alt-right" /></div></div></td>
              <td data-label="TO"><div class="amount amount-right">{{ item.amount_to.toFixed(8) }} <cryptoicon :symbol="item.curr_to" size="16" /></div></td>
              <td data-label="DATE"><div class="color">{{item.time | printTimeFull}}</div></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" class="has-text-centered">No transactions found</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="transaction-pages">
        <Pagination :total-page="currentTotal" :current-page="currentPage" @btn-click="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  export default {
    name: 'ExchangeList',
    components: { Pagination },
    props: ['reload'],
    data() {
      return {
        loader: true,
        transactions: [],
        currentTotal: 0,
        currentPage: 1
      }
    },
    created () {
      this.load(this.currentPage)
    },
    watch: {
      reload: function(value) {
        if (value === true) this.load(this.currentPage)
      }
    },
    methods: {
      load: function(page) {
        this.loader = true

        this.axios.get(`/api/exchange/list/${page}?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.transactions = response.data.data.transactions
              this.currentTotal = response.data.data.pages
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      changePage: function(value) {
        this.currentPage = value
        this.load(this.currentPage)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .exchange-transactions {
    margin: 50px 0;
  }

  .transactions .transaction-table table .items td.arrow-center {
    width: 34px;

    > div {
      > div {
        background-color: #3f3f78;
        border-radius: 4px;
        margin: 0 4px;
      }
    }
  }
  .amount {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  .amount-left {
    justify-content: flex-end;
  }
  .amount-right {
    justify-content: flex-start;
  }
</style>
