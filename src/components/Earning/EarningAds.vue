<template>
  <div>
    <div class="menu-tabs">
      <router-link to="/cabinet/earning/ads/manual">{{ $t('earning.claim') }}</router-link>
      <router-link to="/cabinet/earning/ads/manage">{{ $t('earning.manage') }}</router-link>
      <router-link to="/cabinet/earning/ads/faq" class="menu-tabs-end">{{ $t('other.faq') }} <font-awesome-icon :icon="['far', 'question-circle']"/></router-link>
    </div>


    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'EarningAds'
  }
</script>

<style lang="scss" scoped>
  .menu-tabs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #6C4365;
    .menu-tabs-end {
      margin-left: auto;
    }
    > a {
      font-weight: bold;
      border-bottom: 2px solid transparent;
      padding: 0 10px;
      margin: 0 3px;
      color: $color-blue;
      &:hover, &.router-link-active  {
        text-decoration: none;
        color: $color-red;
        border-bottom: 2px solid $color-red;
      }
    }
  }
</style>
