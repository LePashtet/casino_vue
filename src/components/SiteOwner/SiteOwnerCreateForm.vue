<template>
  <div class="api-form">

    <div class="form-back"><a @click="$router.go(-1)"><font-awesome-icon icon="angle-double-left"/>{{ $t('other.back') }}</a></div>

    <div v-if="loader">
      <Loader />
    </div>

    <div v-else class="create-form">
      <div>

        <div>
          <form @submit.prevent="send" class="style-form">

            <div :class="{error: errors.url}">
              <input v-model="fields.url" placeholder="URL" type="text" :disabled="sendLoader">
              <div class="error-text">{{errors.url}}</div>
            </div>

            <div :class="{error: errors.name}">
              <input v-model="fields.name" :placeholder="$t('other.name')" type="text" :disabled="sendLoader">
              <div class="error-text">{{errors.name}}</div>
            </div>

            <div v-if="type === 'faucet'" :class="{error: errors.timer}">
              <input v-model="fields.timer" :placeholder="$t('siteowner.service2.claim')" :disabled="sendLoader">
              <div class="error-text">{{errors.timer}}</div>
            </div>

            <div v-if="type === 'faucet'" class="currency-select" :class="{error: errors.currency}">
              <div class="currency-title">{{ $t('siteowner.service2.select') }}</div>
              <div class="currency-data-wrap style-input">
                <template  v-for="(item, key) in names">
                  <div class="currency-data style-input" :key="key" :class="{error: errors.rewards[item.acronym]}">
                    <input @click="selectCurrency(item.acronym)" :checked="fields.currency.includes(item.acronym)" type="checkbox" :disabled="sendLoader">
                    <a @click="selectCurrency(item.acronym)" :class="{active: fields.currency.includes(item.acronym)}"><cryptoicon :symbol="item.acronym" size="16" /> {{item.name}}</a>
                    <input @input="changeReward(item.acronym, $event)" v-model="fields.rewards[item.acronym]" type="text" :placeholder="$t('other.reward')" :disabled="!fields.currency.includes(item.acronym) || sendLoader">
                  </div>
                  <div :key="key" class="error-text">{{errors.rewards[item.acronym]}}</div>
                </template>
              </div>
              <div class="error-text">{{errors.currency}}</div>
            </div>

            <div v-if="type === 'faucet'" class="field">
              <input v-model="fields.listing" @change="changeListing" id="switchRoundedDefault" type="checkbox" name="switchRoundedDefault" class="switch is-rounded" :disabled="sendLoader">
              <label for="switchRoundedDefault">{{ $t('siteowner.service2.listing') }}</label>
            </div>

            <div v-if="!success">
              <button class="button button-style" :disabled="sendLoader">{{ $t('other.create') }}</button>
            </div>

          </form>
        </div>

      </div>

      <div v-if="!fields.code">
        <SiteOwnerCreateRuleFaucet v-if="type === 'faucet'" />
        <SiteOwnerCreateRuleService v-else />
      </div>

      <div v-if="fields.code" class="api-create-right-form">

        <div v-if="success" class="notification is-success notif-api-create">
          <div>{{ $t('other.service') }} {{hash == null?'created':'edited'}} {{ $t('other.success') }}</div>
          <div v-if="hash == null">{{ $t('siteowner.useKey') }}</div>
        </div>

        <div class="style-input style-input-left style-input style-input-right">
          <div>
            <div class="code-label">{{ $t('siteowner.api') }}</div>
            <input id="apiKey" type="text" :value="fields.code"  onClick="this.select()" readonly>
          </div>
          <button @click="copyCode(fields.code, $event)" data-tooltip="Copied!" class="style-button-right input-2fa-copy tooltip tooltip-not-hover"><font-awesome-icon icon="copy" /></button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import SiteOwnerCreateRuleFaucet from '@/components/SiteOwner/SiteOwnerCreateRuleFaucet'
  import SiteOwnerCreateRuleService from '@/components/SiteOwner/SiteOwnerCreateRuleService'
  export default {
    name: 'SiteOwnerCreateForm',
    components: { SiteOwnerCreateRuleService, SiteOwnerCreateRuleFaucet },
    props: {
      hash: {type: String, default: null},
      type: {default: 'faucet'}
    },
    data() {
      return {
        loader: true,
        sendLoader: false,
        success: false,
        names: [],
        fields: {
          //code: "y8282rsir-adfuznk9y7-cj-hy1x9sc-gas953j98hwm71txz4zgc9vdmwnr5jnw",
          type: "",
          name: "",
          url: "",
          listing: false,
          timer: null,
          currency: [],
          rewards: {},
        },
        errors: {
          name: null,
          url: null,
          listing: null,
          timer: null,
          currency: null,
          rewards: {}
        }
      }
    },
    watch: {
      'fields.timer': function(value) {
        this.fields.timer = value.replace(/\D+/g,'')
      }
    },
    created () {
      this.load()

    },
    methods: {
      load: function() {
        this.loader = false
        let urlString = `/api/sites/new?t=${new Date().getTime()}`
        if (this.hash !== null) {
          urlString = `/api/sites/${this.hash}/edit?t=${new Date().getTime()}`
        }

        this.axios.get(urlString)
          .then(response => {
            if (response.data.status === 'success') {
              this.names = response.data.data.names
              if (this.hash !== null) {
                this.fields = response.data.data.service
              }
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
        this.sendLoader = true
        this.errors = {
          name: null,
          url: null,
          listing: null,
          timer: null,
          currency: null,
          rewards: {}
        }

        let urlString = `/api/sites/new`
        if (this.hash !== null) {
          urlString = `/api/sites/${this.hash}/edit`
        }

        this.fields.type = this.type

        this.axios.post(urlString, this.fields)
          .then(response => {
            if (response.data.status === 'success') {

              this.fields = response.data.data
              this.success = true

            } else if (response.data.status === 'error' && response.data.type !== undefined) {
              if (response.data.type === 'rewards') {
                this.errors[response.data.type][response.data.data] = response.data.message
              } else {
                this.errors[response.data.type] = response.data.message
              }
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.sendLoader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })

      },
      changeListing: function() {

      },
      isActiveCurr: function(currency) {
        for (let i=0; i<this.fields.currency.length; i++) {
          if (this.fields.currency[i] === currency) {
            return true
          }
        }
        return false
      },
      selectCurrency: function(currency) {
        for (let i=0; i<this.fields.currency.length; i++) {
          if (this.fields.currency[i] === currency) {
            if (this.fields.rewards[currency] !== undefined) {
              delete this.fields.rewards[currency]
            }
            this.fields.currency.splice(i, 1)
            return
          }
        }

        this.fields.currency.push(currency)
      },
      changeReward: function(currency, e) {
        e.target.value = e.target.value.replace(/\D+/g,'')

        this.fields.rewards[currency] = parseInt(e.target.value)
      },
      copyCode: function(link, e) {
        navigator.clipboard.writeText(link)

        let button = e.currentTarget
        button.classList.add('is-tooltip-active')
        setTimeout(function () {
          button.classList.remove('is-tooltip-active')
        }, 2000)
      },
    }
  }
</script>

<style lang="scss" src="../../styles/form.scss"></style>

<style lang="scss" scoped>
  .api-form {
    .form-back {
      text-align: left;
    }

    .create-form > div {
      &:first-of-type {
        width: 40%;
      }
      &:last-of-type {
        width: 60%;
      }
    }
    .currency-select {
      .currency-title {

      }
      .currency-data-wrap {
        .currency-data {
          display: flex;
          flex-direction: row;
          align-items: center;

          input[type=checkbox], input[type=text] {
            min-width: auto;
          }

          input[type=checkbox] {
            cursor: pointer;
          }

          input[type=text] {
            height: 28.5px;
            width: 100px;
            padding-top: 0;
            padding-bottom: 0;
          }

          > a {
            display: inline-flex;
            justify-content: flex-start;
            align-items: center;
            padding: 3px 10px;
            margin: 3px;
            border-radius: 4px;
            width: 130px;
            // cursor: default;

            background-color: $color-blue-dark;
            border: 1px solid transparent;

            > svg {
              margin-right: 5px;
            }

            &:hover, &.active {
              text-decoration: none;
              //border: 1px solid $color-blue;
              //background-color: #414179;
            }

            &.active {
              background-color: #414179;
            }

          }
        }
      }
    }

    .api-create-right-form {
      margin: 20px 10px;
      .notif-api-create {
        padding: 10px 20px;

      }

      .style-input {
        margin-top: 40px;
      }

      .code-label {
        min-width: 80px;
      }
      #apiKey {
        min-width: 340px;
      }
    }
  }
</style>
