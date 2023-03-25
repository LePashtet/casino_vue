<template>
  <transition  name="component-zoom">
    <div v-show="show" class="coinflip-match">
      <div :class="{blur, win: win === 0}" class="coinflip-match-player left">
        <div class="user">
          <img :src="getAvatar(player1.avatar)" alt="Player Right">
          <img :src="require(`@/assets/coinflip_${item.side_created === 0?'btc':'eth'}.svg`)" class="user-side"
               alt="Player Side">
          <p>{{ player1.username }}</p>
        </div>
        <div class="bit">
          <cryptoicon :symbol="item.currency" size="24"/>
          {{ showBalance(0) }}
        </div>
      </div>
      <div v-if="play" class="coinflip-match-vs">
        <coin @flipped="results" class="coin" :win="winner"/>
        <span @click="openFair = true">Provably fair</span>
      </div>
      <div v-else class="coinflip-match-vs">
        vs
        <span @click="openFair = true">Provably fair</span>
      </div>
      <div :class="{blur, win: win === 1}" class="coinflip-match-player right">
        <div v-if="play" class="user">
          <img :src="getAvatar(player2.avatar)" alt="Player Right">
          <img :src="require(`@/assets/coinflip_${item.side_created === 0?'eth':'btc'}.svg`)" class="user-side"
               alt="Player Side">
          <p>{{ player2.username }}</p>
        </div>
        <button v-else-if="player1.hash !== $store.getters.getAuthData.hash" @click="join" class="play">Join!  <img :src="require(`@/assets/coinflip_${item.side_created === 0?'eth':'btc'}.svg`)" class="user-side"
                                                                                                                    alt="Player Side"></button>
        <div v-else class="user">
          <img :src="require(`@/assets/coinflip_${item.side_created === 0?'eth':'btc'}.svg`)" class="user-side"
               alt="Player Side">
          <p class="mo wait">Waiting..</p>
        </div>
        <div class="bit">
          <cryptoicon :symbol="item.currency" size="24"/>
          {{ showBalance(1) }}
        </div>
      </div>
      <div class="coinflip-match-fair" v-show="openFair">
        <div class="coinflip-match-fair-close" @click="openFair = false">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00098 1.99579L13.241 13.2341" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M13.241 2L1.99997 13.24" stroke="white" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
        <p><b>Round ID:</b></p>
        <p>{{ item.id }}</p>
        <p><b>Private seed hash:</b></p>
        <p style="cursor: pointer" @click="onCopy(item.seed_hashed, 'Private seed hash')">{{ item.seed_hashed }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import coin from "./CoinflipCoin";

export default {
  name: "CoinflipMatch",
  props: {
    item: Object

  },
  components: {
    coin
  },
  data() {
    return {
      sides: ['eth', 'btc'],
      win: null,
      blur: false,
      openFair: false,
      show: false
    }
  },
  methods: {
    onCopy(val,txt) {
      this.$copyText(val).then(() => {
        this.$store.dispatch('addNotif', {type: 'info', text: `${txt} Copied!`, isClose: true, timer: 1000}).then()
      })
    },
    join() {
      this.$emit('joinGame', this.item.id)
    },
    results() {
      this.blur = false;
      if (this.player2.hash === this.item.winner) {
        this.win = 1;
      } else {
        this.win = 0;
      }
      setTimeout(() => {
        this.$emit('endMatch', this.item.id);

        this.$store.dispatch('deleteGameCoinFlip', this.item.id)
      }, 5000)
    },
    getAvatar(hash) {
      return this.$store.getters.getAuthServer + '/api/avatar/' + hash + '.png';
    },
    showBalance(player) {
      if (this.win === player) {
        return (this.item.amount * 2).toFixed(8)
      } else if(typeof this.win === 'object') {
        return this.item.amount.toFixed(8)
      } else {
        return 0
      }
    }
  },
  computed: {
    player1() {
      return this.item.user_created;
    },
    player2() {
      return this.item.user_joined;
    },
    play() {
      return this.item.status !== 'created'
    },
    winner() {
      if (this.item.winner === this.player1.hash) {
        return this.item.side_created === 0 ? 'btc' : 'eth'
      } else {
        return this.item.side_created === 0 ? 'eth' : 'btc'
      }
    },
  },
  mounted() {
    this.show = true;
  }
}
</script>

<style lang="scss">
.coinflip-match {
  background: #272754;
  box-shadow: 0px 13px 15px rgba(0, 14, 68, 0.25);
  border-radius: 5px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  position: relative;
  transition: .3s ease;

  &:hover {
    box-shadow: 0px 13px 15px rgba(0, 14, 68, 0.5);
  }



  &-player {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(180deg, rgba(44, 46, 95, 0)  0%,  #2C2E5F 100%);
    transition: filter 2s ease-in-out 0s, transform 4s ease-in-out 1s;
    width: 130px;
    border-radius: 5px;


    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      height: 131px;

      > .wait {
        margin: 20%;
      }

      img {
        width: 70px;
        height: 70px;
        box-sizing: border-box;
        margin: 20px 0;
        border-radius: 50%;
      }

      &-side {
        width: 30px !important;
        height: 30px !important;
        position: absolute;
        bottom: 10px;
      }


    }

    .play {
      width: 100px;
      padding: 10px 10px !important;
      font-weight: bold;
      font-size: 14px;
      background: #7CD572;
      border: 2px solid #B9FFB1;
      box-sizing: border-box;
      border-radius: 6px;
      margin: auto;
      position: relative;

      img {
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        margin: 0 auto;
        pointer-events: none;
      }
    }


    .bit {
      padding: 13px 5px;
      display: flex;
      align-items: center;
      margin-top: auto;
      justify-content: space-around;
      font-weight: bold;
      font-size: 14px;
      background: #272754;
      border-radius: 5px;

    }

    &.win {
      background: linear-gradient(180deg, #7CD572 0%, #2C2E5F 100%);
      border-radius: 5px;
      transform: translate(0, -30px);
    }

  }

  &-vs {
    font-style: normal;
    font-weight: 800;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FF7475;
    display: flex;
    align-items: center;
    width: 20px;

    span {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #8B8ECE;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      cursor: pointer;

      &:hover {
        color: #a0a4ee;
      }
    }

    > svg {
      position: absolute;
      bottom: 15%;
      left: 0;
      right: 0;
      z-index: 1;
      margin: 0 auto;
      width: 110px;
      height: 100px;
    }


    .coin {
      margin: 0 auto;
      right: 0;
      left: 0;

      & > .heads {
        -webkit-animation: flipHeads 3s ease-out forwards;
        -moz-animation: flipHeads 3s ease-out forwards;
        -o-animation: flipHeads 3s ease-out forwards;
        animation: flipHeads 3s ease-out forwards;
      }

      & > .tails {
        -webkit-animation: flipTails 3s ease-out forwards;
        -moz-animation: flipTails 3s ease-out forwards;
        -o-animation: flipTails 3s ease-out forwards;
        animation: flipTails 3s ease-out forwards;
      }


      @-webkit-keyframes flipHeads {
        from {
          -webkit-transform: rotateX(
              151deg
          ) rotateY(
              1280deg
          );
          -moz-transform: rotateX(
              151deg
          ) rotateY(
              1280deg
          );
          transform: rotateX(
              151deg
          ) rotateY(
              1280deg
          );
        }
        50% {
          -webkit-transform: rotateX(
              50deg
          ) rotateY(
              1280deg
          ) scale(3);
          -moz-transform: rotateX(
              50deg
          ) rotateY(
              1280deg
          ) scale(3);
          transform: rotateX(
              50deg
          ) rotateY(
              1280deg
          ) scale(3);
        }
        to {
          -webkit-transform: rotateX(
              -50deg
          ) rotateY(
              1280deg
          ) scale(1);
          -moz-transform: rotateX(
              -50deg
          ) rotateY(
              1280deg
          ) scale(1);
          transform: rotateX(
              -50deg
          ) rotateY(
              1280deg
          ) scale(1);
        }
      }
      @-webkit-keyframes flipTails {
        from {
          -webkit-transform: rotateX(0);
          -moz-transform: rotateX(0);
          transform: rotateX(0);

        }
        50% {
          -webkit-transform: rotateX(990deg) scale(3);
          -moz-transform: rotateX(990deg) scale(3);
          transform: rotateX(990deg) scale(3);
        }
        to {
          -webkit-transform: rotateX(1980deg) scale(1);
          -moz-transform: rotateX(1980deg) scale(1);
          transform: rotateX(1980deg) scale(1);
        }
      }
    }
  }

  &-fair {
    position: absolute;
    z-index: 999999;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background: #272754;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;

    &-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    p {
      word-break: break-all;
      width: 100%;
    }
  }

}

.blur {
  filter: blur(8px);
  transition-duration: 1s;
}

.component-zoom-enter-active {
  animation: zoomIn;
  animation-duration: .5s;
}
.component-zoom-leave-active {
  animation: zoomOut;
  animation-duration: .5s;
}
.component-zoom-enter, .component-zoom-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
