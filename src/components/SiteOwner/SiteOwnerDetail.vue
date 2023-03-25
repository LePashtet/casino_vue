<template>
  <div class="detail-page">

    <Loader v-if="loader" />

    <div v-else>

      <div class="detail-title">
        <div class="form-back"><a @click="$router.go(-1)"><font-awesome-icon icon="angle-double-left"/>Back</a></div>
        <div class="detail-title-text rasp">Statistics <span>#{{hash}}</span> API calls</div>
        <div></div>
      </div>

      <div class="detail-top">

        <div class="detail-data-wrap">
          <div class="detail-chart-title">Calls chart</div>
          <div class="detail-data">
            <div><div class="mo">{{calls.month}}</div><div>Calls this month</div></div>
            <div><div class="mo">{{calls.week}}</div><div>Calls this week</div></div>
            <div><div class="mo">{{calls.day}}</div><div>Calls today</div></div>
          </div>
        </div>

        <ChartBlock :labels="graph.date" :chartdata="graph.data" :legend="false" datalabel="API calls" class="detail-chart" />
      </div>


      <SiteOwnerDetailCalls :hash="hash" />

    </div>
  </div>
</template>

<script>
  import SiteOwnerDetailCalls from './SiteOwnerDetailCalls'
  import ChartBlock from '../ChartBlock'
  export default {
    name: 'SiteOwnerDetail',
    components: { ChartBlock, SiteOwnerDetailCalls },
    props: ['hash'],
    data() {
      return {
        loader: true,
        calls: null,
        graph: null,
      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true
        this.axios.get(`/api/sites/${this.hash}/detail?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              //this.balances = response.data.data

              this.calls = response.data.data.calls
              this.graph = this.parseGraph(response.data.data.graph)

              //console.log(response.data.data)
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      parseGraph: function(graph) {
        let date = []
        let data = []
        for (let key in graph) {
          date.push(key)
          data.push(graph[key])
        }
        return {date: date, data: data}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-page {

    .detail-title {
      display: flex;
      justify-content: space-between;
      margin: 80px 0 20px 0;
      .detail-title-text {
        font-size: 26px;
        font-weight: bold;
      }
    }
    .detail-top {
      margin-bottom: 30px;
      .detail-data-wrap {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        .detail-chart-title {
          font-size: 34px;
          font-weight: bold;
          padding-left: 25px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .detail-data {
          display: flex;
          justify-content: flex-end;

          > div {
            margin: 0 45px;
            font-weight: bold;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            > div {
              text-align: left;

              &:first-of-type {
                font-size: 34px;
              }

              &:last-of-type {
                font-size: 12px;
                color: $color-red;
              }
            }
          }
        }
      }
      .detail-chart {
        height: 200px;
      }
    }
  }
</style>
