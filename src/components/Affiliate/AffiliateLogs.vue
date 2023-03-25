<template>
  <Loader v-if="loader"/>

  <div v-else class="transactions affiliate-logs">
    <div class="transaction-title">{{ $t('affiliates.logs.title') }}</div>
    <div class="transaction-table">

      <table class="full-width">

        <thead>
          <tr>
            <td>{{ $t('other.username') }}</td>
            <td>{{ $t('affiliates.campaign') }}</td>
            <td>{{ $t('other.amount') }}</td>
            <td>{{ $t('other.pay') }}</td>
            <td>{{ $t('affiliates.percent') }}</td>
            <td>{{ $t('other.type') }}</td>

            <td>{{ $t('other.time') }}</td>
          </tr>
        </thead>
        <tbody class="items items-border" v-if="transactions.length > 0">
          <tr v-for="(item, key) in transactions" :key="key">
            <td data-label="USERNAME"><div class="color">{{item.username}}</div></td>
            <td data-label="CAMPAIGN"><div class="color">{{item.campaign}}</div></td>
            <td data-label="AMOUNT"><div class="amount amount-left"><cryptoicon :symbol="item.curr" size="16" /> {{ item.amount.toFixed(8) }}</div></td>
            <td data-label="PAY"><div class="amount amount-left"><cryptoicon :symbol="item.curr" size="16" /> {{ item.pay.toFixed(8) }}</div></td>
            <td data-label="PERCENT"><div class="">{{item.percent}}%</div></td>
            <td data-label="TYPE"><div class="">{{printType(item.type)}}</div></td>

            <td data-label="DATE"><div class="color">{{item.time | printTimeFull}}</div></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="7" class="has-text-centered">{{ $t('affiliates.logs.noLogs') }}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'AffiliateLogs',
    data() {
      return {
        loader: true,
        transactions: [],
      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/affiliate/logs?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {
              this.transactions = response.data.data.transactions
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      printType: function(type) {
        switch (type) {
          case 'hostobit':
            return 'Hostobit'
          case 'ptcclaim':
            return 'Paid ADs'
          default:
            return '-'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .affiliate-logs {
    margin-top: 40px;
  }
</style>
