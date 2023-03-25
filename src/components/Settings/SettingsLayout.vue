<template>
  <div class="content-main cabinet">
    <div class="page-title">
      <div class="page-title-text mo">Settings</div>
      <PremiumTitle />
    </div>

    <div class="slider-links">
      <router-link :to="{name: 'SettingsMain'}" class="slider-link">PROFILE</router-link>
      <router-link :to="{name: 'SettingsSessions'}" class="slider-link">SESSIONS</router-link>
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import PremiumTitle from '../Cabinet/PremiumTitle'
  export default {
    name: 'SettingsLayout',
    components: { PremiumTitle }
  }
</script>

<style lang="scss" scoped>

</style>
