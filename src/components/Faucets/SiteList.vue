<template>
  <div class="content-main site-list-main">

    <div class="title-wrap mo">
      <div>{{ $t('siteLIst.title') }}</div>
    </div>

    <Loader v-if="loader" />

    <div v-else>

      <div class="currency-menu">
        <div class="slider-links">
          <a @click="changeCurr('all')" class="slider-link" :class="{active: currency === 'all'}">{{ $t('other.all') }}</a>
          <a v-for="(item, key) in balances" :key="key" @click="changeCurr(item.acronym)" class="slider-link" :class="{active: currency === item.acronym}"><cryptoicon :symbol="item.acronym" /> {{item.acronym.toUpperCase()}}</a>
        </div>
      </div>

      <div class="transactions">
        <div class="transaction-table">

          <table class="full-width">
            <thead>
              <tr>
                <td>{{ $t('siteLIst.table.name') }}</td>
                <td>{{ $t('siteLIst.table.added') }}</td>
                <td>{{ $t('siteLIst.table.reward') }}</td>
                <td>{{ $t('siteLIst.table.timer') }}</td>
                <td class="select-types">
                  <div>{{ $t('siteLIst.table.paid') }}</div>
                  <div class="type-selector select">
                    <select v-model="paidType">
                      <option value="today">{{ $t('siteLIst.table.today') }}</option>
                      <option value="week">{{ $t('siteLIst.table.week') }}</option>
                      <option value="total">{{ $t('siteLIst.table.total') }}</option>
                    </select>
                  </div>
                </td>
                <td>{{ $t('siteLIst.table.users') }}</td>
                <td>{{ $t('siteLIst.table.health') }}</td>
                <td>{{ $t('siteLIst.table.rating') }}</td>
              </tr>
            </thead>
            <tbody class="items items-border items-link" v-if="transactions.length > 0">
              <tr v-for="(item, key) in transactions" :key="key" @click="goToFaucet(item.hash)">

                <td><div class="">{{item.name}}</div></td>
                <td><div class="color">{{ item.creation_date | printTime }}</div></td>
                <td><div class="amount">{{ item.reward }} <cryptoicon :symbol="item.currency" size="12" /></div></td>
                <td><div>{{item.timer_in_seconds}}</div></td>
                <td><div class="color amount">
                  <span v-if="paidType === 'today'">{{item.paid_today}}</span>
                  <span v-if="paidType === 'week'">{{item.paid_week}}</span>
                  <span v-if="paidType === 'total'">{{item.paid_total}}</span>
                  <cryptoicon :symbol="item.currency" size="12" />
                </div></td>

                <td><div class="">{{item.active_users}}</div></td>
                <td><div class="">{{item.health}}</div></td>
                <td><div class="rating">
                  <span class="rating-wrap">
                    <span v-for="n in 5" :key="n" class="rating-icon"><font-awesome-icon :icon="[(item.rating < n?'far':'fas'), 'star']" size="xs" /></span>
                  </span>
                  <span class="rating-votes">{{item.votes}}</span>
                </div></td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="8" class="has-text-centered">{{ $t('siteLIst.table.empty') }}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div class="transaction-pages">
          <Pagination :total-page="currentTotal" :current-page="currentPage" @btn-click="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  export default {
    name: 'SiteList',
    components: { Pagination },
    data() {
      return {
        loader: true,
        transactions: [],
        balances: [],
        currency: 'all',
        currentTotal: 0,
        currentPage: 0,
        paidType: 'today',
      }
    },
    created () {
      this.load(this.currentPage, this.currency)
    },
    methods: {
      load: function(page, currency) {
        this.loader = true

        let urlData = `/api/faucets/list/${page}?t=${new Date().getTime()}`
        if (currency !== 'all') {
          urlData = `/api/faucets/list/${currency}/${page}?t=${new Date().getTime()}`
        }

        this.axios.get(urlData)
          .then(response => {
            if (response.data.status === 'success') {
              this.transactions = response.data.data.transactions
              this.currentTotal = response.data.data.pages
              this.balances = response.data.data.balances
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      changePage: function(value) {
        this.currentPage = value
        this.load(this.currentPage, this.currency)
      },
      changeCurr: function(curr) {
        this.currentPage = 0
        this.currency = curr
        this.load(this.currentPage, this.currency)
      },
      goToFaucet: function(hash) {

        this.$router.push({name: "SiteDetail", params: {hash: hash}})

        //window.open(link)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .site-list-main {

    .currency-menu {
      margin: 40px 0;
      svg {
        margin-right: 5px;
      }
      a {
        color: #FFFC;
        &:hover, &.active {
          color: #FFF;
        }
      }
    }
  }
</style>
