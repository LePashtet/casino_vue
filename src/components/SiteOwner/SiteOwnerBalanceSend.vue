<template>
  <div>
    <div v-if="loader">
      <Loader />
    </div>

    <div v-else class="transactions">

      <div class="transaction-table">

        <table class="full-width">

          <tbody class="items items-border" v-if="transactions.length > 0">
            <tr v-for="(item, key) in transactions" :key="key">
              <td data-label="USER"><div class="color"><span class="desc">to user</span><router-link :to="{name: 'UserPage', params: {hash: item.to_hash }}">#{{ item.to_hash }}</router-link></div></td>
              <td data-label="AMOUNT"><div class="amount amount-left"><cryptoicon :symbol="item.curr" size="16" /> {{ item.amount.toFixed(8) }}</div></td>
              <td data-label="STATUS"><div class="">{{ item.status }}</div></td>
              <td data-label="DATE"><div class="color">{{item.time | printTimeFull}}</div></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4" class="has-text-centered">No transactions found</td>
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
    name: 'SiteOwnerBalanceSend',
    components: { Pagination },
    props: ['hash'],
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
    methods: {
      load: function(page) {
        this.loader = true

        this.axios.get(`/api/sites/${this.hash}/balance/send/${page}?t=${new Date().getTime()}`)
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

</style>
