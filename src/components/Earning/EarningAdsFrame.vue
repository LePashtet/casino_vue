<template>
  <div class="frame-block">
    <div class="top-data">
      <div class="logo-block"><img class="logo" src="../../assets/logo.svg" alt="freebitme" /></div>

      <div v-if="loader" class="timer"><font-awesome-icon icon="circle-notch" spin /></div>
      <div v-else-if="!loader && buttons" class="buttons-block">
        <button @click="close()" class="button button-style revert">Close and return to Freebitme</button>
        <button @click="openSite()" class="button button-style revert">Continue Browsing the Site</button>
      </div>
      <div v-else class="timer rasp">
        <div v-if="!verification">{{timer}} <span>sec</span></div>
        <div v-else class="verification">
          <vue-recaptcha ref="recaptchaFrame" @verify="onVerify" @expired="onExpired" :sitekey="$store.getters.getCaptchaKey" style="display: flex; justify-content: center;"></vue-recaptcha>
        </div>
      </div>

      <div class="buttons"><a class="close" @click="close()"><font-awesome-icon icon="times"/></a></div>
    </div>
    <div class="main-data" id="mainData">

    </div>

  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'
  export default {
    name: 'EarningAdsFrame',
    components: {'vue-recaptcha': VueRecaptcha},
    data () {
      return {
        loader: true,
        buttons: false,
        timer: 30,
        hash: null,
        interval: null,
        verification: false,
      }
    },
    created () {
      this.created()
    },
    mounted () {
      const data = this.$store.getters.getPtcParams

      this.timer = data.duration
      this.hash = data.hash

      let iframe = document.createElement("iframe")
      iframe.src = data.link
      iframe.width = '100%'
      iframe.height = '100%'
      iframe.style.border = '0'

      if (iframe.attachEvent){
        iframe.attachEvent("onload", () => {
          this.loadFrame()
        })
      } else {
        iframe.onload = () => {
          this.loadFrame()
        }
      }

      document.getElementById('mainData').appendChild(iframe)
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    methods: {
      loadFrame: function() {
        this.loader = false
        this.interval = setInterval(()=>{
          if (!document.hasFocus()) return

          this.timer--

          if (this.timer <= 0) {
            this.verification = true
            //this.$store.commit('closePtcAdsFrame')
            clearInterval(this.interval)
          }
        }, 1000)
      },
      onVerify: function(data) {
        this.sendClaim(data)
      },
      onExpired: function () {
        this.$refs.recaptchaFrame.reset()
      },
      close: function() {

        this.$store.commit('closePtcAdsFrame')
      },
      sendClaim: function(captcha) {
        this.loader = true
        this.axios.post(`/api/ptc/claim`, {hash: this.hash, captcha: captcha})
          .then(response => {
            if (response.data.status !== 'success') {
              this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
            }
            //this.$store.commit('closePtcAdsFrame')
            this.buttons = true
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
            this.$store.commit('closePtcAdsFrame')
          })
      },
      openSite: function() {
        window.open(this.$store.getters.getPtcParams.link)
        this.$store.commit('closePtcAdsFrame')
      },
      created: function () {
        const captchaLink = 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit'
        const scripts = document.getElementsByTagName('script')
        let isFind = false
        for (let i in scripts) {
          if (scripts[i].src === captchaLink) {
            isFind = true
          }
        }
        if (isFind === false) {
          let reCaptchaScript = document.createElement('script')
          reCaptchaScript.setAttribute('src', captchaLink)
          document.head.appendChild(reCaptchaScript)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .frame-block {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: #3f3f78;
    .top-data {
      display: flex;

      padding: 5px 0;
      > div {
        flex: 1;
      }
      .logo {
        height: 40px;
      }
      .timer {
        font-size: 22px;
        font-weight: bold;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        span {
          margin-left: 5px;
        }
      }
      .buttons-block {
        display: flex;
        align-items: center;
        .button {
          padding: 5px 20px;
          font-size: 16px;
          font-weight: bold;

          &:first-of-type {
            margin-right: 15px;
          }
        }
      }
      .logo-block {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 20px;
        .close {
          font-size: 22px;
          display: inline-flex;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;

          border-radius: 8px;
          background-color: #262753;
          color: #FFF;
          &:hover {
            color: $color-red;
          }
        }
      }
    }
    .main-data {
      height: 100%;
      position: relative;

    }
  }
</style>
