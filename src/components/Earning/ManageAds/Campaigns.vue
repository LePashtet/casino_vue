<template>
  <div>
    <div v-if="loader">
      <Loader/>
    </div>

    <div v-else>

      <div v-if="create === 'success'" class="notification is-success notif-create">
        <div>Your ad campaign is created successfully and sent for moderation.</div>
        <div>We will notify you by e-mail when it is approved.</div>
      </div>

      <div v-if="update === 'success'" class="notification is-success notif-create">
        <div>Your ad campaign is updated successfully and sent for moderation.</div>
        <div>We will notify you by e-mail when it is approved.</div>
      </div>

      <div class="transactions">
        <div class="transaction-table">

          <table class="full-width">

            <tbody class="items items-border" v-if="campaigns.length > 0">
              <tr v-for="(item, key) in campaigns" :key="key">
                <td data-label="HASH"><div class="color">#{{ item.hash }}</div></td>
                <td data-label="NAME"><div class="">{{item.name}}</div></td>
                <td data-label="URL"><div>{{link(item.url)}}</div></td>
                <td data-label="STATUS"><div class="color">{{status(item.status)}}</div></td>
                <td>
                  <div class="edit-buttons">
                    <router-link :to="{name: 'EarningAdsManageCampaignsEdit', params: {hash: item.hash}}" title="edit"><font-awesome-icon icon="edit" size="xs"/></router-link>
                    <a @click="archive(item.hash, item.name)" title="archive"><font-awesome-icon icon="trash-alt" size="xs"/></a>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4" class="has-text-centered">No campaigns found</td>
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
  import Pagination from '../../Pagination'
  export default {
    name: 'EarningAdsCampaigns',
    components: { Pagination },
    props: ['create', 'update'],
    data() {
      return {
        loader: true,

        campaigns: [],
        currentTotal: 0,
        currentPage: 0,
      }
    },
    created () {
      this.load(this.currentPage)
    },
    methods: {
      load: function (page) {
        this.loader = true

        this.axios.get(`/api/ptc/manage/campaigns/${page}?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.campaigns = response.data.data.transactions
              this.currentTotal = response.data.data.pages
            } else {
              this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
          })
      },
      archive: function(hash, name) {
        if (confirm(`Are you sure you want to archive campaign "${name}"?`)) {
          this.loader = true

          this.axios.delete(`/api/ptc/manage/campaigns/${hash}`)
            .then(response => {
              if (response.data.status === 'success') {
                this.load(this.currentPage)

              } else {
                this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
                this.loader = false
              }

            })
            .catch(() => {
              this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
            })
        }
      },
      changePage: function (value) {
        this.currentPage = value
        this.load(this.currentPage)
      },
      link: function(link) {
        if (link === null) return ''
        let linkTmp = link
        if (linkTmp.substr(0, 8) === 'https://') {
          linkTmp = linkTmp.substr(8)
        } else {
          linkTmp = linkTmp.substr(7)
        }

        const re = /\//g;
        if (linkTmp.search(re) > 0) {
          linkTmp = linkTmp.substr(0, linkTmp.search(re))
        }

        return linkTmp
      },
      status: function(text) {
        switch (text) {
          case 'wait':
            return 'moderation'
        }
        return text
      }
    }
  }
</script>


<style scoped>
  .notif-create {
    padding: 5px 20px;
  }
</style>
