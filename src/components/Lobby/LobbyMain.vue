<template>
  <div class="user-lobby">

    <Loader v-if="loader" />

    <div v-else>

      <div class="lobby-top-block">
        <div class="">
          <div class="lobby-top-title">{{ $t('lobby.accDet') }}</div>

          <div class="user-detail">
            <div class="user-detail-main">
              <div class="user-detail-name-wrap">
                <div class="user-detail-name">
                  <Avatar :avatar="$store.getters.getAvatar" :is-avatar="$store.getters.getAvatar" size="90" />
                  <div class="user-name"><span>{{$store.getters.getUsername}}</span></div>
                </div>
                <div class="user-progress-line-wrap">
                  <div class="user-progress-line"><div style="width: 30%"></div></div>
                </div>
              </div>
              <div class="user-detail-level-wrap">
                <div class="user-detail-level mo">14 LVL</div>
                <div>100/20000</div>
              </div>
            </div>
            <div class="user-detail-status" @click="$router.push({name: 'PremiumMain'})">
              <div class="user-detail-status-icon"><font-awesome-icon :icon="['far', 'star']" size="2x" /></div>
              <div class="user-detail-status-account mo">{{ $t('other.free') }}</div>
              <div>{{ $t('lobby.account') }}</div>
            </div>
          </div>
        </div>
        <div class="lobby-balances">
          <div class="lobby-top-title">{{ $t('lobby.balanceDet') }}</div>

          <div class="balance-selector balance-selector-lobby">
            <div class="balance-block">
              <div class="balance-name">
                <div><cryptoicon symbol="usd" size="24" /></div>
                <div>USD</div>
              </div>
              <div class="balance-value mo">~{{balances['usd'].toFixed(2)}}</div>

            </div>

            <div v-for="(item, key) in names" :key="key" class="balance-block">
              <div class="balance-name">
                <div><cryptoicon :symbol="item.acronym" size="24" /></div>
                <div>{{item.name}}</div>
              </div>
              <div class="balance-value mo">{{balances[item.acronym].toFixed(8)}}</div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './../Cabinet/Avatar'
export default {
  name: "LobbyMain",
  components: { Avatar },
  data() {
    return {
      loader: true,
      names: [],
      balances: [],
    }
  },
  created () {
    this.load()
  },
  methods: {
    load: function () {
      this.loader = true

      this.axios.get(`/api/lobby?t=${new Date().getTime()}`)
        .then(response => {
          if (response.data.status === 'success') {
            this.names = response.data.data.names
            this.balances = response.data.data.balances


            this.loader = false
          } else {
            this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
          }
        })
        .catch(() => {
          this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
        })
    },
  }
}
</script>

<style lang="scss" scoped>
  .user-lobby {
    .lobby-top-block {
      display: flex;
      > div {
        width: 50%;
        padding: 10px;

        .lobby-top-title {
          text-align: left;
          color: $color-blue;
          margin-bottom: 5px;
          padding-left: 5px;
        }
        .user-detail {
          display: flex;
          justify-content: space-between;
          width: 100%;

          background-color: $color-blue-dark;
          border-radius: 8px;
          box-shadow: 0 15px 13px rgba(0, 14, 68, 0.16);
          border-bottom: 4px solid $color-red;

          .user-detail-main {
            width: 100%;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            .user-detail-name-wrap {
              width: 100%;
              .user-detail-name {
                display: flex;
                //align-items: center;

                .user-name {
                  margin-left: 20px;
                  margin-top: 10px;
                  font-size: 20px;
                  font-weight: bold;
                  position: relative;
                  > span {
                    position: absolute;
                  }
                }
              }

              .user-progress-line-wrap {
                padding: 10px 0 3px 0;

                .user-progress-line {
                  background-color: #3F3F78;
                  height: 14px;
                  border-radius: 14px;
                  width: 100%;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  padding: 0 4px;
                  > div {
                    height: 8px;
                    border-radius: 4px;
                    background-color: $color-red;
                  }
                }
              }
            }
            .user-detail-level-wrap {
              padding: 10px 10px 0 25px;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              color: $color-red;
              .user-detail-level {
                font-size: 24px;
                font-weight: bold;
                color: $color-blue;
              }
            }
          }
          .user-detail-status {
            cursor: pointer;
            background-color: #2C2E5F;
            padding: 10px;
            border-radius: 8px;
            color: $color-red;
            transition: .3s ease;
            &:hover {
              background-color: #353872;
            }
            .user-detail-status-icon {
              padding: 10px;
              border-radius: 8px;
              background-color: $color-blue-dark;
              color: $color-blue;
              display: inline-flex;
            }
            .user-detail-status-account {
              font-size: 16px;
              font-weight: bold;
              color: #FFF;
              margin-top: 20px;
            }
          }
        }
        &.lobby-balances {
          .balance-selector-lobby {
            .balance-block {
              margin: 5px;
              flex: 1;
              .balance-value {
                text-align: left;
              }
            }
          }
        }
      }

      @media screen and (max-width: 1023px){
        flex-direction: column;
        align-items: center;

        > div {
          width: 100%;
          max-width: 500px;
        }
      }
    }
  }
</style>
