<template>
  <span @click="openModalUser(hash)" class="chat-user" :class="{'chat-user-self': getSelfHash() === hash}"><font-awesome-icon icon="user-circle"></font-awesome-icon> {{username}}</span>
</template>

<script>
export default {
  name: "ChatUser",
  props: ['hash', 'username'],
  methods: {
    openModalUser: function (hash) {
      this.$router.push({name: 'UserPage', params: {hash: hash}})
    },
    getSelfHash: function () {
      if (this.$store.getters.isAuth) {
        return this.$store.getters.getUserHash
      } else {
        return -1
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .chat-user {
    font-weight: bold;
    cursor: pointer;
  }
  .chat-user-self {
    color: $color-blue;
  }
</style>
