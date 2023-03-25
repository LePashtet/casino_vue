<template>
  <div class="api-list">
    <div v-if="loader">
      <Loader />
    </div>

    <div v-else>
      <div class="menu-links">
        <router-link :to="{name: 'SiteOwnerCreate'}" class="menu-link-end">{{ $t('siteowner.create') }} <font-awesome-icon :icon="['far', 'plus-square']"/></router-link>
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="successArchive" class="notification is-success notif-archive">
          <div>{{ $t('siteowner.success1') }}</div>
          <div>{{ $t('siteowner.success2') }}</div>
        </div>
      </transition>

      <div class="transactions">
        <div class="transaction-table">

          <table class="full-width">

            <tbody class="items items-border" v-if="services.length > 0">
              <tr v-for="(item, key) in services" :key="key">
                <td data-label="NAME"><div class="color icons-left">
                  <span v-if="item.type === 'hostobit'"><img class="hostobit-logo" src="../../assets/logo_hostobit.svg" alt="hostobit" /></span>
                  <span v-if="item.type === 'faucet'"><font-awesome-icon icon="faucet" /></span>
                  <span v-if="item.type === 'service'"><font-awesome-icon icon="file-code" /></span>
                  <span>{{ item.name }}</span>
                </div></td>
                <td data-label="TYPE"><div class=""><span class="desc">{{ $t('siteowner.type2') }}</span>{{ item.type }}</div></td>
                <td data-label="BALANCE"><div><span class="desc">{{ $t('siteowner.balance') }}</span>~{{item.balance}}$</div></td>
                <td data-label="STATUS">
                  <div class="color">{{item.status}}</div>
                </td>
                <td>
                  <div class="edit-buttons">
                    <router-link :to="{name: 'SiteOwnerBalance', params: {hash: item.hash}}" title="Balances"><font-awesome-icon icon="coins" size="xs" /></router-link>

                    <router-link :to="{name: 'SiteOwnerDetail', params: {hash: item.hash}}" class="button-stats" title="API calls"><font-awesome-icon icon="chart-bar" size="xs" /></router-link>


                    <a v-if="item.type === 'hostobit'" href="https://hostobit.com/account/faucets" target="_blank" title="Edit"><font-awesome-icon icon="edit" size="xs" /></a>
                    <router-link v-else :to="{name: 'SiteOwnerEditForm', params: {hash: item.hash, type: item.type}}" title="Edit"><font-awesome-icon icon="edit" size="xs" /></router-link>

                    <a v-if="item.status==='active' && item.type === 'hostobit'" href="https://hostobit.com/account/faucets" target="_blank" title="Archive"><font-awesome-icon icon="trash-alt" size="xs"/></a>
                    <a v-else-if="item.status==='active'" @click="archive(item.hash, item.type)" title="Archive"><font-awesome-icon icon="trash-alt" size="xs"/></a>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="has-text-centered">{{ $t('siteowner.empty') }}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'SiteOwnerList',
    data () {
      return {
        loader: true,
        successArchive: false,
        services: []
      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/sites/list?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.services = response.data.data

              //console.log(this.services.length)

              if ( this.services.length <= 0 ) {
                this.$router.push({name: 'SiteOwnerCreate'})
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
      archive: function(hash, type) {
        if (type === 'hostobit') {
          window.open('https://hostobit.com/account/faucets')
          return
        }

        if (confirm(`Please, confirm moving the service to archive. It can't be restored back`)) {
          this.loader = true

          this.axios.delete(`/api/sites/${hash}`)
            .then(response => {
              if (response.data.status === 'success') {
                this.load()
                this.successArchive = true
                setTimeout(() => {
                  this.successArchive = false
                }, 5000)
              } else {
                this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
                this.loader = false
              }

            })
            .catch(() => {
              this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
            })

        }
      }
    }
  }
</script>


<style lang="scss" scoped>

  .api-list {
    .hostobit-logo {
      height: 16px;
    }
    .notif-archive {
      padding: 5px 10px;
    }
  }
</style>
