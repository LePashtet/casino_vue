<template>
  <div id="app" :class="{mobile: parentShowMenu}">
    <Navbar @showMenu="parentShowMenu = !parentShowMenu" @closeMenu="parentShowMenu = false" />

    <!--    <transition name="fade" mode="out-in">
      <Navauth v-if="$store.getters.isAuth" />
    </transition>-->

    <transition name="fade" mode="out-in">
      <EarningAdsFrame
        v-if="$store.getters.isAdsFrame"
      />
    </transition>

    <div class="main-content">
      <div class="page-content" :class="{chat: $store.getters.isChatOpen}">
        <div class="content-wrap">
          <router-view/>
        </div>

        <Navfooter />
      </div>
      <div class="chat-box" :style="{ 'width': $store.getters.isChatOpen ? chatWidth : '0px' }">
        <Chat />
      </div>
    </div>

    <div class="notification-block">

      <transition-group name="list" tag="div">
        <div v-for="(item) in notifData" class="notification" :class="'is-' + item.type" :key="item.index">
          <a v-if="item.isClose" @click="closeNotif(item.index)" class="notif-close"><font-awesome-icon icon="times" /></a>
          <div v-if="item.type === 'balance'">
            <div class="balance-amount">+<span>{{item.data.amount}}</span><cryptoicon :symbol="item.data.curr" size="20"/></div>
            <div>{{item.data.text}}</div>
          </div>
          <div v-else>
            {{item.text}}
          </div>
        </div>
      </transition-group>
    </div>

    <Auth v-if="$store.getters.getModalAuth" />

    <div class="upgrade-version notification is-info" v-if="openUpgrade">
      <div>New content is available</div>
      <button class="button is-danger is-small" @click="reloadPage">Reload page</button>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Navfooter from './components/Navfooter'
  import Chat from './components/Chat/Chat'
  import Auth from './components/Auth'
  /*import Navauth from './components/Navauth'*/
  import EarningAdsFrame from './components/Earning/EarningAdsFrame'
  export default {
    components: { EarningAdsFrame, Auth, Chat, Navfooter, Navbar },
    data() {
      return {
        parentShowMenu: false,
        openUpgrade: false,
      }
    },
    computed: {
      notifData: function () {
        return this.$store.getters.getNotifData
      },
      currentVersion: function() {
        return this.$store.getters.getVersion
      },
      isAuth: function() {
        return this.$store.getters.isAuth
      },
      isConnectedSocket: function () {
        return this.$store.getters.isConnectedSocket
      },
      chatWidth(){
        return this.$store.getters.isMobile? '100%': '340px'
      }
    },
    watch: {
      isAuth: function(value) {
        if (value === true && this.isConnectedSocket === true) {
          this.$store.dispatch("sendSocketAuth").then()
        }


        const redirect = this.$route.query.redirect
        if (redirect !== undefined && value === true && redirect !== this.$router.currentRoute.path) {
          this.$router.push({ path: redirect })
        }
      },

      isConnectedSocket: function (newVal) {
        //if (newVal === true && this.$store.getters.getAuthToken.length > 0) {
        //  this.getUserData()
        //}
        //console.log('connect ok', newVal, this.$store.getters.isAuth)

        if (newVal === true && this.$store.getters.isAuth) {
          this.$store.dispatch("sendSocketAuth").then()
        }

        //this.plusConnects()
      },
    },
    created () {
      //this.$Progress.start()

      /*
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          // parse meta tags
          this.$Progress.parseMeta(meta)
        }
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish()
      })
      */

      this.$connect()

      let auth = localStorage.getItem("auth")

      if (auth !== null) {
        this.axios.defaults.headers.common['Authorization']  = 'Bearer ' + auth

        this.axios.get('/api/auth')
          .then((response) => {
            if (response.data.status === "success") {
              const data = response.data.data
              data.session = auth
              this.$store.commit('auth', data)

              // load balances
              this.$store.commit('loadBalances', data.balances)
            }
          })
          .catch()
      }

      this.checkVersion()
      setInterval(() => {
        this.checkVersion()
      }, 60000 * 5)

      // referral
      this.$nextTick(function () {
        const ref = this.getParameterByName('r')
        if (ref !== null && ref.length > 0) {
          // console.log('Referral link: ' + ref)
          this.$cookie.set('referral', ref, 14)

          const link = document.referrer
          if (link !== "") {
            this.$cookie.set('link', link, 14)
          }

          this.sendPartnerHit(ref, link)
          this.$router.push("/")
        }
      })
    },
    mounted () {
      if (localStorage.getItem('isChatOpen') === 'true') {
        this.$store.commit('chatToggle');
      }
      //this.$Progress.finish()
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
      })
      this.onResize();
      import('fingerprintjs2').then((data) => {
        this.Fingerprint2 = data
        this.runFingerPrint()
      })
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    },
    methods: {
      runFingerPrint: function (){
        if (window.requestIdleCallback) {
          requestIdleCallback(function () {
            this.Fingerprint2.get(function (components) {
              //console.log(components) // an array of components: {key: ..., value: ...}
              let values = components.map(function (component) { return component.value })
              //let token = this.Fingerprint2.x64hash128(values.join(''), 31)
              this.axios.defaults.headers.common['X-Data'] = this.Fingerprint2.x64hash128(values.join(''), 31)

              //let encodedData = window.btoa(unescape(encodeURIComponent(JSON.stringify(components))))
              //this.$store.commit('authSecSet', {hash: token, data: encodedData, load: true})
            }.bind(this))
          }.bind(this))
        } else {
          let IntS = setTimeout(function () {
            this.Fingerprint2.get(function (components) {
              clearInterval(IntS)
              //console.log(components) // an array of components: {key: ..., value: ...}
              let values = components.map(function (component) { return component.value })
              //let token = this.Fingerprint2.x64hash128(values.join(''), 31)
              this.axios.defaults.headers.common['X-Data'] = this.Fingerprint2.x64hash128(values.join(''), 31)

              //let encodedData = window.btoa(unescape(encodeURIComponent(JSON.stringify(components))))
              //this.$store.commit('authSecSet', {hash: token, data: encodedData, load: true})
            }.bind(this))
          }.bind(this), 500)
        }
      },
      checkVersion: function() {
        this.axios.get(`/version.json?t=${new Date().getTime()}`)
          .then(response => {
            if (this.currentVersion === null) {
              this.$store.commit('setVersion', response.data.version)
              localStorage.setItem('version', response.data.version)
            } else if (this.currentVersion !== response.data.version) {
              this.$store.commit('setVersion', response.data.version)
              this.openUpgrade = true
            }

            /*
            if (response.data.maintenance !== undefined) {
              this.maintenance = response.data.maintenance
              this.$store.commit('changeScroll', !this.maintenance)
            }
            */

            console.log("Version: " + this.currentVersion)
          })
          .catch(()=>{
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Error get version', isClose: false, timer: 2000}).then()
          })
      },
      reloadPage: function () {
        localStorage.setItem('version', this.currentVersion)
        window.location.reload(true)
      },
      closeNotif: function(index) {
        this.$store.commit('closeNotif', index)
      },
      getParameterByName: function (name, url) {
        if (!url) url = window.location.href
        name = name.replace(/[\\[\\]]/g, '\\$&')
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
        const results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
      },
      sendPartnerHit: function(referral, link) {
        if (this.axios.defaults.headers.common['X-Data'] === undefined) {
          setTimeout(()=>{
            this.sendPartnerHit(referral, link)
          }, 1000)
        } else {
          this.axios.post('/api/affiliate/hit', { referral: referral, link: link }).then()
        }
      },
      onResize: function () {
        this.$store.commit('setScreenResolution',window.innerWidth < 1024)
      }
    }
  }
</script>

<style lang="scss" src="@/styles/style.scss" />

<style lang="scss" scoped>
  #app {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    cursor: default;
    position: relative;
    //-webkit-touch-callout: none;
    //-webkit-user-select: none;
    //-moz-user-select: none;
    //-ms-user-select: none;
    //user-select: none;

  }
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .page-content {
      flex: 1;
      transition: .5s margin-right ease;
      display: flex;
      flex-direction: column;
      .content-wrap {
        flex: 1;
        margin-bottom: 50px;
      }
      &.chat {
        @media screen and (min-width: 1024px){
          margin-right: 340px;
        }
      }
    }
    .chat-box {
      z-index: 1;
      height: 100%;
      width: 0;
      position: fixed;
      top: 0;
      right: 0;
      overflow: hidden;
      transition: 0.5s ease;
      display: flex;

      background-color: #2C2E5F;
      box-shadow: 0 7px 20px rgba(0, 0, 0, 0.16);
    }
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter {
    opacity: 0;
    transform: translateY(-30px);
  }
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .notification-block{
    position: fixed;
    width: 320px;
    top: 10px;
    right: 10px;
    z-index: 9999;
  }
  .notification-block .notification {
    margin-bottom: 10px;
    background-color: #3E9EFF;
    font-weight: bold;
    padding: 15px 10px;
    border-radius: 4px;

    .notif-close {
      position: absolute;
      top: 3px;
      right: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      width: 20px;
      height: 20px;
      background-color: $color-red;

    }
  }
  .notification-block .notification.is-danger {
    background-color: #ff3860;
  }
  .notification-block .notification.is-success {
    background-color: rgba(85, 204, 102, 0.7);
  }

  .notification-block .notification.is-balance {
    background-color: rgba(85, 204, 102, 1.0);
    .balance-amount {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-red;
      svg {
        margin-left: 5px;
      }
    }
  }

  .shake {
    animation: shake 400ms ease-in-out;
  }
  @keyframes shake {
    0% {transform: translateX(0);}
    12.5% {transform: translateX(-6px) rotateY(-5deg)}
    37.5% {transform: translateX(5px) rotateY(4deg)}
    62.5% {transform: translateX(-3px) rotateY(-2deg)}
    87.5% {transform: translateX(2px) rotateY(1deg)}
    100% {transform: translateX(0)}
  }

  .upgrade-version {
    position: fixed;
    bottom: 10px;
    right: 20px;
    padding: 5px 30px;
    color: #FFF;
    z-index: 99999;

    background-color: hsl(240, 31.1%, 35.9%);;
    border: 1px solid #000;
    border-radius: 4px;
    > .button {
      margin: 5px 0;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
      border-width: 2px;
    }
  }
</style>
