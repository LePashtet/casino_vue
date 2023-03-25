<template>
  <div class="content-main cabinet">
    <div class="page-title">
      <div class="page-title-text mo">{{ title }}</div>
      <PremiumTitle />
    </div>


    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import PremiumTitle from './Cabinet/PremiumTitle'
export default {
  name: "LayoutDefault",
  components: { PremiumTitle },
  props: ['title']
}
</script>

<style scoped>

</style>
