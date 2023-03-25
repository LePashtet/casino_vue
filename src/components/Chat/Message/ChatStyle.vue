<template>
  <span v-if="!isUrl" :class="styleData">{{text}}</span>
  <a v-else :href="isUrl">{{ text }}</a>
</template>

<script>
  export default {
    name: "ChatStyle",
    props: ['text', 'config', 'isUrl'],
    computed: {
      styleData: function() {
        console.log('ff', this.isUrl)
        return 'chat-'+this.config
      }
    }
  }
</script>

<style scoped>

</style>
