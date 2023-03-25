<template>
  <div class="content-main">
    <div class="title-wrap mo">
      <div>{{ $t('news.title') }}</div>
    </div>

    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'NewsLayout'
  }
</script>

<style lang="scss" scoped>

</style>
