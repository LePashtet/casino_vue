<template>
  <Loader v-if="loader"/>

  <div v-else class="transactions transactions-users">
    <div class="transaction-title">{{ $t('affiliates.users.title') }}</div>
    <div class="transaction-table">

      <table class="full-width">

        <thead>
          <tr>
            <td>{{ $t('affiliates.campaign') }}</td>
            <td>{{ $t('other.username') }}</td>

            <td>{{ $t('other.time') }}</td>
          </tr>
        </thead>
        <tbody class="items items-border" v-if="transactions.length > 0">
          <tr v-for="(item, key) in transactions" :key="key">
            <td data-label="CAMPAIGN"><div class="color">{{item.campaign}}</div></td>
            <td data-label="USERNAME"><div class="link"><router-link :to="{name: 'UserPage', params: {hash: item.hash}}">{{item.username}}</router-link></div></td>

            <td data-label="DATE"><div class="color">{{item.time | printTimeFull}}</div></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3" class="has-text-centered">{{ $t('affiliates.users.noUsers') }}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'AffiliateUsers',
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

        this.axios.get(`/api/affiliate/users?t=${new Date().getTime()}`)
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .transactions-users {
    margin-top: 40px;
    .link {
      a {
        text-decoration: underline;
      }
    }
  }
</style>
