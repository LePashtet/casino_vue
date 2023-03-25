<template>
  <div class="modal modal-main">
    <div class="modal-bg" @click="close()"></div>
    <div class="modal-data modal-freebitme modal-chat-ads">
      <div class="close"><a @click="close()"><font-awesome-icon icon="times" /></a></div>

      <Loader v-if="loader" />

      <div v-else class="modal-data-wrap">
        <div class="modal-title rasp" v-html="$t('chat.buy')"></div>

        <div v-if="success" class="notification is-success">
          <span>{{ $t('chat.ordered') }}</span>
        </div>

        <form v-else @submit.prevent="send">

          <div class="ads-data">
            <div class="style-input ads-text" :class="{error: errors.text}">
              <textarea placeholder="Enter AD text" rows="4" v-model="text" :disabled="loaderSend" />
              <div class="text-counter">{{text.length}}/200 {{ $t('chat.characters') }}</div>
              <div class="error-text">{{errors.text}}</div>

            </div>

            <div class="style-input ads-text" :class="{error: errors.link}">
              <input type="text" :placeholder="$t('chat.adlink')" v-model.trim="link" :disabled="loaderSend">
              <div class="error-text">{{errors.link}}</div>
            </div>

            <div class="select-text">{{ $t('chat.billing') }}</div>
            <div class="select-curr" :class="{error: errors.curr}">
              <div class="select-curr-wrap">
                <div v-for="(item, key) in prices" :key="key">
                  <a @click="changeCurr(key)" href="#" :class="{active: key === selectCurr}"><cryptoicon :symbol="key" :size="16" />{{item.toFixed(8)}}</a>
                </div>
              </div>
              <div class="error-text">{{errors.curr}}</div>
            </div>

            <div>
              <button class="button button-style revert button-classic" :disabled="loaderSend">{{ $t('other.pay') }}</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdsModal',
    data() {
      return {
        loader: true,
        loaderSend: false,
        success: false,
        names: [],
        prices: [],
        text: "",
        link: "",
        selectCurr: null,
        errors: {
          text: null,
          link: null,
          curr: null,
        }
      }
    },
    computed: {
      balances() {
        return this.$store.getters.getBalances
      },
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/chat/ads?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {
              this.names = response.data.data.names
              this.prices = response.data.data.prices

              this.loader = false
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      changeCurr: function(curr) {
        this.selectCurr = curr
      },
      send: function() {
        this.loaderSend = true
        this.errors = {
          text: null,
          link: null,
          curr: null,
        }

        this.axios.post(`/api/chat/ads`, {text: this.text, link: this.link, curr: this.selectCurr})
          .then(response => {
            if (response.data.status === 'success') {

              this.success = true

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
      close: function() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    .modal-chat-ads {
      padding-bottom: 20px;
      width: 340px;
      min-height: 340px;


      .ads-data {
        padding: 0 20px;
        > div {
          //margin: 5px 0;
        }
      }

      .ads-text {
        display: block;
        text-align: left;
        margin-bottom: 15px;

        textarea, input {
          width: 100%;
          display: block;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        textarea {
          resize: vertical;
        }
      }

      .select-text {
        text-align: left;
      }
      .select-curr {
        margin-bottom: 15px;
        .select-curr-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          > div {
            //width: 50%;
            flex: 1;

            > a {
              background-color: $color-blue-dark;
              border: 1px solid transparent;
              border-radius: 4px;
              max-width: 250px;
              padding: 3px 10px;
              display: inline-flex;
              align-items: center;
              margin: 3px 0;

              > svg {
                margin-right: 5px;
              }

              &.active, &:hover {
                text-decoration: none;
                border: 1px solid $color-blue;
                background-color: #414179;
              }
            }
          }
        }
      }

    }
  }
</style>
