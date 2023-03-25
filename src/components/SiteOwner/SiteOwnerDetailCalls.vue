<template>
  <div>

    <Loader v-if="loader" />

    <div v-else>

      <div class="transactions">
        <div class="transaction-title">API calls history</div>
        <div class="transaction-table">

          <table class="full-width">

            <tbody class="items items-border" v-if="transactions.length > 0">
              <tr v-for="(item, key) in transactions" :key="key">
                <td data-label="METHOD"><div class="color">{{ item.method }}</div></td>
                <td data-label="DATA">
                  <div class="api-data"><font-awesome-icon icon="eye" /><div><pre>{{item.data}}</pre></div></div>
                </td>

                <td data-label="IP"><div class="">{{ item.ip }}</div></td>
                <td data-label="DATE"><div class="color">{{item.time | printTimeFull}}</div></td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4" class="has-text-centered">No history found</td>
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
</template>

<script>
  import Pagination from '../Pagination'
  export default {
    name: 'SiteOwnerDetailCalls',
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

        this.axios.get(`/api/sites/${this.hash}/detail/calls/${page}?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.transactions = response.data.data.transactions
              for (let i=0; i<this.transactions.length; i++) {
                this.transactions[i].data = JSON.stringify(JSON.parse(this.transactions[i].data), undefined, 2)
              }
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
      },
      printJson: function(data) {

        console.log(data)
        console.log(JSON.stringify(JSON.parse(data), undefined, 2))
        return JSON.stringify(JSON.parse(data), undefined, 2)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .api-data {

    position: relative;
    > div {
      z-index: 1;
      visibility: hidden;
      opacity: 0;
      position: absolute;
      background-color: #000;
      padding: 10px 15px;
      border-radius: 8px;

      > pre {
        font-size: 0.8rem;
        line-height: 1.2;
        font-family: "Lucida Console", Monaco, monospace;
        text-align: left;
      }
    }
    &:hover {
      > div {
        visibility: visible;
        opacity: 1;
      }
    }
  }
</style>
