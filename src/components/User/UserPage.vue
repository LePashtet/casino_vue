<template>
  <div>

    {{hash}}
  </div>
</template>

<script>
  export default {
    name: 'UserPage',
    props: {
      hash: { type: String, default: null },
    }
  }
</script>

<style scoped>

</style>
