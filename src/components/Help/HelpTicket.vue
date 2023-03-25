<template>
  <div class="help-ticket-page">

    <Loader v-if="loader"/>

    <div v-else>
      <div class="help-title">
        <div class="form-back"><a v-if="email === undefined" @click="$router.go(-1)"><font-awesome-icon icon="angle-double-left"/>{{ $t('other.back') }}</a></div>
        <div class="help-title-text rasp">{{ $t('helpdesk.ticket') }} <span>#{{ticket.hash}}</span></div>
        <div></div>
      </div>
      <div class="help-subject">{{ $t('helpdesk.subject') }}: <span>{{ticket.title}}</span></div>

      <div class="help-buttons" v-if="ticket.status !== 'close'">
        <button @click="toggleSend" class="button button-style button-classic" :disabled="loaderClose">{{ $t('helpdesk.reply') }}</button>
        <button @click="closeTicket" class="button button-style button-classic help-close" :disabled="loaderClose">{{ $t('helpdesk.close') }}</button>
      </div>

      <div v-else class="help-status-closed">{{ $t('helpdesk.closed') }}</div>

      <transition name="fade" mode="out-in">
        <form v-if="openSend" @submit.prevent="send" class="help-reply">
          <div class="style-input" :class="{error: errors.text}">
            <textarea v-model.trim="fields.text" rows="8" placeholder="Enter message text..."></textarea>
            <div class="error-text">{{errors.text}}</div>
          </div>
          <div><button class="button button-style button-classic revert" :disabled="loaderSend">{{ $t('other.send') }}</button></div>

        </form>
      </transition>

      <div class="help-messages-block">
        <HelpMessages :messages="messages" :name="email" />
      </div>
    </div>
  </div>
</template>

<script>
  import HelpMessages from './HelpMessages'
  export default {
    name: 'HelpTicket',
    components: { HelpMessages },
    props: {
      hash: { type: String, default: undefined },
      email: { type: String, default: undefined },
      token: { type: String, default: undefined },
    },
    data() {
      return {
        loader: true,
        loaderSend: false,
        loaderClose: false,
        openSend: false,

        ticket: {},
        messages: [],
        fields:{
          text: ""
        },
        errors: {
          text: null
        },
        requestType: 'ticket'
      }
    },
    created () {
      if (this.email !== undefined && this.token !== undefined)
        this.requestType = 'token'

      this.load()
    },
    methods: {
      load: function() {
        this.loader = true
        let urlString = `/api/help/ticket/${this.hash}?t=${new Date().getTime()}`
        if (this.requestType === 'token') urlString = `/api/help/token/${this.email}/${this.token}?t=${new Date().getTime()}`

        this.axios.get(urlString)
          .then(response => {
            if (response.data.status === 'success') {
              this.ticket = response.data.data.ticket
              this.messages = response.data.data.messages

              this.loader = false
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      send: function() {
        this.loaderSend = true
        this.errors = {
          text: null
        }
        let urlString = `/api/help/ticket/${this.hash}`
        if (this.requestType === 'token') urlString = `/api/help/token/${this.email}/${this.token}`

        this.axios.post(urlString, this.fields)
          .then(response => {
            if (response.data.status === 'success') {
              this.openSend = false
              this.messages.unshift(response.data.data)
              this.fields.text = ''

            } else if (response.data.status === 'error' && response.data.type !== undefined) {
              this.errors[response.data.type] = response.data.message
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loaderSend = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      closeTicket: function() {
        if (confirm(`Are you sure you want to close ticket?`)) {
          this.loaderClose = true

          let urlString = `/api/help/ticket/${this.hash}`
          if (this.requestType === 'token') urlString = `/api/help/token/${this.email}/${this.token}`

          this.axios.delete(urlString)
            .then(response => {
              if (response.data.status === 'success') {
                this.load()
              } else {
                this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
                this.loaderClose = false
              }

            })
            .catch(() => {
              this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
            })
        }
      },
      toggleSend: function() {
        this.openSend = !this.openSend
      }
    }
  }
</script>

<style lang="scss" scoped>
  .help-ticket-page {
    margin-top: 50px;
    .help-title {
      display: flex;
      justify-content: space-between;
      .help-title-text {
        font-size: 34px;
        font-weight: bold;
      }
    }
    .help-subject {
      font-size: 26px;
      font-weight: bold;
    }
    .help-buttons {
      margin-top: 40px;
      > button {
        margin: 0 10px;
      }
      .help-close {
        background-color: #232346;
      }
    }
    .help-status-closed {
      margin-top: 40px;
      font-size: 18px;
      font-weight: bold;
      color: #FFFC;
    }
    .help-reply {
      max-width: 320px;
      margin: 20px auto 10px auto;
      textarea {
        width: 100%;
      }
      > div {
        margin: 10px 0;
      }
    }
    .help-messages-block {
      margin-top: 20px;
    }
  }
</style>
