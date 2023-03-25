<template>
  <div class="games-item" @click="$router.push(link)">
    <div class="games-item-left">
      <img :src="require(`@/assets/${image}`)" alt="Icon">
    </div>
    <div class="games-item-right">
      <h3 class="mo">{{ title }}</h3>
      <h4>{{ subTitle }}</h4>
      <div class="next mo">
        <span>{{ games }} {{ $t('games.title') }}</span> {{ $t('games.available') }}
        <router-link :to="link"><font-awesome-icon icon="chevron-right" /></router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "GamesGame",
  props: {
    title: String,
    subTitle: String,
    games: Number,
    image: String,
    link: Object
  }
}
</script>

<style scoped lang="scss">
.games-item {
  background: linear-gradient(270deg, #272754 0%, #272754 100%);
  box-shadow: 0px 15px 13px rgba(0, 14, 68, 0.1);
  border-radius: 101px 10px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  cursor: pointer;
  transition: .3s linear;
  &:hover {
    box-shadow: 0px 15px 13px rgba(0, 14, 68, 0.5);
  }
  &-left {
    height: 100%;
    background: linear-gradient(270deg, #272754 0%, #2B2D5E 100%);
    box-shadow: 0px 15px 13px rgba(0, 14, 68, 0.1);
    border-radius: 101px 10px 10px 10px;
    transform: rotate(-180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      transform: rotate(180deg);
      //width: 100%;
      height: 100%;

    }
  }

  &-right {
    padding-right: 20px;
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;

    h3{
      font-weight: 700;
      font-size: 24px;
    }
    h4 {
      font-size: 14px;
      color: #8B8ECE;
    }
    .online {
      font-weight: bold;
      font-size: 16px;
      color: #FF7475;
    }
    .next {
      font-weight: 400;
      font-size: 16px;
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: space-around;
      margin-top: 20px;
      color: #8B8ECE;

      span {
        font-weight: bold;
        text-decoration: underline;
        color: #FFFFFF;
        margin-right: 5px;
        text-transform: lowercase;

      }
      a{
        color: #FF7475;
        border: 1px solid #FF7475;
        border-radius: 6px;
        width: 38px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 15px;

        svg {
          width: 10px;
          height: 18px;
        }
      }
    }
  }
}
</style>
