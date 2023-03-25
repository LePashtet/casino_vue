<template>
  <div>

    <div v-if="loader" class="loader">
      <Loader />
    </div>

    <div v-else class="settings-page">


      <div class="setting-wrap">

        <div class="setting-block">
          <div class="setting-title">User details</div>
          <div class="setting-data">
            <div>
              <SettingsAvatar />
            </div>
            <div class="user-detail">
              <div class="user-name">{{ $store.getters.getUsername }}</div>
              <div class="user-email">{{settings.email}}</div>
            </div>
          </div>
        </div>
        <div class="setting-block">
          <div class="setting-title">Mailing</div>
          <form class="style-form">
            <div class="field">
              <input v-model="settings.email_promo" @change="changeEmailPromo" id="switchRoundedDefault" type="checkbox" name="switchRoundedDefault" class="switch is-rounded">
              <label for="switchRoundedDefault">Receive marketing emails</label>
            </div>

          </form>
        </div>
        <div class="setting-block">
          <div class="setting-title">Change password</div>
          <form @submit.prevent="changePassword" class="style-form">
            <div :class="{error: passwordsError.password_old}">
              <input v-model="passwords.password_old" placeholder="Old password" type="password" :disabled="loaderPassword">
              <div class="error-text">{{passwordsError.password_old}}</div>
            </div>
            <div :class="{error: passwordsError.password_new}">
              <input v-model="passwords.password_new" placeholder="New password" type="password" :disabled="loaderPassword">
              <div class="error-text">{{passwordsError.password_new}}</div>
            </div>
            <div :class="{error: passwordsError.password_repeat}">
              <input v-model="passwords.password_repeat" placeholder="Repeat password" type="password" :disabled="loaderPassword">
              <div class="error-text">{{passwordsError.password_repeat}}</div>
            </div>
            <div>
              <button v-if="!successPassword" class="button button-style" :disabled="loaderPassword">Change</button>
              <div v-else class="button-success"><font-awesome-icon icon="check-circle" /><span>Changed</span></div>
            </div>
          </form>
        </div>

      </div>

      <div class="setting-wrap">
        <div class="setting-block">
          <div class="setting-title">Two-Factor authentication</div>

          <div v-if="successTwoFactor" class="notification is-success">
            <span>2fa has been activated successfully on your account</span>
          </div>

          <div v-if="!successTwoFactor && !settings.otp_status" class="two-factor-block">
            <div>
              <div class="setting-qr-code">
                <qrcode-vue :value="`otpauth://totp/freebitme.com?secret=${settings.otp}&issuer=Freebitme.com`" :size="150" level="L"></qrcode-vue>
              </div>

              <div class="setting-qr-link">
                <a :href="`otpauth://totp/freebitme.com?secret=${settings.otp}&issuer=Freebitme.com`" class="is-hidden-desktop">Two factor link</a>
              </div>
            </div>

            <div class="style-input style-input-right">
              <input class="input-2fa-data" type="text" :value="settings.otp" onClick="this.select()" readonly>
              <button @click="copyCode(settings.otp)" data-tooltip="Copied!" class="style-button-right input-2fa-copy tooltip tooltip-not-hover"><font-awesome-icon icon="copy" /></button>

            </div>

            <div class="two-factor-text two-factor-text-desktop">
              Scan or copy this QR-code to your authenticator app,then input the code returned below
            </div>

            <div class="two-factor-text two-factor-text-mobile">
              Click the link or copy this code to your authenticator app, then input the code returned below
            </div>

            <div>
              <CodeField :code-error="errorTwoFactor" :code-loader="loaderTwoFactor" @code="twoFactorCode" />
            </div>

          </div>

          <div v-if="deactivateTwoFactor" class="notification is-success">
            <span>2fa has been deactivated successfully on your account</span>
          </div>

          <div v-if="!deactivateTwoFactor && settings.otp_status" class="two-factor-block">

            <div class="two-factor-text">
              To deactivate 2fa, input the temp code from your authenticator app below
            </div>

            <div>
              <CodeField :code-error="errorTwoFactor" :code-loader="loaderTwoFactor" @code="twoFactorCode" />
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>

  import SettingsAvatar from './SettingsAvatar'
  import QrcodeVue from 'qrcode.vue'
  import CodeField from '../CodeField'
  export default {
    name: 'Settings',
    components: { CodeField, QrcodeVue, SettingsAvatar },
    data () {
      return {
        loader: true,
        loaderPassword: false,
        successPassword: false,
        loaderTwoFactor: false,
        successTwoFactor: false,
        deactivateTwoFactor: false,
        errorTwoFactor: null,
        settings: {
          email: null,
          email_promo: true,
          otp: null,
          otp_status: false,
        },
        passwords: {
          password_old: "",
          password_new: "",
          password_repeat: "",
        },
        passwordsError: {
          password_old: "",
          password_new: "",
          password_repeat: "",
        }

      }
    },
    created () {
      this.load()
    },

    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/settings?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.settings = response.data.data
              this.loader = false
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      changePassword: function() {
        this.loaderPassword = true
        this.passwordsError = {
          password_old: "",
          password_new: "",
          password_repeat: "",
        }

        this.axios.post(`/api/settings/password`, this.passwords)
          .then(response => {
            if (response.data.status === 'success') {
              this.successPassword = true
              setTimeout(() => {
                this.successPassword = false
              },5000)
            } else if (response.data.status === 'error' && response.data.type !== undefined) {
              this.passwordsError[response.data.type] = response.data.message
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loaderPassword = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      changeEmailPromo: function() {
        this.axios.post(`/api/settings/email/promo`, {data: this.settings.email_promo})
          .then(response => {
            if (response.data.status !== 'success') {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loaderPassword = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      twoFactorCode: function(code) {
        if (this.loaderTwoFactor) return
        this.loaderTwoFactor = true
        this.errorTwoFactor = null

        this.axios.post(`/api/settings/2fa`, {value: code})
          .then(response => {
            if (response.data.status !== 'success') {
              this.errorTwoFactor = response.data.message
              //this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            } else {
              if (!this.settings.otp_status) {
                this.successTwoFactor = true
              } else {
                this.deactivateTwoFactor = true
              }
            }
            this.loaderTwoFactor = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      copyCode: function(code) {
        navigator.clipboard.writeText(code)

        let button = document.querySelector('.input-2fa-copy')
        button.classList.add('is-tooltip-active')
        setTimeout(function () {
          button.classList.remove('is-tooltip-active')
        }, 2000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .settings-page {
    display: flex;
    .setting-wrap {
      flex: 1;
      text-align: left;
      .setting-block {
        margin-bottom: 30px;
        .setting-title {
          color: $color-blue;
          font-size: 18px;
        }
        .setting-data {
          padding: 10px 0 10px 10px;
          display: flex;
          > div {
            margin: 0 10px;
          }
          .user-detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            > div {
              font-size: 18px;
              font-weight: bold;
              margin: 3px 0;
            }
            .user-name {
              color: $color-blue;
            }
            .user-email {
              color: $color-red;
            }
          }
        }
        .style-form {
          padding-left: 10px;
        }

        .two-factor-success {
          background-color: #23d160;
          color: #fff;
          margin: 10px;
          border-radius: 4px;
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          padding: 10px 15px;
        }
        .two-factor-block {
          margin: 10px;
          max-width: 400px;

          .setting-qr-code {
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 12px;
            background-color: #FFF;
            display: inline-flex;

            > div {
              display: flex;
            }

            @media (max-width: 768px) {
              display: none;
            }
          }

          .setting-qr-link {
            margin-bottom: 10px;
            text-decoration: underline;
            display: none;
            @media (max-width: 768px) {
              display: block;
            }
          }

          .style-input {
            margin-bottom: 10px;
          }

          .two-factor-text {
            margin-bottom: 10px;
            &.two-factor-text-desktop {
              display: block;
              @media (max-width: 768px) {
                display: none;
              }
            }
            &.two-factor-text-mobile {
              display: none;
              @media (max-width: 768px) {
                display: block;
              }
            }
          }

          .input-2fa-data {
            font-size: 14px;
            min-width: 320px;
            @media screen and (max-width: 1023px){
              min-width: auto;

            }
          }
        }
      }
    }

    @media screen and (max-width: 1023px){
      flex-direction: column;
    }
  }
</style>
