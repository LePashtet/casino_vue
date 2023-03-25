<template>
  <div class="affiliate-dashboard">

    <Loader v-if="loader"/>

    <div v-else>
      <div v-if="!loaderCampaigns" class="dashboard-title-block">
        <div></div>
        <div class="campaign-selector">
          <AffiliateCampaignSelect :all="true" :campaigns="campaigns" :select="selectHash" @change="changeCampaign" />
        </div>
      </div>

      <div class="dashboard-commissions">
        <span class="rasp mo">{{ $t('affiliates.dashboard.commission') }}<span>:</span></span>
        <span class="rasp mo">{{ $t('affiliates.dashboard.ads') }}<span>{{dashboard.percents.ptcclaim}}%</span></span>
        <span class="rasp mo">{{ $t('affiliates.dashboard.offer') }} <span>{{dashboard.percents.offerwall}}%</span></span>
        <span class="rasp mo">{{ $t('other.premium') }} <span>{{dashboard.percents.premium}}%</span></span>
        <span class="rasp mo">{{ $t('other.hostobit') }} <span>{{dashboard.percents.hostobit}}%</span></span>
      </div>

      <div class="dashboard-top-stat">

        <div class="style-input style-input-left">
          <div class="">
            <div class="">{{ $t('other.user') }}</div>
            <input class="input-clear" type="text" :value="dashboard.users" disabled >
          </div>
        </div>

        <div class="style-input style-input-left">
          <div class="">
            <div class="">{{ $t('affiliates.menu.hits') }}</div>
            <input class="input-clear" type="text" :value="dashboard.hits" disabled >
          </div>
        </div>

        <div class="style-input style-input-left">
          <div class="">
            <div class="">{{ $t('affiliates.dashboard.reg') }}</div>
            <input class="input-clear" type="text" :value="dashboard.registrations" disabled >
          </div>
        </div>

        <div class="style-input style-input-left">
          <div class="">
            <div class="">{{ $t('affiliates.dashboard.active') }}</div>
            <input class="input-clear" type="text" :value="dashboard.users_active" disabled >
          </div>
        </div>

        <div class="style-input style-input-left">
          <div class="">
            <div class="">{{ $t('affiliates.dashboard.counts') }}</div>
            <input class="input-clear" type="text" :value="dashboard.paid_count" disabled >
          </div>
        </div>

      </div>

      <div class="dashboard-paid">

        <div v-for="(item, key) in dashboard.paid" :key="key" class="paid-block">
          <div class="balance-name">
            <div><cryptoicon :symbol="item.acronym" size="24" /></div>
            <div>{{item.name}}</div>
          </div>
          <div class="balance-value mo rasp"><span>{{ $t('affiliates.dashboard.count') }}:</span> {{item.count}}</div>
          <div class="balance-value mo rasp"><span>{{ $t('affiliates.dashboard.amount') }}:</span> {{item.amount.toFixed(8)}}</div>
          <div class="balance-value mo rasp"><span>{{ $t('affiliates.dashboard.paid') }}:</span> {{item.paid.toFixed(8)}}</div>
        </div>

      </div>

      <div class="dashboard-graph-stat-title mo">{{ $t('affiliates.dashboard.stats') }}</div>

      <div v-if="!loaderGraph" class="dashboard-graph">
        <div class="dashboard-graph-title">{{ $t('affiliates.dashboard.hits') }}</div>
        <ChartBlock :labels="graphDate" :chartdata="graphHits" :legend="false" datalabel="" class="dashboard-chart" />
      </div>


      <div v-if="!loaderGraph" class="dashboard-graph">
        <div class="dashboard-graph-title">{{ $t('affiliates.dashboard.counts') }}</div>
        <ChartBlock :labels="graphDate" :chartdata="graphPaid" :legend="false" datalabel="" class="dashboard-chart" />
      </div>
    </div>

  </div>
</template>

<script>
  import AffiliateCampaignSelect from '@/components/Affiliate/AffiliateCampaignSelect'
  import ChartBlock from '@/components/ChartBlock'
  export default {
    name: 'AffiliateDashboard',
    components: { ChartBlock, AffiliateCampaignSelect },
    props: ['campaign'],
    data() {
      return {
        loader: true,
        loaderCampaigns: true,
        loaderGraph: true,
        campaigns: [],
        dashboard: null,
        selectCampaign: 0,
        selectHash: '',
        graphDate: [],
        graphHits: {},
        graphPaid: [],
      }
    },
    created () {
      this.load()
      this.loadDashboard(this.selectHash)
      this.loadGraph(this.selectHash)
    },
    methods: {
      load: function() {
        this.loaderCampaigns = true

        this.axios.get(`/api/affiliate/campaigns?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {
              this.campaigns = response.data.data.transactions

              if (this.campaign !== undefined) {
                for (let i=0; i<this.campaigns.length; i++) {
                  if (this.campaigns[i].hash === this.campaign) {
                    this.selectCampaign = i
                    this.selectHash = this.campaigns[this.selectCampaign].hash
                  }
                }
              }

            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loaderCampaigns = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      loadDashboard: function(campaign) {
        this.loader = true

        let urlData = `/api/affiliate/dashboard?t=${new Date().getTime()}`
        if (campaign !== '') {
          urlData = `/api/affiliate/dashboard/${campaign}?t=${new Date().getTime()}`
        }

        this.axios.get(urlData)
          .then(response => {
            if (response.data.status === 'success') {
              this.dashboard = response.data.data
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      loadGraph: function(campaign) {
        this.loaderGraph = true

        let urlData = `/api/affiliate/graph?t=${new Date().getTime()}`
        if (campaign !== '') {
          urlData = `/api/affiliate/graph/${campaign}?t=${new Date().getTime()}`
        }

        this.axios.get(urlData)
          .then(response => {
            if (response.data.status === 'success') {
              this.graphDate = response.data.data.date
              this.graphHits = response.data.data.hits
              this.graphPaid = response.data.data.paid_count
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loaderGraph = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      changeCampaign: function(hash) {
        if (hash === '') {
          this.selectCampaign = 0
          this.selectHash = ''
        } else {
          for (let i = 0; i < this.campaigns.length; i++) {
            if (this.campaigns[i].hash === hash) {
              this.selectCampaign = i
              this.selectHash = this.campaigns[this.selectCampaign].hash
            }
          }
        }

        this.loadDashboard(this.selectHash)
        this.loadGraph(this.selectHash)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .affiliate-dashboard {
    .dashboard-title-block {
      display: flex;
      justify-content: space-between;
    }
    .dashboard-commissions {
      display: flex;
      justify-content: flex-start;
      > span {
        margin-right: 10px;
        padding-right: 10px;
        display: inline-flex;
        align-items: center;
        border-right: 1px solid $color-blue;
        > span {
          font-weight: bold;
          font-size: 20px;
          margin-left: 5px;
        }
        &:first-of-type {
          font-size: 20px;
          font-weight: bold;
          padding-left: 5px;
          border-right: 0;
          padding-right: 0;
        }
        &:last-of-type  {
          border-right: 0;
        }
      }

      @media screen and (max-width: 768px){
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > span {
          border: none;
        }
      }

    }
    .dashboard-top-stat {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .style-input-left {
        margin: 10px;
        > div {
          > div {
            width: 100px;
          }
          > input {
            width: 60px;
          }
        }
      }
    }
    .dashboard-paid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 20px;
      .paid-block {
        background-color: $color-blue-dark;
        border-radius: 8px;
        margin: 10px 20px;
        padding: 20px 30px;
        box-shadow: 0 15px 13px rgba(0, 14, 68, 0.15);
        .balance-name {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: $color-blue;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 10px;
          > div {
            display: flex;
            align-items: center;
            &:first-of-type {
              margin-right: 5px;
            }
          }
        }
        .balance-value {
          text-align: left;
          font-size: 16px;
          font-weight: bold;
          //margin-bottom: 15px;
          > span {
            width: 95px;
            display: inline-block;
          }
        }
      }
    }

    .dashboard-graph-stat-title {
      margin-top: 20px;
      font-size: 32px;
      font-weight: bold;
      text-align: left;
    }

    .dashboard-graph {
      margin-top: 20px;
      position: relative;
      .dashboard-graph-title {
        top: 50px;
        width: 100%;

        position: absolute;
        font-size: 32px;
        font-weight: bold;
        z-index: 0;
        opacity: 0.3;
        text-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
      }
      .dashboard-chart {
        position: relative;
        height: 200px;
        z-index: 1;
        overflow: auto;

        > canvas {
          position: absolute;
          min-width: 620px;
          min-height: 200px;
        }
      }
    }
  }
</style>
