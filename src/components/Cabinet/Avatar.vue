<template>
  <div class="avatar" :style="mainBlock" :class="{default: !isAvatar}">
    <img v-if="isAvatar" :src="printAvatar(avatar)" alt="" :style="mainBlock" />
  </div>
</template>

<script>
  export default {
    name: 'Avatar',
    props: ['isAvatar', 'avatar', 'size'],
    computed: {
      mainBlock: function() {
        return {width: `${this.size}px`, height: `${this.size}px`, 'border-radius': `${this.size/2}px`}
      },
    },
    methods: {
      printAvatar: function(avatar) {
        return this.$store.getters.getAuthServer + '/api/avatar/' + avatar + '.png'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar {
    height: 50px;
    width: 50px;
    border: 1px solid rgba(198, 209, 222, 0.51);
    //border-radius: 100px;
    //background: url('./../../assets/avatar_default.svg') no-repeat;
    &.default {
      background: url('./../../assets/avatar_default.svg') no-repeat;
    }
  }
</style>
