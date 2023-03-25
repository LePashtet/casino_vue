<template>
  <div>
    <div class="heading">
      <span>{{ $t('games.list') }}</span>
    </div>
    <div class="games">
      <games-game :title="$t('games.coinTitle')" :sub-title="$t('games.coinSub')" online="1024" :games="gamesCoin" image="coinflip_game.svg" :link="{name: 'GameCoinflip'}" />
      <games-game :title="$t('games.rpsTitle')" :sub-title="$t('games.rpsSub')" online="911" :games="gamesRps" image="rps_game.svg" :link="{name: 'GameRps'}" />
    </div>
  </div>
</template>

<script>
import GamesGame from "./GamesGame";
export default {
  name: 'GamesLobby',
  components: {
    GamesGame
  },
  computed: {
    gamesCoin() {
      return this.$store.getters.getGameLobbyOnline.games_coin_flip;
    },
    gamesRps() {
      return this.$store.getters.getGameLobbyOnline.games_rps;
    }
  }

}
</script>

<style scoped lang="scss">
  .heading {
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
    }
  }
  .games {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-top: 40px;
    @media screen and (max-width: 1200px){
      grid-template-columns: 1fr;
    }
  }
</style>
