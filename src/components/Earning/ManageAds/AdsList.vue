<template>
  <div>

    <div v-if="loader">
      <Loader/>
    </div>

    <div v-else-if="campaignsAll <= 0 && campaignsActive <= 0">
      <div class="no-campaigns">You don't have any active ad campaigns</div>
      <div><router-link to="/cabinet/earning/ads/manage/campaigns/new" class="button button-style button-create">Create a new campaign</router-link></div>
    </div>

    <div v-else-if="campaignsAll > 0 && campaignsActive <= 0">
      <div class="no-campaigns">You cannot create ads because you don't have any active ad campaigns.</div>
    </div>

    <div v-else>

      <div v-if="create === 'success'" class="notification is-success notif-create">
        <div>Your advert is created successfully</div>
      </div>

      <div v-if="close > 0" class="notification is-success notif-create">
        <div>Your advert is close successfully</div>
        <div style="display: inline-flex; align-items: center">Refund: {{close}} <cryptoicon symbol="fbm" size="20" /></div>
      </div>

      <div class="transactions">
        <div class="transaction-table">

          <table class="full-width">

            <tbody class="items items-border" v-if="adverts.length > 0">
              <tr v-for="(item, key) in adverts" :key="key">
                <td data-label="HASH"><div class="color">#{{ item.hash }}</div></td>
                <td data-label="CAMPAIGN"><div class=""><span class="desc">campaign</span>{{ item.campaign }}</div></td>
                <td data-label="VIEWS"><div><span class="desc">views</span>{{item.viewed}}/{{item.views}}</div></td>
                <td data-label="DURATION"><div><span class="desc">duration</span>{{item.duration}}sec</div></td>
                <td data-label="STATUS">
                  <div v-if="item.status === 'active' || item.status === 'pause'">
                    <button v-if="item.status === 'active'" @click="changeStatus(item.hash, false)" :disabled="item.loader" class="button button-pause">PAUSE <font-awesome-icon icon="pause"/></button>
                    <button v-if="item.status === 'pause'" @click="changeStatus(item.hash, true)" :disabled="item.loader" class="button button-start">START <font-awesome-icon icon="play"/></button>
                  </div>
                  <div v-else class="color">{{item.status}}</div>
                </td>
                <td>
                  <div class="edit-buttons">
                    <router-link :to="{name: 'EarningAdsManageAdsDetail', params: {hash: item.hash}}" title="Statistics"><font-awesome-icon icon="chart-bar" size="xs"/></router-link>
                    <a v-if="item.status === 'active' || item.status === 'pause'" @click="archive(item.hash)" title="Archive"><font-awesome-icon icon="trash-alt" size="xs"/></a>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="has-text-centered">You don't have any ads</td>
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
  import Pagination from '../../Pagination'
  export default {
    name: 'EarningAdsList',
    components: { Pagination },
    props: ['create'],
    data() {
      return {
        loader: true,

        adverts: [],
        currentTotal: 0,
        currentPage: 0,

        campaignsAll: 0,
        campaignsActive: 0,
        close: 0,
      }
    },
    created () {
      this.load(this.currentPage)
    },
    methods: {
      load: function(page) {
        this.loader = true

        this.axios.get(`/api/ptc/manage/adverts/${page}?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.adverts = response.data.data.transactions
              this.currentTotal = response.data.data.pages

              this.campaignsAll = response.data.data.data.all
              this.campaignsActive = response.data.data.data.active
              if ( this.campaignsActive <= 0 ) {
                this.$emit('hide', true)
              } else {
                this.$emit('hide', false)
              }
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
      archive: function(hash) {
        if (confirm(`Are you sure you want to archive advert "${hash}"?`)) {
          this.loader = true

          this.axios.delete(`/api/ptc/manage/adverts/${hash}`)
            .then(response => {
              if (response.data.status === 'success') {
                this.load(this.currentPage)
                this.close = response.data.data
              } else {
                this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
                this.loader = false
              }

            })
            .catch(() => {
              this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
            })
        }
      },
      changeStatus: function(hash, value) {
        for (let key in this.adverts) {
          if (this.adverts.hasOwnProperty(key) && this.adverts[key].hash === hash) {
            this.adverts[key].loader = true
          }
        }

        this.axios.post(`/api/ptc/manage/adverts/${hash}/status`, {value: value})
          .then(response => {
            if (response.data.status === 'success') {

              for (let key in this.adverts) {
                if (this.adverts.hasOwnProperty(key) && this.adverts[key].hash === hash) {
                  this.adverts[key].status = value?'active':'pause'
                  this.adverts[key].loader = false
                }
              }
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
          })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .notif-create {
    padding: 5px 20px;
  }
  .no-campaigns {
    margin: 10px 0 20px 0;
    font-weight: bold;
  }
  .button-pause {
    border-width: 1px;
    background-color: $color-blue;
    border-color: #ACB0FF;
    color: #ACB0FF;
    font-weight: bold;
    &:hover {
      color: #FFF;
      border-color: #FFF;
    }
  }
  .button-start {
    border-width: 1px;
    background-color: #6C4365;
    border-color: $color-red;
    color: $color-red;
    font-weight: bold;
    &:hover {
      color: #FFF;
      border-color: #FFF;
    }
  }
</style>
