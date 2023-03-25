<template>
  <div class="chat-public">

    <AdsModal v-if="modalAds" @close="closeModal()" />

    <div class="chat-public-wrap">
      <div class="public-title">
        <div class="public-button"><a href="#" @click="openModal"><font-awesome-icon :icon="['far', 'plus-square']" /></a></div>
        <div class="public-name"><span class="icon"><font-awesome-icon icon="bullhorn" size="xs" /></span>{{ $t('chat.adv') }}<span class="separator">|</span> <span>{{currentAds.username}}</span></div>
      </div>

      <transition name="fade" mode="out-in">
        <div class="public-text" :key="count">
          <div>{{currentAds.text}}</div>
          <div class="ads-link"><a :href="currentAds.link" target="_blank" rel="nofollow"><font-awesome-icon icon="external-link-alt" />{{linkAds}}</a></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import AdsModal from './AdsModal'
  export default {
    name: 'AdsBlock',
    components: { AdsModal },
    data() {
      return {
        modalAds: false,
        currentAds: {
          username: null,
          hash: null,
          text: null,
          link: null,
        },
        lengthAds: 0,
        timer: null,
        count: 0,
        loaded: false
      }
    },
    computed: {
      chatAds: function() {
        return this.$store.getters.getChatAds
      },
      linkAds: function() {
        if (this.currentAds.link === null) return ''
        let linkTmp = this.currentAds.link
        if (linkTmp.substr(0, 8) === 'https://') {
          linkTmp = linkTmp.substr(8)
        } else {
          linkTmp = linkTmp.substr(7)
        }

        if (linkTmp.length > 16) {
          return linkTmp.substr(0, 16) + '...'
        }
        return linkTmp
      }
    },
    watch: {
      chatAds: function() {
        if (!this.loaded) {
          this.loaded = true
          this.load()
        }
      }
    },
    created () {
      //this.load()
    },
    methods: {
      load: function() {
        if (this.chatAds.length === 0) return
        //console.log('load ads')

        clearInterval(this.timer)

        this.lengthAds = this.chatAds.length
        this.currentAds = this.chatAds[0]
        this.count = 1
        this.timer = setInterval(() => {
          this.count++
          if (this.count >= this.lengthAds) this.count = 0

          this.currentAds = this.chatAds[this.count]
        }, 5000)

      },
      openModal: function() {
        this.modalAds = true
      },
      closeModal: function() {
        this.modalAds = false
      }
    }
  }
</script>

<style lang="scss" scoped>

  .chat-public {
    height: 150px;
    width: 100%;
    display: flex;
    background-color: #2c2e5f;
    z-index: 1;
    .chat-public-wrap {
      padding: 10px 10px;
      width: 100%;
      display: flex;
      flex-direction: column;

      .public-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .public-button {
          width: 30px;
          height: 30px;
          background-color: #6C4365;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 6px;

          > a {
            color: #FFF;
            display: flex;
            background-color: $color-red;
            padding: 3px 4px;
            border-radius: 4px;
            box-shadow: 0 1px 11px rgba(255, 116, 117, 0.38);
            &:hover {
              transform: scale(0.9);
              box-shadow: none;
            }
          }
        }
        .public-name {
          height: 29px;
          display: flex;
          align-items: center;
          padding: 0 15px 1px 15px;
          background-color: #262653;
          border-radius: 6px;
          font-size: 14px;
          box-shadow: 0 15px 19px rgba(0, 0, 0, 0.12);
          white-space: nowrap;
          .icon {
            margin-top: -2px;
            margin-right: 10px;
          }
          .separator {
            margin: -3px 5px 0 5px;
          }
          > span {
            color: $color-red;
          }
        }
      }

      .public-text {
        flex: 1;
        background-color: #262653;
        border-radius: 6px 40px 6px 40px;
        word-break: break-all;
        text-align: left;
        padding: 0 10px 0 4px;
        //display: flex;
        //flex-direction: column;
        //justify-content: space-between;
        position: relative;
        .ads-link {
          position: absolute;
          bottom: 5px;
          right: 5px;
          //padding-bottom: 5px;
          font-size: 14px;
          > a {
            text-decoration: underline;
            background-color: #2c2e5f;
            padding: 0 8px;
            border-radius: 4px;
            > svg {
              color: $color-red;
              margin-right: 5px;
              transition: .3s ease;
            }
            &:hover {
              color: $color-blue;
              text-decoration: none;
              > svg {
                color: #a34141;
              }
            }
          }
        }
      }
    }
  }
</style>
