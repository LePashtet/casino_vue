<template>
  <div>

    <div v-if="loader" class="loader">
      <Loader />
    </div>

    <div v-else class="news">

      <div class="news-wrap">
        <div class="news-image"><img src="../../assets/news.png" alt="" /></div>
        <div class="news-title">
          <div class="news-title-text mo rasp" v-html="data.title"></div>
          <div class="news-time">{{data.time | printTimeFull}}</div>
        </div>
        <div class="news-text rasp" v-html="data.text"></div>
        <div class="news-down">
          <div class="news-comments">
            <div><font-awesome-icon :icon="['far', 'comment-alt']" /><span>{{ data.comments }}</span></div>
            <div><font-awesome-icon icon="eye" /><span>{{ data.views + 1 }}</span></div>
          </div>
        </div>
      </div>

      <div class="comments">

      </div>

      <div class="other">
        <div v-for="item in other" :key="item.id" class="news-other">
          <div class="news-other-wrap">
            <div class="other-image"><img src="../../assets/news.png" alt="" /></div>
            <div class="other-content">
              <div class="news-title">
                <div class="news-title-text mo rasp" v-html="item.title"></div>
                <div class="news-time">{{item.time | printTime}}</div>
              </div>
              <div class="news-text rasp" v-html="item.text"></div>
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
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewsOpen',
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        loader: true,
        data: null,
        comments: [],
        other: []
      }
    },
    watch: {
      id: function () {
        this.load(this.id)
      }
    },
    created () {
      this.load(this.id)
    },
    methods: {
      load: function(id) {
        this.loader = true

        this.axios.get('/api/news/open/' + id + '?' + new Date().getTime())
          .then(response => {
            if (response.data.status === 'success') {

              this.data = response.data.data.news
              this.comments = response.data.data.comments
              this.other = response.data.data.other
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
  .news {
    margin-bottom: 50px;


    .news-image {
      display: flex;
      width: 100%;
      > img {
        width: 100%;
      }
    }
    .news-title {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 5px;
      padding: 5px 5px;
      .news-title-text {
        font-size: 26px;
        font-weight: bold;
        text-align: left;
      }
      .news-time {
        color: $color-red;
        font-weight: lighter;
      }

      @media screen and (max-width: 1023px){
        flex-direction: column-reverse;
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
      justify-content: flex-end;
      align-items: center;
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
      @media screen and (max-width: 1023px){
        flex-direction: column-reverse;
      }
    }
  }

  .news-wrap {
    padding: 0 10px;

  }

  .other {
    margin: 50px 0;
    display: flex;
    .news-other {
      width: 50%;
      .news-other-wrap {
        display: flex;
        padding: 0 10px;
        .other-image {
          display: flex;
          width: 40%;
          align-items: flex-start;

          > img {
            margin-top: 20px;
            width: 100%;
            object-fit: contain;
          }
        }
        .other-content {
          width: 60%;

          .news-time {
            min-width: 70px;
            font-size: 12px;
          }
          .news-down {
            justify-content: space-between;
          }
        }

        @media screen and (max-width: 1023px){
          flex-direction: column;
          .other-image {
            display: flex;
            width: 100%;
            align-items: flex-start;
          }
          .other-content {
            width: 100%;

            .news-time {
              min-width: 70px;
              font-size: 10px;
            }
            .news-down {
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
</style>
