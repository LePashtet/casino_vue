<template>
  <div class="modal modal-main">
    <div class="modal-bg" @click="close()"></div>
    <div class="modal-data modal-freebitme modal-api-balance">
      <div class="close"><a @click="close()"><font-awesome-icon icon="times" /></a></div>

      <Loader v-if="loader" />

      <div v-else class="modal-data-wrap">
        <div class="modal-title mo">#{{hash}}</div>

        <div v-if="successDeposit" class="notification is-success">
          <span>Balance topped up successfully</span>
        </div>

        <div v-else-if="successWithdraw" class="notification is-success">
          <span>Successfully withdrew API funds to your balance</span>
        </div>

        <form v-else @submit.prevent="send">

          <div class="api-balance-data">

            <div class="balance-menu slider-links">
              <a @click="changeActionType('deposit')" class="slider-link" :class="{active: actionType === 'deposit'}">Deposit</a>
              <a @click="changeActionType('withdraw')" class="slider-link" :class="{active: actionType === 'withdraw'}">Withdraw</a>
            </div>


            <div v-if="actionType === 'deposit' && balances.length === 0" class="notification is-info">
              <span>You don't have enough account balance to deposit</span>
            </div>
            <div v-else-if="actionType === 'withdraw' && balancesApi.length === 0" class="notification is-info">
              <span>You don't have enough balance to withdraw</span>
            </div>
            <div v-else>

              <div v-if="actionType === 'deposit'">
                <div class="select-text">Select billing method:</div>
                <div class="style-input select-curr" :class="{error: errors.curr}">
                  <div class="select-curr-wrap">
                    <div v-for="(item, key) in balances" :key="key">
                      <a @click="changeCurr(key)" href="#" :class="{active: key === fields.curr}"><cryptoicon :symbol="key" :size="16" />{{item.toFixed(8)}}</a>
                    </div>
                  </div>
                  <div class="error-text">{{errors.curr}}</div>
                </div>
              </div>

              <div v-else>
                <div class="select-text">Select api balance:</div>
                <div class="style-input select-curr" :class="{error: errors.curr}">
                  <div class="select-curr-wrap">
                    <div v-for="(item, key) in balancesApi" :key="key">
                      <a @click="changeCurr(key)" href="#" :class="{active: key === fields.curr}"><cryptoicon :symbol="key" :size="16" />{{item.toFixed(8)}}</a>
                    </div>
                  </div>
                  <div class="error-text">{{errors.curr}}</div>
                </div>
              </div>


              <div class="style-input" :class="{error: errors.amount}">
                <label for="balanceAmount">Amount</label>
                <div>
                  <input id="balanceAmount" type="text" placeholder="Enter amount" v-model.trim="fields.amount" :disabled="loaderSend">
                  <button class="button button-style revert" :disabled="loaderSend">{{actionType === 'deposit'?'DEPOSIT':'WITHDRAW'}}</button>
                </div>
                <div class="error-text">{{errors.amount}}</div>
              </div>

            </div>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'SiteOwnerBalanceAction',
    props: ['hash', 'action'],
    data() {
      return {
        loader: true,
        successDeposit: false,
        successWithdraw: false,
        loaderSend: false,
        names: [],
        balancesApi: [],
        actionType: "",
        fields: {
          curr: "",
          amount: 0
        },
        errors: {
          curr: null,
          amount: null
        }
      }
    },
    computed: {
      balances() {
        return this.$store.getters.getBalances
      },
    },
    created () {
      this.actionType = this.action
      this.load()
    },
    methods: {
      setDefaultCurr: function() {
        if (this.actionType === 'deposit') {
          this.fields.curr = Object.keys(this.balances)[0]
        } else {
          this.fields.curr = Object.keys(this.balancesApi)[0]
        }
      },
      load: function() {
        this.loader = true
        this.axios.get(`/api/sites/${this.hash}/balance/action?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.names = response.data.data.names
              this.balancesApi = response.data.data.balances_api

              this.setDefaultCurr()
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      send: function() {
        this.loaderSend = true
        this.errors = {
          curr: null,
          amount: null
        }

        this.axios.post(`/api/sites/${this.hash}/balance/action`, {type: this.actionType, hash: this.hash, curr: this.fields.curr, amount: this.fields.amount})
          .then(response => {
            if (response.data.status === 'success') {
              if (this.actionType === 'deposit') this.successDeposit = true
              if (this.actionType === 'withdraw') this.successWithdraw = true

              this.$emit('reload')
              setTimeout(() => {
                this.$emit('close')
              }, 3000)
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
      changeActionType: function(action) {
        this.actionType = action
        this.setDefaultCurr()
      },
      changeCurr: function(curr) {
        this.fields.curr = curr
      },
      close: function() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>

  .modal-api-balance {
    padding-bottom: 20px;
    width: 340px;
    min-height: 40px;

    .notification {
      margin: 0 10px;
    }

    .modal-title {
      //text-align: center;
    }

    .api-balance-data {
      padding: 0 40px;

      .select-text {
        text-align: left;
        padding: 0 5px;
      }

      .select-curr {
        margin-bottom: 15px;

        .select-curr-wrap {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;

          > div {
            display: flex;
            //width: 50%;
            //margin: 0 5px;

            > a {
              width: 100%;
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

      .style-input {
        display: flex;
        flex-direction: column;
        text-align: left;

        > label {
          padding: 0 5px;
        }
        input {
          font-size: 14px;
          max-width: 90px;
        }
        > div {
          display: flex;
          justify-content: space-between;
        }
      }

      .button-style {
        min-width: 140px;
        padding: 5px 10px;
        font-size: 20px;
      }
    }
  }

</style>
