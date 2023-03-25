<template>
  <form class="style-form campaign-select">
    <div class="select">
      <label for="campaignSelect">{{ $t('affiliates.dashboard.campaign') }}</label>
      <select id="campaignSelect" @change="changeCampaign">
        <option v-if="all" value="">ALL</option>
        <option v-for="(item, key) in campaigns" :key="key" :selected="select === item.hash" :value="item.hash">{{item.name}}</option>
      </select>
    </div>
  </form>
</template>

<script>
  export default {
    name: "AffiliateCampaignSelect",
    props: ['all', 'campaigns', 'select'],
    methods: {
      changeCampaign: function(e) {
        this.$emit('change', e.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .campaign-select {
    .select {
      color: $color-blue;
      margin: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      > label {
        margin-right: 10px;
        font-size: 18px;
      }
    }
  }
</style>
