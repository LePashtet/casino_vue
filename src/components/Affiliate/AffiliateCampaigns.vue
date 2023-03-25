<template>
  <div>
    <Loader v-if="loader"/>

    <div v-else class="transactions affiliate-campaigns">
      <div class="affiliate-campaigns-title">
        <div class="transaction-title">{{ $t('affiliates.campaigns.title') }}</div>
        <div><a @click="openAction" class="button-create">{{ $t('affiliates.campaigns.new') }} <font-awesome-icon :icon="['far', 'plus-square']"/></a></div>
      </div>
      <div class="transaction-table">

        <table class="full-width campaigns-table">

          <thead>
            <tr>
              <td>{{ $t('other.name') }}</td>
              <td>{{ $t('other.link') }}</td>

              <td>{{ $t('affiliates.campaigns.create') }}</td>
              <td></td>
            </tr>
          </thead>
          <tbody class="items items-border" v-if="transactions.length > 0">
            <tr v-for="(item, key) in transactions" :key="key">
              <td data-label="NAME"><div class="">{{item.name}}</div></td>
              <td data-label="LINK"><div class="color">https://freebitme.com/?r={{item.link}}</div></td>


              <td data-label="DATE"><div class="color">{{item.time | printTimeFull}}</div></td>
              <td>
                <div class="edit-buttons">
                  <router-link :to="{name: 'AffiliateBanners', params: {campaign: item.hash}}"><font-awesome-icon icon="link" size="xs" /></router-link>
                  <router-link :to="{name: 'AffiliateDashboard', params: {campaign: item.hash}}"><font-awesome-icon icon="chart-line" size="xs" /></router-link>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4" class="has-text-centered">{{ $t('affiliates.campaigns.noLogs') }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

    <AffiliateCampaignCreate v-if="openModal" @close="closeAction" @reload="reloadAction" />
  </div>
</template>

<script>
  import AffiliateCampaignCreate from './AffiliateCampaignCreate'
  export default {
    name: 'AffiliateCampaigns',
    components: { AffiliateCampaignCreate },
    data() {
      return {
        loader: true,
        openModal: false,
        transactions: [],
      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/affiliate/campaigns?t=${new Date().getTime()}`)
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
      openAction: function() {
        this.openModal = true
      },
      closeAction: function() {
        this.openModal = false
      },
      reloadAction: function() {
        this.load()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .affiliate-campaigns.transactions {
    margin-top: 40px;
    .affiliate-campaigns-title {
      display: flex;
      justify-content: space-between;
    }
    .transaction-table table.campaigns-table {
      table-layout: auto;

      .items td {
        width: auto;
      }
    }
  }
</style>
