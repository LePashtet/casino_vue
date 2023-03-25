<template>
  <div>
    <div v-if="loader" class="loader">
      <Loader />
    </div>

    <div v-else>

      <div class="transactions">
        <div class="transaction-table">

          <table class="full-width">

            <tbody class="items items-border" v-if="sessions.length > 0">
              <tr v-for="(item, key) in sessions" :key="key">
                <td data-label="BROWSER"><div v-if="item.user_agent !== null">{{item.user_agent.Name}}</div><div v-else></div></td>
                <td data-label="OS"><div v-if="item.user_agent !== null">{{item.user_agent.OS}}</div><div v-else></div></td>
                <td data-label="TIME"><div class="color">{{item.time | printTimeFull}}</div></td>
                <td data-label="">
                  <div class="close-buttons">
                    <button v-if="item.current" class="button-style blocked" disabled>CURRENT SESSION</button>
                    <button v-else @click="logoutOne(key)" class="button-style">CLOSE SESSION</button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4" class="has-text-centered">No transactions found</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

      <div v-if="sessions.length > 1">
        <button class="button-logout-all button-style" @click="logoutAll">Logs out all devices except for this one</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SettingsSessions',
    data() {
      return {
        loader: true,
        sessions: [],
      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/settings/sessions?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {
              this.sessions = response.data.data

              this.loader = false
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      logoutOne: function(index) {
        this.axios.post(`/api/settings/sessions`, {id: index})
          .then(response => {
            if (response.data.status === 'success') {
              this.load()
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      logoutAll: function() {
        this.axios.delete(`/api/settings/sessions`)
          .then(response => {
            if (response.data.status === 'success') {
              this.load()
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .close-buttons {
    button {
      min-width: 180px;
      font-size: 14px;
      height: 100%;
    }
  }
  .button-logout-all {
    font-size: 18px;
    padding: 5px 25px;
  }
</style>
