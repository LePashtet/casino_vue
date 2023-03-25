<template>
  <div>

    <div class="graph-block">

      <div class="graph-menu">
        <div class="slider-links">
          <a @click="changeGraphCurr('usd')" class="slider-link" :class="{active: graphCurr === 'usd'}">USD</a>
          <a v-for="(item, key) in balances" :key="key"  @click="changeGraphCurr(item.acronym)" class="slider-link" :class="{active: graphCurr === item.acronym}"><cryptoicon :symbol="item.acronym" /></a>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <Loader v-if="loader" />
        <div v-else>
          <div class="detail-data">
            <div><div class="mo">{{graphData.month}}</div><div>Pay out this month</div></div>
            <div><div class="mo">{{graphData.week}}</div><div>Pay out this week</div></div>
            <div><div class="mo">{{graphData.day}}</div><div>Pay out today</div></div>
          </div>

          <ChartBlock :labels="graph.date" :chartdata="graph.data" :legend="false" datalabel="Pay out" class="balance-chart" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import ChartBlock from '../ChartBlock'
  export default {
    name: 'SiteOwnerBalanceGraph',
    components: { ChartBlock },
    props: ['hash', 'balances'],
    data() {
      return {
        loader: true,
        graphCurr: 'usd',
        graphData: null,
        graph: {},
      }
    },
    created () {
      this.load(this.graphCurr)
    },
    methods: {
      load: function(curr) {
        this.loader = true

        this.axios.get(`/api/sites/${this.hash}/balance/graph/${curr}?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.graphData = response.data.data
              this.graph = this.parseGraph(response.data.data.graph)

            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      changeGraphCurr: function(curr) {
        this.graphCurr = curr
        this.load(this.graphCurr)
      },
      parseGraph: function(graph) {
        let legend = []
        let data = []
        for (let key in graph) {
          legend.push(key)
          data.push(graph[key])
        }
        return {date: legend, data: data}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .graph-block {

    .graph-menu {
      text-align: left;
      margin-bottom: 0;
      padding: 0 30px;
      .slider-links {
        display: inline-flex;
        justify-content: flex-start;
        margin-bottom: 10px;
        > a {
          width: 55px;
        }
      }
    }
    .detail-data {
      display: flex;
      justify-content: space-between;

      > div {
        margin: 0 25px;
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

    .balance-chart {
      height: 200px;
    }
  }
</style>
