<template>
  <div>

    <div v-if="loaderData">
      <Loader/>
    </div>

    <div v-else class="ads-form">
      <div>
        <div class="form-back"><a @click="$router.go(-1)"><font-awesome-icon icon="angle-double-left"/>Back</a></div>

        <div>
          <form @submit.prevent="send" class="style-form">

            <div :class="{error: errors.campaign}" class="select">
              <label for="campaign">Campaign</label>
              <select id="campaign" v-model="fields.campaign" :disabled="loader">
                <option v-for="(item, key) in campaigns" :key="key" :value="item.hash">{{item.name}}</option>
              </select>
              <div class="error-text">{{errors.campaign}}</div>
            </div>

            <div :class="{error: errors.views}" class="select">
              <label for="views">Views</label>
              <select id="views" v-model="fields.views" :disabled="loader">
                <option v-for="(item, key) in views" :key="key" :value="key">
                  <span>{{item.count}} views</span>

                  <span v-if="item.price < 1"> / discount -{{(100 - (item.price * 100)).toFixed(0)}}%</span>
                </option>
              </select>
              <div class="error-text">{{errors.views}}</div>
            </div>

            <div :class="{error: errors.duration}" class="select">
              <label for="duration">View duration</label>
              <select id="duration" v-model="fields.duration" :disabled="loader">
                <option v-for="(item, key) in durations" :key="key" :value="key">{{item.count}} seconds - {{item.price}} FBM coins</option>
              </select>
              <div class="error-text">{{errors.duration}}</div>
            </div>

            <div :class="{error: errors.unique}" class="select">
              <label for="unique">Unique views every</label>
              <select id="unique" v-model="fields.unique" :disabled="loader">
                <option v-for="(item, key) in unique" :key="key" :value="key">
                  <span>{{item.name}}</span>
                  <span v-if="item.price > 1"> / price +{{((item.price * 100) - 100).toFixed(0)}}%</span>
                  <span v-if="item.price < 1"> / price -{{(100 - (item.price * 100)).toFixed(0)}}%</span>
                </option>
              </select>
              <div class="error-text">{{errors.unique}}</div>
            </div>

            <div :class="{error: errors.geo}" class="select">
              <label for="geo">Geo targeting</label>
              <select id="geo" v-model="fields.geo" :disabled="loader">
                <option v-for="(item,key) in geo" :key="key" :value="key">
                  <span>{{item.name}}</span>
                  <span v-if="item.price > 1"> / price +{{((item.price * 100) - 100).toFixed(0)}}%</span>
                  <span v-if="item.price < 1"> / price -{{(100 - (item.price * 100)).toFixed(0)}}%</span>
                </option>
              </select>
              <div class="error-text">{{errors.geo}}</div>
            </div>

            <div :class="{error: errors.feature}" class="select">
              <label for="feature">Feature</label>
              <select id="feature" v-model="fields.feature" :disabled="loader">
                <option v-for="(item,key) in features" :key="key" :value="key">
                  <span>{{item.name}}</span>
                  <span v-if="item.price > 1"> / price +{{((item.price * 100) - 100).toFixed(0)}}%</span>
                  <span v-if="item.price < 1"> / price -{{(100 - (item.price * 100)).toFixed(0)}}%</span>
                </option>
              </select>
              <div class="error-text">{{errors.feature}}</div>
            </div>

            <div :class="{error: errors.code}">
              <input v-model.trim="fields.code" placeholder="Promo code" type="text" :disabled="loader">
              <div class="error-text">{{errors.code}}</div>
            </div>

            <div :class="{error: errors.price}">
              <div class="total-price">Total price: <span>{{totalPrice}}</span> <cryptoicon symbol="fbm" size="20" /></div>
              <div class="error-text">{{errors.price}}</div>
            </div>

            <div>
              <button class="button button-style" :disabled="loader">Create</button>
            </div>

          </form>
        </div>
      </div>
      <div class="preview-block">
        <div class="preview-title">Preview</div>
        <div class="preview-data">
          <EarningAdsBlock
            :title="preview.title"
            :text="preview.text"
            :duration="preview.duration"
            :price="preview.price"
            :status="'preview'"
            :feature="fields.feature"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EarningAdsBlock from '../EarningAdsBlock'
  export default {
    name: 'AdsForm',
    components: { EarningAdsBlock },
    props: ['hash'],
    data() {
      return {

        loader: false,
        loaderData: true,

        campaigns: [],
        views: [],
        durations: [],
        unique: [],
        geo: [],
        features: [],

        //totalPrice: 0,

        preview: {
          title: "",
          text: "",
          duration: 0,
          price: 0,
        },

        fields: {
          campaign: "",
          views: 0,
          duration: 0,
          unique: 0,
          geo: 0,
          feature: 0,
          code: "",
        },
        errors: {
          campaign: null,
          views: null,
          duration: null,
          unique: null,
          geo: null,
          feature: null,
          price: null,
        }
      }
    },
    watch: {
      'fields.campaign': function(to) {
        for (let key in this.campaigns) {
          if (this.campaigns.hasOwnProperty(key) && this.campaigns[key].hash === to) {
            this.preview.title = this.campaigns[key].title
            this.preview.text = this.campaigns[key].text
            return
          }
        }
        this.preview.title = ""
        this.preview.text = ""
      },
      'fields.duration': function(to) {

        this.preview.duration = this.durations[to].count
        this.preview.price = this.durations[to].price
      }
    },
    computed: {
      totalPrice: function() {

        let price = this.views[this.fields.views].count * this.durations[this.fields.duration].price
        if (this.views[this.fields.views].price !== 1.0) {
          price = price / 100 * (this.views[this.fields.views].price * 100).toFixed(0)
        }
        if (this.unique[this.fields.unique].price !== 1.0) {
          price = price / 100 * (this.unique[this.fields.unique].price * 100).toFixed(0)
        }
        if (this.geo[this.fields.geo].price !== 1.0) {
          price = price / 100 * (this.geo[this.fields.geo].price * 100).toFixed(0)
        }
        if (this.features[this.fields.feature].price !== 1.0) {
          price = price / 100 * (this.features[this.fields.feature].price * 100).toFixed(0)
        }

        return price
      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loaderData = true

        this.axios.get(`/api/ptc/manage/adverts/form?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.campaigns = response.data.data.campaigns
              this.views = response.data.data.views
              this.durations = response.data.data.durations
              this.unique = response.data.data.unique
              this.geo = response.data.data.geo
              this.features = response.data.data.features

              this.fields.views = Object.keys(this.views)[0]
              this.fields.duration = Object.keys(this.durations)[0]
              this.fields.unique = Object.keys(this.unique)[0]
              this.fields.geo = Object.keys(this.geo)[0]
              this.fields.feature = Object.keys(this.features)[0]

            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loaderData = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      send: function() {
        this.loader = true
        this.errors = {
          campaign: null,
          views: null,
          duration: null,
          unique: null,
          geo: null,
          feature: null,
          price: null,
        }

        this.fields.views     = parseInt(this.fields.views)
        this.fields.duration  = parseInt(this.fields.duration)
        this.fields.unique    = parseInt(this.fields.unique)
        this.fields.geo       = parseInt(this.fields.geo)
        this.fields.feature   = parseInt(this.fields.feature)

        this.axios.post(`/api/ptc/manage/adverts`, this.fields)
          .then(response => {
            if (response.data.status === 'success') {
              this.$router.push({ name: 'EarningAdsManageList', params: { create: 'success' } })

            } else if (response.data.status === 'error' && response.data.type !== undefined) {
              this.errors[response.data.type] = response.data.message
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
  .ads-form {
    display: flex;
    margin-top: 40px;
    padding: 0 40px;
    > div {
      width: 50%;
      text-align: left;
    }
    .style-form {
      padding: 0 10px;
      label {
        color: $color-blue;
      }
    }

    .total-price {
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      > span {
        margin: 0 5px;
        color: $color-red;
        font-size: 22px;
      }
      > svg {
        //vertical-align: middle;
      }

    }
    .preview-block {
      .preview-title {
        font-weight: bold;
        margin-bottom: 40px;
      }

    }
  }
</style>
