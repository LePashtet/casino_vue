<template>
  <div class="help-list">


    <Loader v-if="loader" />

    <div v-else-if="tickets.length <= 0" class="no-tickets">
      <div class="">{{ $t('helpdesk.notickets') }}</div>
      <div><a @click="openModal()" class="button-create">{{ $t('helpdesk.create') }}</a></div>
    </div>


    <div v-else class="transactions">

      <div class="help-create"><a @click="openModal()" class="button-create">{{ $t('helpdesk.create') }}</a></div>

      <div class="transaction-table">

        <table class="full-width">

          <tbody class="items items-border items-link" v-if="tickets.length > 0">
            <tr v-for="(item, key) in tickets" :key="key" @click="openTicket(item.hash)">
              <td data-label="HASH"><div class="color">{{item.hash}}</div></td>
              <td data-label="STATUS"><div class=""><span class="desc">{{ $t('helpdesk.status') }}</span>{{getStatus(item.status)}}</div></td>
              <td data-label="SUBJECT"><div class=""><span class="desc">{{ $t('helpdesk.subject') }}</span>{{ item.title }}</div></td>
              <td data-label="DATE"><div class="color">{{item.time | printTimeFull}}</div></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4" class="has-text-centered">{{ $t('helpdesk.notickets') }}</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="transaction-pages">
        <Pagination :total-page="currentTotal" :current-page="currentPage" @btn-click="changePage" />
      </div>
    </div>

    <HelpModal v-if="modalOpen" @close="modalClose" @reload="reloadData" />
  </div>
</template>

<script>
  import HelpModal from './HelpModal'
  import Pagination from '../Pagination'
  export default {
    name: 'HelpList',
    components: { HelpModal, Pagination },
    data() {
      return {
        loader: true,
        tickets: [],
        currentTotal: 0,
        currentPage: 0,

        modalOpen: false,
      }
    },
    created () {
      this.load(this.currentPage)
    },
    methods: {
      load: function(page) {
        this.loader = true

        this.axios.get(`/api/help/${page}?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.tickets = response.data.data.transactions
              this.currentTotal = response.data.data.pages
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      getStatus: function(status) {
        switch (status) {
          case 'open': return 'open'
          case 'reply': return 'new reply'
          case 'close': return 'closed'
        }
      },
      reloadData: function() {
        this.load(this.currentPage)
      },
      changePage: function(value) {
        this.currentPage = value
        this.load(this.currentPage)
      },
      openModal: function() {
        this.modalOpen = true
      },
      modalClose: function() {
        this.modalOpen = false
      },
      openTicket: function(hash) {
        this.$router.push({name: 'HelpTicket', params:{hash: hash}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .help-list {
    padding-top: 50px;
    .no-tickets {

      font-size: 18px;
      font-weight: bold;

      > div {
        margin: 10px 0;
        text-align: left;
      }
    }
    .help-create {
      text-align: left;
    }
  }
</style>
