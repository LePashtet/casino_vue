<template>
  <div class="modal" :class="{captcha: captcha}">
    <div class="modal-bg" @click="close()"></div>
    <div class="modal-data">
      <div class="close"><a @click="close()"><font-awesome-icon icon="times" /></a></div>

      <iframe v-if="method === 'auth'" :src="$store.getters.getAuthServer + '/?client=1'" frameborder="0" />

      <div class="login-form" v-else-if="method === 'loader'">
        <div class="logo"><div><img src="../assets/logo.svg" alt="freebitme"></div></div>
        <div class="loader"></div>
        <div></div>
      </div>

      <div class="login-form" v-else-if="method === 'success'">
        <div class="logo"><div><img src="../assets/logo.svg" alt="freebitme"></div></div>
        <div class="success">
          <div class="icon"><font-awesome-icon icon="check-circle" size="2x"/></div>
          <div class="title">Success!</div>
          <div>You have successfully logged in</div>
        </div>
        <div></div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    data() {
      return {
        method: 'auth',
        captcha: false,
      }
    },
    created () {
      this.method = 'auth'
      window.addEventListener("message", this.receiveMessage, false);
      //this.sendAuthorize()
    },
    beforeDestroy () {
      window.removeEventListener("message", this.receiveMessage)
    },
    methods: {
      receiveMessage: function(event) {
        if (event.origin === this.$store.getters.getAuthServer) {
          if (event.data.message !== undefined && event.data.message === "access") {
            this.method = 'loader'
            this.sendAccess(event.data.value)
          }

          if (event.data.message !== undefined && event.data.message === "captcha") {
            this.captcha = event.data.value
          }
        }
      },
      sendAccess: function(token) {
        let data = {token: token}

        const referral = this.$cookie.get('referral')
        const referralLink = this.$cookie.get('link')
        if (referral !== undefined && referral !== null) {
          data['referral'] = referral
        }
        if (referralLink !== undefined && referralLink !== null) {
          data['referral_link'] = referralLink
        }

        this.axios.post('/api/auth/access', data)
          .then((response) => {
            if (response.data.status === 'success') {

              this.$store.commit("auth", response.data.data)

              // load balances
              this.$store.commit('loadBalances', response.data.data.balances)

              this.method = 'success'

              setTimeout(()=>{
                this.close()
              }, 1000)
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
              this.method = 'auth'
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
            this.method = 'auth'
          })
      },
      close: function() {
        this.$store.commit('closeModalAuth')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    &.captcha {
      .modal-data {
        min-height: 550px;
      }
    }
  }

  iframe {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    border: none;

  }
  .login-form {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    > div {
      flex: 1;
    }

    .logo {
      width: 100%;

      > div {
        position: relative;
        padding-bottom: 10px;

        > img {
          height: 30px;
        }
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 320px;
          margin: 0 auto;
          height: 1px;
          background-color: #302F3D;
        }
      }
    }
  }

  .loader {
    width: 200px;
    height: 200px;

    position: relative;
    color: transparent !important;
    pointer-events: none;

    &::after {
      -webkit-animation: spinAround .5s infinite linear;
      animation: spinAround .5s infinite linear;
      border: 2px solid #dbdbdb;
      border-radius: 290486px;
      border-right-color: transparent;
      border-top-color: transparent;
      content: "";
      display: block;
      height: 200px;
      width: 200px;
      margin-top: -2px;


      position: absolute !important;
    }
  }
  @keyframes spinAround {
    from { transform: rotate(0deg); }
    to { transform: rotate(359deg); }
  }
  .success {
    margin: 0 auto;
    font-size: 20px;
    font-weight: bold;
    > div {
      margin: 10px 0;
    }
    .icon {
      font-size: 30px;
      color: #4BAFFF;
    }
    .title {
      font-size: 26px;
    }
  }
</style>
