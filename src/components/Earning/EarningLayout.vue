<template>
  <div class="content-main cabinet">
    <div class="page-title">
      <div class="page-title-text mo">{{ $t('earning.title') }}</div>
      <PremiumTitle />
    </div>

    <div class="slider-links">
      <router-link to="/cabinet/earning/ads" class="slider-link">{{ $t('earning.menu.paidAds') }}</router-link>
      <router-link to="/cabinet/earning/offerwalls" class="slider-link">{{ $t('earning.menu.offer') }}</router-link>
      <router-link to="/cabinet/earning/faucets" class="slider-link">{{ $t('earning.menu.faucets') }}</router-link>
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import PremiumTitle from '../Cabinet/PremiumTitle'
  export default {
    name: 'EarningLayout',
    components: { PremiumTitle }
  }
</script>

<style scoped>

</style>
