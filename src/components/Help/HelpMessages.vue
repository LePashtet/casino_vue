<template>
  <div class="help-messages">
    <transition-group name="help-list" tag="div">
      <div v-for="item in messages" :key="item.time" class="help-message" :class="{support: item.sender === 'support'}">

        <div class="help-message-sender">
          <Avatar v-if="item.sender === 'user'" :avatar="$store.getters.getAvatar" :is-avatar="$store.getters.getAvatar" :size="60" />
          <div v-else class="support-avatar">
            <img src="../../assets/logo_clean.svg" alt="support" />
          </div>
        </div>

        <div class="help-message-data">

          <div class="help-message-title">
            <div>{{item.sender==='user'?(name!==undefined?name:$store.getters.getUsername):'Support'}}</div>
            <div class="help-message-time">{{item.time | printTimeFull}}</div>
          </div>

          <div class="help-message-text">{{item.text}}</div>

        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import Avatar from '../Cabinet/Avatar'
  export default {
    name: 'HelpMessages',
    components: { Avatar },
    props: {
      messages: {type: Array, default: () => []},
      name: {type: String, default: undefined}
    }
  }
</script>

<style lang="scss" scoped>
  .help-list-item {
    display: inline-block;
  }
  .help-list-enter-active, .help-list-leave-active {
    transition: all .5s;
  }
  .help-list-enter, .help-list-leave-to {
    opacity: 0;
    transform: translateY(-70px);
  }
  .help-messages {
    display: flex;
    justify-content: center;

    .help-message {
      display: flex;
      max-width: 500px;
      margin: 15px 0;

      &.support {
        .help-message-sender {
          order: 1;
        }
      }

      .help-message-sender {
        padding: 10px;
        .support-avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 60px;
          border-radius: 30px;
          border: 1px solid rgba(198, 209, 222, 0.51);
          > img {
            width: 50px;
            height: 50px;
            //border-radius: 30px;
          }
        }
      }
      .help-message-data {
        width: 100%;
        background-color: $color-blue-dark;
        border-radius: 8px;
        .help-message-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 1px solid #626491;
          padding: 3px 10px;
          .help-message-time {
            font-size: 12px;
          }
        }
        .help-message-text {
          padding: 10px;
          text-align: left;
        }
      }
    }

  }
</style>
