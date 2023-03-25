<template>
  <transition name="component-zoom" mode="out-in">
    <div class="rps-match">
      <div :class="{blur, win: win === 0, draw: win === 2}" class="rps-match-player left">
        <div class="user">
          <img :src="getAvatar(player1.avatar)" alt="Player Right">
          <p>{{ player1.username }}</p>
        </div>
        <div class="bit">
          <cryptoicon :symbol="item.currency" size="24"/>
          {{ showBalance(0) }}
        </div>
      </div>
      <div v-if="play" class="rps-match-vs">
        <div class="board">
          <div v-show="showTimer">{{ timer }}</div>
          <div v-show="!showTimer">
            <img :src="require(`@/assets/${getFigure(item.figure_created)}_blue.svg`)" alt="">
            <img :src="require(`@/assets/${getFigure(item.figure_joined)}_red.svg`)" alt="">
          </div>
        </div>
      </div>
      <div v-else class="rps-match-vs">
        vs
      </div>
      <div :class="{blur, win: win === 1, draw: win === 2}" class="rps-match-player right">
        <div v-if="play" class="user">
          <img :src="getAvatar(player2.avatar)" alt="Player Right">
          <p>{{ player2.username }}</p>
        </div>
        <button v-else-if="player1.hash !== $store.getters.getAuthData.hash" @click="join" class="play">Join!</button>
        <span v-else class="play">Waiting..</span>
        <div class="bit">
          <cryptoicon :symbol="item.currency" size="24"/>
          {{ showBalance(1) }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
name: "RpsMatch",
  props: ['item'],
  data(){
    return {
      timer: 3,
      showTimer: true,
      win: null
    }
  },
  methods:{
    getAvatar(hash) {
      return this.$store.getters.getAuthServer + '/api/avatar/' + hash + '.png';
    },
    join() {
      this.$emit('joinGame', this.item.id)
    },
    showMatch() {
      if(this.timer > 0) {
        setTimeout(() => {
          this.timer -= 1
          this.showMatch()
        }, 1000)
      }
      else {
        this.showTimer = false;
        this.winner();
        setTimeout(() => {
          this.$emit('endMatch', this.item.id);
          this.$store.dispatch('deleteGameRps', this.item.id)
        }, 5000)
      }
    },
    getFigure(num){
      switch (num){
        case 0:
          return 'dscissors';
        case 1:
          return 'stone';
        case 2:
          return 'scissors';
        case 3:
          return 'ring';
        case 4:
          return 'paper';
      }
    },
    winner() {
        if (this.item.winner === this.player1.hash) {
          this.win = 0
        } else if(this.item.winner === 'draw') {
          this.win = 2
        } else {
          this.win = 1
        }
      },
    showBalance(player) {
      if (this.win === player) {
        return (this.item.amount * 2).toFixed(8)
      } else if(typeof this.win === 'object' || this.win === 2) {
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
  },
  watch:{
    play() {
      this.showMatch();
    }
  }
}
</script>

<style lang="scss">
.rps-match {
  background: #272754;
  box-shadow: 0px 13px 15px rgba(0, 14, 68, 0.25);
  border-radius: 5px;
  height: 200px;
  display: flex;
  position: relative;
  width: 100%;
  transition: .3s ease;

  &:hover {
    box-shadow: 0px 13px 15px rgba(0, 14, 68, 0.5);
  }


  &-player {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(180deg,rgba(44, 46, 95, 0)  0%, #2C2E5F 100%);
    transition: filter 2s ease-in-out 0s, transform 4s ease-in-out 1s;
    min-width: 120px;
    border-radius: 5px;


    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;

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
      width: 70px;
      padding: 5px 5px !important;
      font-weight: bold;
      font-size: 14px;
      background: #7CD572;
      border: 2px solid #B9FFB1;
      box-sizing: border-box;
      border-radius: 6px;
      margin: auto;
    }

    .bit {
      padding: 12px 5px;
      display: flex;
      align-items: center;
      margin-top: auto;
      justify-content: space-between;
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
    &.draw {
      background: linear-gradient(180deg, #FF7475 0%, #2C2E5F 100%);
      border-radius: 5px;
      transform: translate(0, -30px);
    }
    @media screen and (max-width: 500px){
      width: 100px;
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
    height: 100%;
    width: 100%;
    justify-content: center;

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


    .board {
      height: 100%;
      width: 100%;
      display: contents;

      > div:nth-child(2) {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        background: url("~@/assets/rps_match_bg.png") no-repeat 100% 0,  url("~@/assets/rps_match_bg2.png") no-repeat  0 100%;
        background-size: 30vw, 30vw;
        position: relative;

        @media screen and (min-width: 565px){
          background-size: 20vw, 20vw;
        }
        @media screen and (min-width: 1024px){
          background-size: 15vw, 15vw;
        }
        @media screen and (min-width: 1200px){
          background-size: 8vw, 8vw;
        }

        img {
          width: 100px;
          position: absolute;
          @media screen and (max-width: 550px){
            width: 100px;
          }
          @media screen and (min-width: 550px){
            width: 140px;
          }
          @media screen and (min-width: 1200px){
            width: 100px;
          }
          @media screen and (min-width: 1440px){
            width: 120px;
          }
          @media screen and (min-width: 1920px){
            width: 140px;
          }
        }
        img{
          &:nth-child(1){
            bottom: 0;
            left: 0;
          }
          &:nth-child(2){
            top: 0;
            right: 0;
            transform: rotate(180deg);
          }
          //position: absolute;
          //bottom: 0;
          //left: 130px;
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

    &-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }

}

.blur {
  filter: blur(8px);
  transition-duration: 1s;
}

.component-zoom-leave-active {
  animation: zoomOut;
  animation-duration: .5s;
  //transition: opacity .3s ease;
}

</style>
