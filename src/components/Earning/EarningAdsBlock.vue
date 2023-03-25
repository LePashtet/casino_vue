<template>
  <div class="ptc-ads-block" :class="featureClass">
    <div class="ptc-ads-data">

      <div class="ptc-ads-title">
        <div class="ptc-ads-title-text">
          <div v-if="feature === 1" class="top-flag"></div>
          <span><font-awesome-icon v-if="feature === 1" icon="star" />{{title}}</span>
        </div>
        <div>
          <button v-if="next === 0 || nextSeconds === 0" class="ptc-ads-button button" :class="{preview: status === 'preview'}" :disabled="loader" @click="view">{{ $t('earning.paidAds.view') }}</button>
          <span v-else>{{nextTimerPrint}}</span>
        </div>
      </div>

      <div class="ptc-ads-actions">
        <div class="ptc-ads-icons">
          <div class="ptc-ads-icon-block">
            <div class="ptc-ads-icon"><font-awesome-icon :icon="['far', 'clock']"/></div>
            <div class="ptc-ads-icon-text">{{duration}}s</div>
          </div>
          <div class="ptc-ads-icon-block">
            <div class="ptc-ads-icon"><cryptoicon symbol="fbm" size="20" /></div>
            <div class="ptc-ads-icon-text">{{price}}</div>
          </div>
        </div>
        <div class="ptc-ads-line"></div>

      </div>

      <div class="ptc-ads-text">
        <div class="ptc-ads-text-data">{{text}}</div>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: 'EarningAdsBlock',
    props: {
      hash: {default: undefined},
      title: {default: ""},
      text: {default: ""},
      duration: {default: 5},
      price: {default: 0.1},
      status: {default: "active"},
      feature: {default: 0},
      next: {default: 0}
    },
    data() {
      return {
        loader: false,
        nextSeconds: -1,
        nextTimer: null
      }
    },
    computed: {
      featureClass: function() {
        switch (this.feature) {
          case 1:
            return ['bordered', 'gradient', 'top']
          case 2:
            return ['bordered', 'gradient']
          case 3:
            return ['bordered']
          default:
            return []
        }
      },
      nextTimerPrint: function() {
        let timeStart = this.nextSeconds
        const days = Math.floor(timeStart / 24 / 60 / 60)
        const hours = Math.floor((timeStart - days*24*60*60) / 60 / 60)
        let minutes = Math.floor((timeStart - days*24*60*60 - hours*60*60) / 60)
        let seconds = timeStart - days*24*60*60 - hours*60*60 - minutes*60

        if (minutes < 10) {
          minutes = "0" + minutes
        }
        if (seconds < 10) {
          seconds = "0" + seconds
        }

        let text = `${hours}:${minutes}:${seconds}`
        if (days > 0) {
          text = `${days}d `+ text
        }

        return text
      }
    },
    mounted () {
      if (this.next > 0) {
        this.nextSeconds = this.next
        this.nextTimer = setInterval(() => {
          this.nextSeconds--
          if (this.nextSeconds === 0) {
            clearInterval(this.nextTimer)
          }
        }, 1000)
      }
    },
    methods: {
      view: function () {
        if (this.hash === undefined) return
        this.loader = true

        this.axios.get(`/api/ptc/view/${this.hash}?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              const hash = response.data.data.hash
              const link = response.data.data.link
              const duration = response.data.data.duration

              //console.log(hash)
              // window.open('https://google.com')


              this.$store.commit('openPtcAdsFrame', {hash: hash, link: link, duration: duration})



            } else {
              this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
          })
      }
    }
  }
</script>

<style lang="scss">
  .ptc-ads-block {
    &.top {
      .ptc-ads-data .ptc-ads-text .ptc-ads-text-title:before {
        //clip-path: url(#myClip);
      }
    }
  }
</style>

<style lang="scss" scoped>
  .ptc-ads-block {
    padding: 5px;
    .ptc-ads-data {
      border-bottom: 4px solid $color-red;
      border-radius: 4px;
      box-shadow: 0 15px 13px rgba(0, 14, 68, 0.15);
      background-color: $color-blue-dark;
      display: flex;
      flex-direction: column;
      //justify-content: space-between;

      padding-top: 15px;
      padding-bottom: 15px;


      .ptc-ads-title {
        min-height: 28px;
        padding: 5px 10px;
        background-color: #2b2d5e;
        font-size: 18px;
        font-weight: bold;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        .ptc-ads-title-text {
          color: $color-red;
          position: relative;


          > span {
            flex: 1;
            position: relative;

            > svg {
              margin-right: 10px;
              color: #684163;
            }
          }
        }
        .ptc-ads-button {
          padding: 5px 30px;
          font-weight: bold;
          font-size: 16px;
          line-height: 16px;
          background-color: $color-blue-dark;
          border: 1px solid $color-red;
          border-radius: 8px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.01);
          transition: .3s ease;

          &:hover {
            background-color: $color-blue-dark-hover;
          }
          &.preview {
            cursor: default;
            &:hover {
              background-color: $color-blue-dark;
            }
          }
        }
      }

      .ptc-ads-text {
        //width: 100%;
        padding: 0 20px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;

        .ptc-ads-text-data {
          text-align: left;
        }
      }
      .ptc-ads-actions {
        //background-color: #2B2D5E;
        border-radius: 4px;
        padding: 10px 20px;
        display: flex;
        .ptc-ads-icons {
          display: flex;
          .ptc-ads-icon-block {
            display: flex;
            margin-right: 10px;
            .ptc-ads-icon {
              display: flex;
              justify-content: center;
              align-items: center;
              color: $color-red;
              font-size: 20px;
              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
            }

            .ptc-ads-icon-text {
              margin-left: 5px;
              display: inline-flex;
              align-items: center;
              color: #FFF;
              font-size: 16px;
              //font-weight: bold;
            }
          }
        }
        .ptc-ads-line {
          width: 100%;
          margin-left: 10px;
          position: relative;
          &:after {
            content: ' ';
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            height: 2px;
            width: 100%;
            background-color: $color-red;
          }
        }

      }
    }
    &.bordered {
      .ptc-ads-data {
        border: 1px solid $color-red;
        padding-bottom: 16px;
        .ptc-ads-text, .ptc-ads-actions {

        }
      }
    }
    &.gradient {
      .ptc-ads-data {
        background: rgb(108,67,101);
        background: linear-gradient(90deg, rgba(108,67,101,1) 0%, rgba(39,39,84,1) 100%);
      }
    }
    &.top {
      .ptc-ads-data {
        .ptc-ads-title {
          .ptc-ads-title-text {
            color: #FFF;
            position: relative;
            .top-flag {
              position: absolute;
              content: ' ';
              top: -5px;
              left: -22px;
              height: 100%;
              width: calc(100% + 40px);
              background-color: $color-red;
              padding: 5px 5px 5px 0;

              //border-top-right-radius: 10px;
              //border-bottom-right-radius: 10px;
              z-index: 0;

              //clip-path: url('../../assets/ads_clipping.svg');
              //clip-path: polygon(0 0, 0 100%, 94% 100%, 103% 0);

              box-shadow: 0 5px 10px rgba(0, 14, 68, 0.15);

              &:after {
                position: absolute;
                content: ' ';

                top: 0;
                right: -17px;

                height: 35px;
                width: 18px;

                background: url('../../assets/ads_clipping.svg') no-repeat;
              }

              &:before {
                position: absolute;
                content: ' ';
                bottom: -10px;
                left: 0;
                height: 10px;
                width: 11px;
                background-color: #15152E;

                clip-path: polygon(0 0, 100% 0, 100% 100%);
              }
            }

          }
        }
      }
    }
  }
</style>
