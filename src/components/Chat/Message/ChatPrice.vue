<template>
  <div class="chat-price">
    <div>
      <div class="chat-price-title rasp"><span>{{ curr.toUpperCase() }}</span> price</div>
      <div class="chat-price-amount mo">{{ price }} <font-awesome-icon icon="dollar-sign" /></div>
    </div>
    <div class="icon">
    </div>
  </div>

</template>

<script>
  export default {
    name: "ChatPrice",
    props: ['curr', 'price']
  }
</script>

<style lang="scss" scoped>
  .chat-price {
    display: flex;
    justify-content: space-between;
    background-color: #3f3f78;
    border-radius: 10px;
    padding: 3px 8px;
    margin: 3px 0;

    .chat-price-title {
      font-size: 12px;
      font-weight: bold;
      line-height: 14px;
    }
    .chat-price-amount {
      font-size: 20px;
      font-weight: bold;
      line-height: 22px;
    }

    .icon {
      background: url("../../../assets/chat_price.svg");
      background-size: cover;
      width: 36px;
    }
  }
</style>
