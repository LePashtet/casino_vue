<template>
  <div class="chat-balance">
    <div>
      <div class="chat-balance-title rasp">My <span>{{ curr.toUpperCase() }}</span> balance</div>
      <div class="chat-balance-amount mo">{{ (balance / 1000).toFixed(8) }}</div>
    </div>
    <div class="icon">
    </div>
  </div>

</template>

<script>
  export default {
    name: "ChatBalance",
    props: ['curr', 'balance']
  }
</script>

<style lang="scss" scoped>
  .chat-balance {
    display: flex;
    justify-content: space-between;
    background-color: #3f3f78;
    border-radius: 10px;
    padding: 3px 8px;
    margin: 3px 0;

    .chat-balance-title {
      font-size: 12px;
      font-weight: bold;
      line-height: 14px;
    }
    .chat-balance-amount {
      font-size: 20px;
      font-weight: bold;
      line-height: 22px;
    }

    .icon {
      background: url("../../../assets/chat_balance.svg");
      background-size: cover;
      width: 36px;
    }
  }
</style>
