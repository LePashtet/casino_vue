<template>
  <span class="chat-text-time">{{printTime(time)}}</span>
</template>

<script>
  export default {
    name: "ChatTime",
    props: ["time"],
    methods: {
      printTime: function (valTime) {
        const time = new Date(valTime * 1000)
        return this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes())
      },
      addZero: function (i) {
        if (i < 10) {
          i = '0' + i
        }
        return i
      }
    }
  }
</script>

<style scoped>
  .chat-text-time{
    font-size: 12px;
  }
</style>
