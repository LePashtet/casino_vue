<template>
  <div class="modal modal-main">
    <div class="modal-bg" @click="close()"></div>
    <div class="modal-data modal-freebitme modal-affiliate-balance">
      <div class="close"><a @click="close()"><font-awesome-icon icon="times" /></a></div>


      <div class="modal-data-wrap">
        <div class="modal-title mo">WITHDRAW</div>

        <div v-if="successWithdraw" class="notification is-success">
          <span>Successfully withdrew affiliate funds to your balance</span>
        </div>

        <form v-else @submit.prevent="send">

          <div class="affiliate-balance-data">
            <div class="select-text">Select affiliate balance:</div>
            <div class="style-input select-curr" :class="{error: errors.curr}">
              <div class="select-curr-wrap">
                <div v-for="(item, key) in balances" :key="key">
                  <a @click="changeCurr(item.acronym, item.amount)" href="#" :class="{active: item.acronym === fields.curr}"><cryptoicon :symbol="item.acronym" :size="16" />{{item.amount.toFixed(8)}}</a>
                </div>
              </div>
              <div class="error-text">{{errors.curr}}</div>
            </div>

            <div class="style-input" :class="{error: errors.amount}">
              <label for="balanceAmount">Amount</label>
              <div>
                <input id="balanceAmount" type="text" placeholder="Enter amount" v-model.trim="fields.amount" :disabled="loaderSend">
                <button class="button button-style revert" :disabled="loaderSend">WITHDRAW</button>
              </div>
              <div class="error-text">{{errors.amount}}</div>
            </div>
          </div>



        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AffiliateBalancesAction',
    props: ['balances'],
    data() {
      return {
        loaderSend: false,
        successWithdraw: false,
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
    methods: {
      send: function() {
        this.loaderSend = true
        this.errors = {
          curr: null,
          amount: null
        }

        this.axios.post(`/api/affiliate/balances`, this.fields)
          .then(response => {
            if (response.data.status === 'success') {
              this.successWithdraw = true

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
      changeCurr: function(curr, amount) {
        this.fields.curr = curr
        this.fields.amount = amount
      },
      close: function() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-affiliate-balance {
    padding-bottom: 20px;
    width: 340px;
    min-height: 40px;

    .notification {
      margin: 0 10px;
    }

    .affiliate-balance-data {
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
