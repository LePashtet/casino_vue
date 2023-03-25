<template>
  <div class="game-coinflip">
    <div class="game-coinflip-heading">
      <span @click="$router.push({name:'GameLobby'})"><font-awesome-icon color="#FF7475" icon="chevron-left"/> Back</span>
      <span class="game-coinflip-heading-end">FAQ <font-awesome-icon :icon="['far', 'question-circle']"/></span>
    </div>
    <div class="game-coinflip-filters">
      <div class="game-coinflip-filters-filter x2">
        <p>Your bet</p>
        <div class="game-coinflip-filters-filter-wrap">
          <div class="game-coinflip-filters-filter-wrap-bet">
            <div class="input">
              <span class="minus" @click="changeBetAmount(1,true)"><font-awesome-icon icon="minus" /></span>
              <input type="text" v-model.lazy="betAmount">
              <span class="plus" @click="changeBetAmount(1)"><font-awesome-icon icon="plus" /></span>
            </div>
            <button class="btn btn-red clear" @click="clearBetAmount()">Clear</button>
            <button class="btn btn-red" @click="changeBetAmount(50000000)">+0.5</button>
            <button class="btn btn-red" @click="changeBetAmount(100000000)">+1</button>
            <button class="btn btn-red" @click="changeBetAmount(1000000000)">+10</button>
            <button class="btn btn-red" @click="changeBetAmount(10000000000)">+100</button>
            <button class="btn btn-red" @click="halfBetAmount">1/2</button>
            <button class="btn btn-red" @click="x2BetAmount">x2</button>
          </div>
        </div>
      </div>
      <div class="game-coinflip-filters-play x1">
        <p>Choose Side</p>
        <div>
          <div class="coins">
            <div class="coin" @click="coin = 0" :class="{active: coin === 0}" ><img src="@/assets/coinflip_btc.svg" alt="Bitcoin"></div>
            <div class="coin" @click="coin = 1" :class="{active: coin === 1}" ><img src="@/assets/coinflip_eth.svg" alt="Ethereum">
            </div>
          </div>
          <div class="select">
            <select v-model="gamesCount">
              <option v-for="(item, key) in playTimes" :key="key" :value="item">
                {{ item }}x
              </option>
            </select>
            <button class="btn btn-green" @click="createGame(coin, selectCurrency, parseFloat(betAmount).toFixed(8), gamesCount)">Play!</button>
          </div>
        </div>
      </div>
    </div>
    <div class="game-coinflip-matches">
      <coinflip-match v-for="item in games" :key="item.id" :item="item" @joinGame="joinGame" @endMatch="endMatch" />
    </div>
  </div>
</template>

<script>
import CoinflipMatch from "./CoinflipMatch";

export default {
  name: "Coinflip",
  components: {
    CoinflipMatch,
  },
  data() {
    return {
      bet: 1,
      playTimes: [1, 2, 3],
      gamesCount: 1,
      coin: 0,
    }
  },
  computed: {
    betAmount: {
      get(){
        return (this.bet / 100000000).toFixed(8)
      },
      set(val) {
        val = val.replace(/,/g, '.');
        let res = (+(+val).toFixed(8)) *  100000000;
        let regex = /[0-9]|\./;
        if( regex.test(res) ) {
          this.bet = (+(+val).toFixed(8)) *  100000000;
        } else {
          this.bet = 0
        }
      }
    },
    balances() {
      return this.$store.getters.getBalances
    },
    games() {
      return this.$store.getters.getGameLobbyCoinFlipGames
    },
    subscribeCreate() {
      return this.$store.getters.getSubscribesCoinFlipCreate
    },
    selectCurrency() {
      return this.$store.getters.getSelectCurr;
    },
  },
  watch: {
    bet: function() {
      this.bet < 0? this.bet = 0: '';
    },
    subscribeCreate: function(value) {
      if (value === null) return
      this.createGameAnswer(value)
    }
  },
  methods: {
    enterLobby: function() {
      this.$store.dispatch('sendSocketGameCoinFlip', true)
    },
    exitLobby: function() {
      this.$store.dispatch('sendSocketGameCoinFlip', false)
    },
    createGame: function(coin, currency, amount, count) {
      this.$store.dispatch('sendSocketGameCoinFlipCreate', {side: coin, currency: currency, amount: amount, count: count})
    },
    createGameAnswer: function(data) {
      this.$store.commit('answer_game_coin_flip_create', null)

      if (data.status === "error") {
        this.$store.dispatch('addNotif', { type: 'danger', text: data.message, isClose: false, timer: 2000 }).then()
      }
    },
    joinGame: function(id) {
      this.$store.dispatch('sendSocketGameCoinFlipJoin', {id: id})
    },
    changeBalance: function (e, type) {
      if (type === 'from') this.changeFromBalance(e)
      if (type === 'to') this.changeToBalance(e)
    },
    endMatch(index) {
      this.$delete(this.games, this.games.indexOf(index));
    },
    changeBetAmount(val, min = false) {
      if (!min) {
        if (this.$store.getters.getBalance >=  (this.bet + val) / 100000000)  {
          this.bet += val;
        }
      } else {
        this.bet -= val;
      }
    },
    clearBetAmount() {
      this.bet = 1
    },
    setMaxBetAmount() {
      this.bet = this.$store.getters.getBalance * 100000000;
    },
    x2BetAmount()  {
      this.bet *= 2;
    },
    halfBetAmount() {
      this.bet /=  2;
    },
  },
  created () {
    this.enterLobby()
  },
  beforeDestroy () {
    this.exitLobby()
  },
}
</script>

<style scoped lang="scss">
.game-coinflip {
  &-heading {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #6C4365;

    > span {
      font-weight: bold;
      border-bottom: 2px solid transparent;
      padding: 0 10px;
      margin: 0 3px;
      color: $color-blue;
      cursor: pointer;
    }

    &-end {
      margin-left: auto !important;
    }
  }

  &-filters {
    display: flex;
    justify-content: space-between;

    > div {
      p {
        text-align: left;
        margin: 15px 0 20px 15px;
      }
    }

    &-filter {
      display: flex;
      flex-direction: column;
      color: #8B8ECE;
      max-width: 670px;
      margin-right: 15px;
      justify-content: space-between;

      > div {
        button {
          padding: 0 5px !important;
          font-weight: bold;
          font-size: 12px;
          width: 50px;
          height: 30px;
          margin: 0 2px;
          @media screen and (max-width: 1023px){
            max-width: none;
          }
        }
        .input{
          grid-area: input;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #8B8ECE;
          padding: 0 3px;
          height: 30px;
          box-sizing: border-box;
          border-radius: 5px;
          font-size: 28px;
          margin-right: 8px;
          > span {
            min-width: 20px;
            height: 20px;
            cursor: pointer;
            border-radius: 5px;
            color: #FFFFFF;
            font-size: 12px;
            line-height: 20px;
          }

          .minus {
            background: #2C2E5F;
            border: 1px solid #8B8ECE;

            &:hover {
              background: #23244a;
            }
          }
          .plus {
            background: #6C4365;
            border: 1px solid #FF7475;

            &:hover {
              background: #583652;
            }
          }
          > input {
            background: none;
            border: none;
            color: #FF7475;
            font-weight: bold;
            font-size: 20px;
            line-height: 24px;
            text-align: center;
            width: 100%;
          }
        }
      }

      &-wrap {
        height: 100%;
        display: flex;
        align-items: center;

        &-bet {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #272754;
          border-radius: 5px;
          padding: 10px;

          > .clear {
            background: #6C4365;
            @media screen and (max-width: 1023px) {
              grid-area: clearBtn;
            }

            &:hover {
              background: #583652;
            }
          }

          @media screen and (max-width: 1023px) {
            grid-template-columns: repeat(7, 1fr);
            grid-template-rows: 1fr 30px 30px;
            grid-template-areas: "input input input input input input input" ". . . . . . ." "clearBtn clearBtn clearBtn clearBtn clearBtn clearBtn clearBtn";
            grid-gap: 10px;
          }
        }
      }


    }
    &-play {
      display: flex;
      flex-direction: column;
      color: #8B8ECE;

      .coins{
        display: flex;
        .coin {
          padding: 10px 10px 4px 10px;

          img{
            width: 40px;
            height: 40px;
            transition-duration: .5s;
            &:hover {
              transform: scale(1.1);
            }
          }

          &.active{
            border: 2px solid #7CD572;
            box-sizing: border-box;
            filter: drop-shadow(0px 4px 12px #7CD572);
            border-radius: 50%;
            padding: 8px 8px 2px 8px;
          }

        }
      }
      .select {
        display: flex;
        margin-left: 15px;
        height: 50px;

        select {
          background-color: #272754;
          border-color: #FF7475;
          border-width: 2px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: 0;
          padding-right: 2em;
          width: 70px;
        }

        button {
          height: 100%;
          padding: 5px 5px !important;
          font-weight: bold;
          font-size: 14px;
          background: #7CD572;
          border: 2px solid #B9FFB1;
          box-sizing: border-box;
          border-radius: 6px;
          margin-left: -5px;
          width: 100px;
          &:hover {
            background: #68b160;
          }
        }
      }
      > div {
        display: flex;
        align-items: center;
      }
    }
    .x1 {
      //flex: 1;
    }
    .x2 {
      //flex: 3;
    }

    @media screen and (max-width: 1023px){
      flex-direction: column;
    }
  }

  &-matches {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-top: 40px;
    @media screen and (max-width: 1200px){
      grid-template-columns: 1fr;
    }
  }
}

.games {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 40px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}
</style>
