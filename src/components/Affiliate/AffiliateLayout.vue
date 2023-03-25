<template>
  <div class="content-main cabinet">
    <div class="page-title">
      <div class="page-title-text mo">{{ $t('affiliates.title') }}</div>
      <PremiumTitle />
    </div>

    <div class="slider-links">
      <router-link to="/cabinet/affiliate/dashboard" class="slider-link">{{ $t('affiliates.menu.dashboard') }}</router-link>
      <router-link to="/cabinet/affiliate/balances" class="slider-link">{{ $t('affiliates.menu.balances') }}</router-link>
      <router-link to="/cabinet/affiliate/campaigns" class="slider-link">{{ $t('affiliates.menu.campaigns') }}</router-link>
      <router-link to="/cabinet/affiliate/banners" class="slider-link">{{ $t('affiliates.menu.banners') }}</router-link>
      <router-link to="/cabinet/affiliate/logs" class="slider-link">{{ $t('affiliates.menu.logs') }}</router-link>
      <router-link to="/cabinet/affiliate/users" class="slider-link">{{ $t('affiliates.menu.users') }}</router-link>
      <router-link to="/cabinet/affiliate/hits" class="slider-link">{{ $t('affiliates.menu.hits') }}</router-link>
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import PremiumTitle from '../Cabinet/PremiumTitle'
  export default {
    name: 'AffiliateLayout',
    components: { PremiumTitle }
  }
</script>

<style lang="scss" scoped>

</style>
