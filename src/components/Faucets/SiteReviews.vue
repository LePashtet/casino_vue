<template>
  <div class="reviews-block">

    <Loader v-if="loader" />

    <div v-else>

      <div v-if="reviews.length === 0">{{ $t('siteLIst.table.noReviews') }}</div>

      <div v-else class="reviews-box">
        <div v-for="(item, key) in reviews" :key="key">
          <div class="review-data">
            <div class="review-data-title">
              <div class="review-data-user">
                <div>
                  <Avatar :avatar="item.user.avatar" :is-avatar="true" :size="60" />
                </div>
                <div class="review-data-name">
                  <div class="review-data-username"><img v-show="item.user.premium > new Date().getMilliseconds()" src="@/assets/crown.svg" alt="Premium Icon">{{ item.user.username }}</div>
                  <div class="review-data-rating-bar">
                    <div>
                      <span v-for="n in 5" :key="n" class="site-rating-icon"><font-awesome-icon :icon="[(item.rating < n?'far':'fas'), 'star']" size="xs" /></span>
                    </div>
                    <div>{{ item.rating }}/<span>5</span></div>
                  </div>
                </div>
              </div>
              <div class="review-data-time">{{ item.time | printTimeFull }}</div>
            </div>
            <div v-show="item.text.length > 0" v-if="item.status === 'active'" class="review-data-text">
              {{ item.text }}
            </div>
            <div v-if="item.status === 'wait'" class="review-data-text review-data-text-moderation">
              {{ $t('siteLIst.table.moderation') }}
            </div>
          </div>
        </div>
      </div>

      <div class="transaction-pages">
        <Pagination :total-page="currentTotal" :current-page="currentPage" @btn-click="changePage" />
      </div>

    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Cabinet/Avatar'
import Pagination from '@/components/Pagination'
export default {
  name: 'SiteReviews',
  components: { Avatar, Pagination },
  props: ['hash', 'reload'],
  data() {
    return {
      loader: true,
      reviews: [],
      currentTotal: 0,
      currentPage: 0,

    }
  },
  created () {
    this.load(this.currentPage)
  },
  watch: {
    reload: function() {
      this.load(this.currentPage)
    }
  },
  methods: {
    load: function(page) {
      this.loader = true

      this.axios.get(`/api/faucets/detail/${this.hash}/reviews/${page}?t=${new Date().getTime()}`)
        .then(response => {
          if (response.data.status === 'success') {
            this.reviews = response.data.data.transactions
            this.currentTotal = response.data.data.pages

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
    printTime: function(time) {

    }
  }
}
</script>

<style lang="scss" scoped>
  .reviews-block {
    .reviews-box {
      display: flex;
      flex-wrap: wrap;
      > div {
        width: 50%;

        .review-data {
          padding: 20px;

          .review-data-title {
            display: flex;
            justify-content: space-between;
            .review-data-user {
              display: flex;

              .review-data-name {
                margin-left: 40px;
                font-size: 18px;
                text-align: left;

                .review-data-username {
                  display: flex;
                  align-items: center;
                  img {
                    width: 14px;
                    margin: 0 5px 0 0;
                  }
                }
                .review-data-rating-bar {
                  display: flex;

                  > div:first-of-type {
                    color: $color-red;
                    font-size: 24px;
                    line-height: 24px;
                    display: flex;
                    align-items: center;
                    > span {
                      display: flex;
                    }
                  }
                  > div:last-of-type {
                    margin-left: 10px;
                    font-size: 22px;
                    font-weight: bold;
                    > span {
                      font-size: 18px;
                      font-weight: normal;
                    }
                  }
                }
              }
            }
            .review-data-time {
              display: flex;
              align-items: flex-end;
              font-size: 12px;
              padding-bottom: 10px;
            }
          }
          .review-data-text {
            margin-top: 10px;
            text-align: left;
            color: $color-blue;
            padding: 10px 15px;
            font-size: 16px;

            background-color: $color-blue-dark;
            border-radius: 8px;
            word-break: break-all;
            &.review-data-text-moderation {

            }
          }
        }
      }
    }
  }
</style>
