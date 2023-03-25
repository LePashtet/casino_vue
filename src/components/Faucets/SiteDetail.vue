<template>
  <div class="content-main site-list-detail">
    <Loader v-if="loader" />

    <div>

      <div class="title-wrap mo">
        <div>{{ $t('siteLIst.table.site') }} {{ detail.name }}</div>
      </div>

      <div class="site-title">
        <div class="site-address">
          <div>{{ $t('siteLIst.table.address') }}</div>
          <div><a :href="detail.url" target="_blank" rel="nofollow"><font-awesome-icon icon="link" />{{ detail.url }}</a></div>
        </div>
        <div class="site-added">
          <div>{{ $t('siteLIst.table.dateAdd') }}</div>
          <div>{{ creationDate }}</div>
        </div>
      </div>

      <div class="site-detail">

        <div class="site-screenshot">
          <div>
            <img :src="`/api/faucets/detail/${this.hash}.png`" :alt="detail.name" />
          </div>
        </div>

        <div class="site-rating">
          <div class="site-rating-title mo">{{ $t('siteLIst.table.siteRate') }}</div>

          <div class="site-rating-data">
            <div class="site-rating-stars">
              <span v-for="n in 5" :key="n" class="site-rating-icon"><font-awesome-icon :icon="[(detail.rating < n?'far':'fas'), 'star']" size="xs" /></span>
            </div>
            <div class="site-rating-text">{{detail.rating}}/<span>5</span></div>
          </div>
          <div class="site-rating-count"><span>{{detail.votes}}</span> {{ $t('siteLIst.table.userRate') }}</div>
          <div class="site-rating-detail">

            <div v-for="n in 5" :key="n">
              <div class="site-rating-star"><span>{{ (n-6)*-1 }}</span> {{ $t('siteLIst.table.star') }}</div>
              <div class="site-rating-bar"><div :style="{width: parseInt(detailReview[(n-6)*-1]) + '%'}"></div></div>
              <div class="site-rating-percent">{{ parseInt(detailReview[(n-6)*-1])}}%</div>
            </div>
          </div>
        </div>
      </div>

      <div class="site-reviews">
        <div class="site-reviews-title">
          <div class="site-reviews-title-text mo">{{ $t('siteLIst.table.reviews') }}</div>
          <div>
            <button v-if="$store.getters.isAuth && limitReview === 0" @click="openModal">{{ $t('siteLIst.table.comment') }} <font-awesome-icon icon="pen" /></button>
            <span v-else-if="$store.getters.isAuth" class="limit-review">You can submit your review of this site in {{limitReview}} days</span>
          </div>
        </div>


        <SiteReviews :hash="hash" :reload="reloadReviews"/>

      </div>

    </div>

    <SiteReviewModal v-if="modalOpen" :hash="hash" @close="closeModal" @reload="reloadData" />

  </div>
</template>

<script>
import SiteReviews from '@/components/Faucets/SiteReviews'
import SiteReviewModal from '@/components/Faucets/SiteReviewModal'
export default {
  name: "SiteDetail",
  components: { SiteReviewModal, SiteReviews },
  props: ["hash"],
  data () {
    return {
      loader: true,
      detail: {},
      detailReview: {},
      limitReview: 0,
      modalOpen: false,
      reloadReviews: false,
    }
  },
  created () {
    this.load()
  },
  computed: {
    creationDate: function() {
      let time = new Date(this.detail.creation_date * 1000)

      let month = "0" + time.getMonth()

      return time.getDate() + "." + month + "." + time.getFullYear()
    }
  },
  methods: {
    load: function() {
      this.loader = true

      this.axios.get(`/api/faucets/detail/${this.hash}?t=${new Date().getTime()}`)
        .then(response => {
          if (response.data.status === 'success') {
            this.detail = response.data.data.detail
            this.detailReview = response.data.data.reviews
            this.limitReview = response.data.data.limit

          } else {
            this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
          }
          this.loader = false
        })
        .catch(() => {
          this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
        })
    },
    reloadData: function() {
      this.load()
      this.reloadReviews = !this.reloadReviews
    },
    openModal: function() {
      this.modalOpen = true
    },
    closeModal: function() {
      this.modalOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .site-list-detail {

    .site-title {
      display: flex;
      justify-content: flex-end;
      padding-bottom: 15px;
      margin-bottom: 25px;

      border-bottom: 1px solid $color-blue;

      > div {
        width: 25%;
        text-align: left;
        > div:first-of-type {
          color: $color-blue;
        }
        > div:last-of-type {
          font-weight: bold;
        }
        &:last-of-type {
          text-align: right;
        }
        a {
          color: $color-red;
          > svg {
            margin-right: 5px;
          }
        }
      }
    }

    .site-detail {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;

      .site-screenshot {
        width: 50%;
        > div {
          background-color: $color-blue-dark;
          border-radius: 10px;
          display: flex;
          > img {
            width: 100%;
            border-radius: 10px;
          }
        }
      }

      .site-rating {
        width: 40%;
        .site-rating-title {
          font-size: 25px;
          font-weight: bold;
          text-align: left;
          margin-bottom: 10px;
        }
        .site-rating-data {
          background-color: $color-blue-dark;
          border-radius: 10px;
          padding: 20px;

          display: flex;
          justify-content: space-between;
          .site-rating-stars {
            display: flex;
            font-size: 50px;
            line-height: 50px;
            > span {
              display: flex;
              margin: 0 5px;
            }
          }
          .site-rating-text {
            font-size: 30px;
            font-weight: bold;
            > span {
              font-size: 25px;
              font-weight: normal;
            }
          }
        }
        .site-rating-count {
          font-size: 20px;
          padding: 15px;
          border-bottom: 1px solid $color-blue;
          > span {
            color: $color-red;
            font-weight: bold;
          }
        }
        .site-rating-detail {
          margin-top: 15px;

          > div {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .site-rating-star {
              display: flex;
              //align-items: flex-end;
              font-size: 16px;
              min-width: 50px;
              text-align: left;
              > span {
                font-size: 18px;
                font-weight: bold;
                color: $color-red;
                margin-right: 5px;
              }
            }
            .site-rating-bar {
              margin: 0 25px;
              height: 12px;
              border-radius: 6px;
              width: 100%;
              background-color: #6C4365;
              > div {
                height: 12px;
                border-radius: 6px;
                background-color: $color-red;
              }
            }
            .site-rating-percent {
              color: $color-blue;
              font-size: 18px;
              font-weight: bold;
              min-width: 50px;
              text-align: right;
            }
          }
        }
      }
    }

    .site-reviews {
      margin-bottom: 40px;

      .site-reviews-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        margin-bottom: 25px;

        border-bottom: 1px solid $color-blue;
        .site-reviews-title-text {
          font-size: 24px;
          font-weight: bold;
        }
        button {
          font-size: 16px;
          padding: 5px 20px;
          background-color: $color-blue-dark;
          border: 1px solid $color-red;
          border-radius: 8px;
          outline: none;
          transition: .3s ease;
          > svg {
            margin-left: 5px;
            color: $color-red;
            font-size: 14px;
          }
          &:hover {
            background-color: #39397c;
          }
        }
        .limit-review {
          font-size: 12px;
          color: #FFFC;
        }
      }
    }
  }
</style>
