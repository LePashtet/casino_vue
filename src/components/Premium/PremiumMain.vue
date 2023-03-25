<template>
  <div class="premium-main">

    <!--
    <subscription />
    -->
    <calc />
    <features />

  </div>
</template>

<script>
//import subscription from './subscription';
import calc from './calc';
import features from './features';
export default {
  name: 'PremiumMain',
  components: {calc, features},
}
</script>


<style lang="scss" scoped>
  .premium-main {
    text-align: left;
  }

</style>
