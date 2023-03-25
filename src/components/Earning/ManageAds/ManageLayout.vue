<template>
  <div>
    <div class="menu-links">
      <router-link to="/cabinet/earning/ads/manage" class="menu-link">Adverts</router-link>
      <router-link to="/cabinet/earning/ads/manage/campaigns" class="menu-link">Campaigns</router-link>


      <router-link v-if="$route.name === 'EarningAdsManageList' && !buttonHide" to="/cabinet/earning/ads/manage/new" class="menu-link-end">New advert <font-awesome-icon :icon="['far', 'plus-square']"/></router-link>
      <router-link v-if="$route.name === 'EarningAdsManageCampaigns'" to="/cabinet/earning/ads/manage/campaigns/new" class="menu-link-end">New campaign <font-awesome-icon :icon="['far', 'plus-square']"/></router-link>
    </div>

    <transition name="fade" mode="out-in">
      <router-view @hide="hideButton" />
    </transition>
  </div>
</template>

<script>

  export default {
    name: 'EarningAdsManage',

    data() {
      return {
        buttonHide: false,
      }
    },
    watch: {

    },
    methods: {
      hideButton: function(value) {
        this.buttonHide = value
      }
    }
  }
</script>

<style scoped>

</style>
