<template>
  <div class="chat-emoji">
    <img :src="srcUrl" alt="">
  </div>
</template>

<script>
  export default {
    name: "ChatEmoji",
    props: ['code'],
    computed: {
      srcUrl: function(){
        return 'https://cdn.jsdelivr.net/emojione/assets/4.5/png/64/'+this.code+'.png'
      }
    }
  }
</script>

<style scoped>
  .chat-emoji {
    display: inline-block;
  }
  .chat-emoji img{
    height: 18px;
    vertical-align: sub;
  }
</style>
