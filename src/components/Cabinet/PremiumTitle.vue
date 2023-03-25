<template>
  <div class="premium-header flex f-wrap">
    <p class="premium-header-txt">Hello, <span class="color-red">{{ $store.getters.getUsername }}!</span> You're on a</p>

    <div v-if="!isPremium" class="premium-header-buy">
      <span><span class="color-red bold">Free</span> account</span>
      <router-link :to="{name: 'PremiumMain'}" class="btn btn-red buy-button">Upgrade to <span class="color-red">PRO</span></router-link>
    </div>

    <div v-else class="premium-header-block border flex">
      <div class="flex">
        <span class="icon color-green">
          <font-awesome-icon :icon="['far', 'star']" />
        </span>
        <p class="bold">Premium</p>
      </div>
      <div class="flex">
        <span class="icon">
          <img src="../../assets/premium/timer_null.svg" alt="" />
        </span>
        <p>Will end <span class="color-green bold">{{ premiumEnd | printTime }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PremiumTitle',
    computed: {
      premiumEnd: function () {
        return this.$store.getters.getPremiumEnd
      },
      isPremium: function() {
        return this.premiumEnd < Math.floor(Date.now() / 1000) ? false : true
      }
    }
  }
</script>

<style lang="scss" scoped>

  .premium-header {

    &-txt {
      margin-left: 10px;
    }

    &-block {
      margin: 10px;
      padding: 5px;

      > div {
        margin: 0 10px;
      }
    }
    &-buy {
      margin-left: 3px;
      .buy-button {
        margin-left: 20px;
      }
    }

    .icon {
      @include flexMain(center, center);
      @include flexFlow(nowrap, column);
      width: 20px;
      margin-right: 5px;

      flex: none;

      svg {
        width: 100%;
      }
    }

    @media screen and (max-width: 1023px){
      align-self: center;
      &-buy {
        margin: 20px 0;
      }
    }
  }

</style>
