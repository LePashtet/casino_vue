<template>
  <div class="create-page">
    <div class="form-back"><a @click="$router.go(-1)"><font-awesome-icon icon="angle-double-left"/>{{ $t('other.back') }}</a></div>

    <div class="create-page-title">{{ $t('siteowner.type') }}</div>
    <div class="create-select">
      <div>
        <div class="create-wrap" @click="openHostobit()">
          <div class="create-title">{{ $t('siteowner.service1.title') }}</div>
          <div class="create-icon"><img class="hostobit-logo" src="../../assets/logo_hostobit.svg" alt="hostobit" /></div>
          <div class="create-desc">{{ $t('siteowner.service1.subtitle') }}</div>
        </div>
      </div>
      <div>
        <div class="create-wrap" @click="openFaucet()">
          <div class="create-title">{{ $t('siteowner.service2.title') }}</div>
          <div class="create-icon"><font-awesome-icon icon="faucet" /></div>
          <div class="create-desc">{{ $t('siteowner.service2.subtitle') }}</div>
        </div>
      </div>
      <div>
        <div class="create-wrap" @click="openService()">
          <div class="create-title">{{ $t('siteowner.service3.stitle') }}</div>
          <div class="create-icon"><font-awesome-icon icon="file-code" /></div>
          <div class="create-desc">{{ $t('siteowner.service3.subtitle') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SiteOwnerCreate',
    methods: {
      openHostobit: function() {
        window.open('https://hostobit.com/account/faucet')
      },
      openFaucet: function() {
        this.$router.push({name: 'SiteOwnerCreateForm', params: {type: 'faucet'}})
      },
      openService: function() {
        this.$router.push({name: 'SiteOwnerCreateForm', params: {type: 'service'}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-back {
    text-align: left;
  }
  .create-page {
    margin-bottom: 80px;
  }
  .create-page-title {
    margin: 80px 0 20px 0;
    font-size: 22px;
    font-weight: bold;
  }
  .create-select {
    display: flex;

    > div {
      flex: 1;
      .create-wrap {
        margin: 10px;
        padding: 20px;
        border-radius: 8px;
        background-color: $color-blue-dark;
        box-shadow: 0 15px 13px rgba(0, 14, 68, 0.15);
        transition: .3s ease;
        cursor: pointer;
        &:hover {
          box-shadow: 0 5px 3px rgba(0, 14, 68, 0.05);
        }
        .create-title {
          font-size: 20px;
          font-weight: bold;
        }
        .create-icon {
          color: $color-red;
          font-size: 100px;
        }
        .create-desc {
          font-size: 14px;
        }
        .hostobit-logo {
          height: 100px;
        }
      }
    }
  }
</style>
