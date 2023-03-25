<template>
  <div>
    <div v-if="loader" class="loader">
      <Loader />
    </div>

    <div v-else class="news">
      <div class="news-wrap">

        <div v-for="(item) in transactions" :key="item.id" class="news-block">
          <div class="news-content">
            <div class="news-image"><img src="../../assets/news.png" alt="" /></div>
            <div class="news-title">
              <div class="news-title-text mo rasp" v-html="item.title"></div>
              <div class="news-time">{{ item.time | printTimeFull }}</div>
            </div>
            <div class="news-text rasp">
              {{ item.text }}
            </div>
            <div class="news-down">
              <div class="news-button"><router-link :to="{ name: 'NewsOpen', params: {id: item.id} }" class="mo">{{ $t('news.more') }}</router-link></div>
              <div class="news-comments">
                <div><font-awesome-icon :icon="['far', 'comment-alt']" /><span>{{ item.comments }}</span></div>
                <div><font-awesome-icon icon="eye" /><span>{{ item.views }}</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="news-pagination">
        <PaginationLinks :total-page="currentTotal" :current-page="parseInt(page)" link="/news/" />
      </div>

    </div>
  </div>
</template>

<script>
  import PaginationLinks from '../PaginationLinks'
  export default {
    name: 'News',
    components: { PaginationLinks },
    props: {
      page: {
        type : String,
        default: "1",
      }
    },
    data () {
      return {
        loader: true,
        transactions: [],
        currentTotal: 0,
      }
    },
    created () {
      this.load(this.page)
    },
    watch: {
      page: function() {
        this.load(this.page)
      }
    },
    methods: {
      load: function(page) {
        this.loader = true

        this.axios.get('/api/news/' + page + '?' + new Date().getTime())
          .then(response => {
            if (response.data.status === 'success') {

              this.transactions = response.data.data.transactions
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
      // changePage: function(value) {
      //  this.page = value
      //  this.load(this.page)
      //}
    }
  }
</script>

<style lang="scss" scoped>
  .news {
    margin-bottom: 50px;
    .news-wrap {
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;

      .news-block {
        width: 50%;
        min-width: 300px;
        @media screen and (max-width: 1000px){
          width: 80%;
          margin: 0 auto;
        }

        .news-content {
          cursor: pointer;
          border-radius: 10px;
          padding: 10px 10px;
          margin: 5px 10px;
          transition: .3s ease;
          .news-image {
            display: flex;
            > img {
              border-radius: 10px;
              width: 100%;
            }
          }
          .news-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;
            padding: 5px 5px;
            .news-title-text {
              font-size: 26px;
              font-weight: bold;
              @media screen and (max-width: 1000px){
                font-size: 5vw;
              }
            }
            .news-time {
              color: $color-red;
              font-weight: lighter;
              @media screen and (max-width: 1000px){
                font-size: 2vw;
              }
            }
          }
          .news-text {
            padding: 5px 5px;
            text-align: left;
            margin-top: 5px;
            font-size: 14px;
            color: $color-blue;
            font-weight: lighter;
          }
          .news-down {
            padding: 5px 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .news-button {
              a {
                display: inline-block;
                border-radius: 4px;
                background-color: $color-blue-dark;
                font-weight: bold;
                padding: 10px 20px;
                box-shadow: 0 0 3px 2px rgba(0, 14, 68, 0.05);
                &:hover {
                  box-shadow: none;
                }
              }
            }
            .news-comments {
              display: flex;
              align-items: center;
              > div {
                display: flex;
                align-items: center;
                margin-left: 10px;
                color: $color-blue;
                font-weight: lighter;
                > svg {
                  margin-right: 5px;
                  color: $color-red;
                }
                .fa-comment-alt {
                  margin-top: 4px;
                }
              }
            }
          }

          &:hover {
            box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
</style>
