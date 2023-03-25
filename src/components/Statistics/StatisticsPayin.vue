<template>
  <div>
    <Loader v-if="loader"/>

    <div v-else class="transactions withdrawal">
      <div class="withdrawal-title">
        <div class="transaction-title">{{ $t('statistics.payin') }}</div>
      </div>
      <div class="transaction-table">

        <table class="full-width campaigns-table">

          <thead>
          <tr>
            <td>{{ $t('statistics.curr') }}</td>
            <td>{{ $t('other.amount') }}</td>
            <td>{{ $t('other.address') }}</td>
            <td>TxID</td>
            <td>{{ $t('statistics.status') }}</td>
            <td>{{ $t('other.time') }}</td>
            <td></td>
          </tr>
          </thead>
          <tbody class="items items-border" v-if="loadedData.length > 0">
          <tr v-for="(item, key) in loadedData" :key="key">
            <td data-label="Curr">
              <div class="curr">
                <cryptoicon :symbol="item.curr" size="24"/>
                {{ item.curr }}
              </div>
            </td>
            <td data-label="Amount">
              <div>{{ item.amount }}</div>
            </td>
            <td data-label="Address">
              <div class="hoverable">{{ item.address }}</div>
            </td>
            <td data-label="TxID"><div class="hoverable"><a :href="getTxUrl(item.curr, item.txid)">{{item.txid}}</a></div></td>
            <td data-label="Status">
              <div class="">{{ item.status }}</div>
            </td>
            <td data-label="Time">
              <div class="color">{{ item.time | printTimeFull }}</div>
            </td>
            <td>
              <div class="edit-buttons">
                <router-link @click.native="copyToChat(item.txid, item.curr)" to="#"><font-awesome-icon icon="comment"/></router-link>
              </div>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="4" class="has-text-centered">{{ $t('statistics.noLogs') }}</td>
          </tr>
          </tbody>
        </table>

      </div>
      <div class="transaction-pages">
        <pagination :total-page="pagination.count" :current-page="pagination.count" @btn-click="changePage"/>
      </div>
    </div>

  </div>

</template>

<script>
import Pagination from "../Pagination";
import currencyMixin from "../../mixins/currencyMixin";

export default {
  name: 'StatisticsPayin',
  data() {
    return {
      loader: true,
      loadedData: [],
      pagination: {}
    }
  },
  components: {Pagination},
  mixins: [currencyMixin],
  created() {
    this.load()
  },
  methods: {
    load: function (page = 1) {
      this.loader = true

      this.axios.get(`/api/payin/history/${page}`)
        .then(response => {
          console.log(response)
          if (response.data.status === 'success') {
            this.loadedData = response.data.data.transactions;
            this.pagination.count = response.data.data.count;
            this.pagination.pages = response.data.data.pages;
          } else {
            this.$store.dispatch('addNotif', {
              type: 'danger',
              text: response.data.message,
              isClose: false,
              timer: 2000
            }).then()
          }
          this.loader = false
        })
        .catch(() => {
          this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
        })
    },
    changePage: function (value) {
      this.currentPage = value;
      this.load(value)
    },
    copyToChat: function (value, curr){
      this.$store.commit('chatClose');
      this.$store.commit('setChatShare', `txid(${value}|${curr})`);
      setTimeout(()=> {
        this.$store.commit('chatOpen');
      }, 10)

    }
  }
}
</script>

<style lang="scss" scoped>
.withdrawal.transactions {
  margin-top: 40px;

  .withdrawal-title {
    display: flex;
    justify-content: space-between;
  }

  .transaction-table table.campaigns-table {
    //table-layout: auto;

    .items td {
      //width: 100%;
      position: relative;
      > div {
        height: calc(100% - 30px);
        padding: 10px;
        border: 5px solid #2b2d5e;
        border-right-width: 0;
        border-left-width: 0;
        background-color: #272754;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;

        a {
          color: rgb(255, 116, 117);
        }
        &.hoverable:hover {
          position: absolute;
          z-index: 10000;
          left: 0;
          right: 0;
          top: 0;
          width: max-content;
        }
        &.curr  {
          text-transform: uppercase;
        }
      }


    }
  }
}
</style>

