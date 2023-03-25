<template>
  <div>
    <div v-if="loader">
      <Loader />
    </div>

    <div v-else class="detail-info">


      <div class="info-block">
        <div class="detail-title">
          <div class="form-back"><a @click="$router.go(-1)"><font-awesome-icon icon="angle-double-left"/>Back</a></div>
          <div class="detail-title-text">Advert information</div>
          <div></div>
        </div>

        <div class="info-wrap">
          <div>
            <div>
              <div class="detail-name">Hash</div>
              <div class="detail-value">{{detail.hash}}</div>
            </div>


            <div>
              <div class="detail-name">Title</div>
              <div class="detail-value">{{detail.hash}}</div>
            </div>

            <div>
              <div class="detail-name">URL</div>
              <div class="detail-value">{{detail.url}}</div>
            </div>

            <div>
              <div class="detail-name">Text</div>
              <div class="detail-value">{{detail.text}}</div>
            </div>
          </div>

          <div>
            <div>
              <div class="detail-name">Status</div>
              <div class="detail-value">{{detail.status}}</div>
            </div>

            <div>
              <div class="detail-name">Created</div>
              <div class="detail-value">{{detail.time | printTimeFull}}</div>
            </div>

            <div>
              <div class="detail-name">Views</div>
              <div class="detail-value">{{detail.viewed}}/{{detail.views}}</div>
            </div>

            <div>
              <div class="detail-name">View price</div>
              <div class="detail-value">{{detail.pay}} <cryptoicon symbol="fbm" size="16" /></div>
            </div>

            <div>
              <div class="detail-name">Duration</div>
              <div class="detail-value">{{detail.duration}}sec</div>
            </div>
          </div>

          <div>
            <div>
              <div class="detail-name">Price</div>
              <div class="detail-value">{{detail.amount}} <cryptoicon symbol="fbm" size="16" /></div>
            </div>

            <div>
              <div class="detail-name">GEO</div>
              <div class="detail-value">{{detail.geo}}</div>
            </div>

            <div>
              <div class="detail-name">Unique</div>
              <div class="detail-value">{{detail.unique}}</div>
            </div>

            <div>
              <div class="detail-name">Features</div>
              <div class="detail-value">{{detail.feature}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="view-chart">
        <div class="view-chart-wrap">
          <div class="view-chart-title">View statistics</div>
          <div class="view-chart-data">
            <div><div class="mo">{{views.month}}</div><div>Total views</div></div>
            <div><div class="mo">{{views.month}}</div><div>Views this month</div></div>
            <div><div class="mo">{{views.week}}</div><div>Views this week</div></div>
            <div><div class="mo">{{views.day}}</div><div>Views today</div></div>

          </div>
        </div>

        <ChartBlock :labels="viewsGraph.labels" :chartdata="viewsGraph.data" :legend="false" datalabel="Views" class="detail-chart" />
      </div>

      <div class="view-chart">
        <div class="view-chart-wrap">
          <div class="view-chart-title">Other statistics</div>
        </div>

        <div class="other-chart">
          <div>
            <div class="chart-pie-title">Device</div>
            <div v-if="Object.keys(otherGraph.device.labels).length === 0">No data</div>
            <ChartPie v-else :labels="otherGraph.device.labels" :chartdata="otherGraph.device.data" class="chart-pie" />
          </div>
          <div>
            <div class="chart-pie-title">Language</div>
            <div v-if="Object.keys(otherGraph.language.labels).length === 0">No data</div>
            <ChartPie v-else :labels="otherGraph.language.labels" :chartdata="otherGraph.language.data" class="chart-pie" />
          </div>
          <div>
            <div class="chart-pie-title">Browser</div>
            <div v-if="Object.keys(otherGraph.browser.labels).length === 0">No data</div>
            <ChartPie v-else :labels="otherGraph.browser.labels" :chartdata="otherGraph.browser.data" class="chart-pie" />
          </div>
        </div>
      </div>

      <div class="view-chart">
        <div class="view-chart-wrap">
          <div class="view-chart-title">Demographics</div>
        </div>


        <div v-if="Object.keys(country).length === 0">No data</div>

        <div v-else class="map-chart-wrap">
          <div class="map-chart">

            <MapChart
              :countryData="country"
              highColor="#ff0000"
              lowColor="#aaaaaa"
              countryStrokeColor="#909090"
              defaultCountryFillColor="#dadada"
              legendHeaderBackgroundColor="#272754"
              legendContentBackgroundColor="#8B8ECE"
              legendBoxShadowCss="0px 0px 15px #272754"
              LangUser="en"
            />
          </div>
          <div class="map-list">
            <div class="map-list-title">
              <div>Country</div>
              <div>Views</div>
            </div>
            <div class="map-list-data">
              <div v-for="(item, key) in country" :key="key" v-show="key !== ''">
                <div>{{key}}</div>
                <div class="mo">{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import ChartBlock from '../../ChartBlock'
  import ChartPie from '../../ChartPie'
  import MapChart from 'vue-chart-map'

  export default {
    name: 'AdsDetail',
    components: { ChartPie, ChartBlock, MapChart  },
    props: ['hash'],
    data() {
      return {
        loader: true,
        detail: {},
        views: {},
        viewsGraph: {},
        otherGraph: {},
        country: {},
      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/ptc/manage/adverts/${this.hash}/stats?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.detail = response.data.data.detail
              this.views = response.data.data.views
              this.viewsGraph = this.parseGraph(response.data.data.views_graph)
              this.otherGraph.device = this.parseGraph(response.data.data.other.device)
              this.otherGraph.language = this.parseGraph(response.data.data.other.language)
              this.otherGraph.browser = this.parseGraph(response.data.data.other.browser)
              this.country = response.data.data.country

              //this.settings = response.data.data
              this.loader = false
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      parseGraph: function(graph) {
        let labels = []
        let data = []
        for (let key in graph) {
          labels.push(key)
          data.push(graph[key])
        }
        return {labels: labels, data: data}
      }
    }
  }
</script>

<style lang="scss">
  .vue-map-legend {
    font-weight: bold;
    min-height: 5px;
    .vue-map-legend-header {
      padding: 5px 15px;
    }
    .vue-map-legend-content {
      padding: 5px 15px;
    }
  }
</style>

<style lang="scss" scoped>
  .detail-info {
    margin-top: 40px;

    .info-block {
      margin-bottom: 20px;
      .detail-title {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        .detail-title-text {
          font-size: 22px;
          font-weight: bold;
          color: $color-blue;
        }
      }

      .info-wrap {
        display: flex;
        > div {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: 33%;
          border-left: 1px solid $color-blue;
          padding-left: 20px;
          &:first-of-type {
            border-left: 0;
          }
          > div {
            display: flex;
            flex-direction: column;
            text-align: left;
            margin-bottom: 10px;

            .detail-name {
              //font-weight: bold;
              color: #FFF;
              margin-right: 10px;
              font-size: 16px;
            }
            .detail-value {
              font-size: 14px;
              color: $color-red;
              > svg {
                vertical-align: sub;
              }
            }
          }
        }
      }

    }
    .view-chart {
      margin-bottom: 20px;
      .view-chart-wrap {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        .view-chart-title {
          font-size: 34px;
          font-weight: bold;
          padding-left: 25px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .view-chart-data {
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
        height: 300px;
      }
      .other-chart {
        display: flex;
        justify-content: space-around;

        > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          //width: 20%;
          .chart-pie-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
          }
        }
        .chart-pie {
          z-index: 1;
          height: 200px;
          width: 300px;
        }
      }
      .map-chart-wrap {
        display: flex;
        .map-chart {
          width: 70%;
          //height: 400px;

        }
        .map-list {
          width: 30%;
          padding: 10px 20px;
          .map-list-title {
            display: flex;
            justify-content: space-between;
            color: $color-blue;
            padding: 5px 20px;
          }
          .map-list-data {
            border: 2px solid $color-red;
            border-radius: 8px;
            padding: 20px 35px;
            > div {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #262654;
              color: $color-blue;
              > div {
                &:last-of-type {
                  color: #FFF;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
