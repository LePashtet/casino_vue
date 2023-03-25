<template>
  <div class="content-main cabinet">
    <div class="page-title">
      <div class="page-title-text mo">{{ $t('statistics.title') }}</div>
      <PremiumTitle />
    </div>

    <div class="slider-links">
      <router-link :to="{name: 'StatisticsPayout'}" class="slider-link">{{ $t('statistics.menu.withdrawal') }}</router-link>
      <router-link :to="{name: 'StatisticsPayin'}" class="slider-link">{{ $t('statistics.menu.deposit') }}</router-link>
      <router-link :to="{name: 'StatisticsPremium'}" class="slider-link">{{ $t('statistics.menu.premium') }}</router-link>
      <router-link :to="{name: 'StatisticsPaidAds'}" class="slider-link">{{ $t('statistics.menu.paidAds') }}</router-link>
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import PremiumTitle from '../Cabinet/PremiumTitle'
  export default {
    name: 'StatisticsLayout',
    components: { PremiumTitle }
  }
</script>

<style lang="scss" scoped>

</style>
