<template>
  <div class="affiliate-banners">

    <Loader v-if="loader" />

    <div v-else>
      <div class="banners-title-block">
        <div class="banners-title">{{ $t('affiliates.banners.title') }}</div>
        <div class="campaign-selector"><AffiliateCampaignSelect :campaigns="campaigns" :select="selectHash" @change="changeCampaign" /></div>
      </div>

      <div class="links-block">

        <div class="style-input style-input-left style-input style-input-right">
          <div>
            <div class="">{{ $t('other.link') }}</div>
            <input id="link" type="text" :value="referralLinks.link">
          </div>
          <button @click="copyLink(referralLinks.link, $event)" data-tooltip="Copied!" class="style-button-right input-2fa-copy tooltip tooltip-not-hover"><font-awesome-icon icon="copy" /></button>
        </div>

        <div class="style-input style-input-left style-input style-input-right">
          <div>
            <div class="">BB-Code</div>
            <input id="linkBb" type="text" :value="referralLinks.linkBb">
          </div>
          <button @click="copyLink(referralLinks.linkBb, $event)" data-tooltip="Copied!" class="style-button-right input-2fa-copy tooltip tooltip-not-hover"><font-awesome-icon icon="copy" /></button>
        </div>

        <div class="style-input style-input-left style-input style-input-right">
          <div>
            <div class="">HTML</div>
            <input id="linkHtml" type="text" :value="referralLinks.linkHtml">
          </div>
          <button @click="copyLink(referralLinks.linkHtml, $event)" data-tooltip="Copied!" class="style-button-right input-2fa-copy tooltip tooltip-not-hover"><font-awesome-icon icon="copy" /></button>
        </div>

      </div>


      <div class="banners-title">Banners</div>
    </div>
  </div>
</template>

<script>
  import AffiliateCampaignSelect from '@/components/Affiliate/AffiliateCampaignSelect'
  export default {
    name: 'AffiliateBanners',
    components: { AffiliateCampaignSelect },
    props: ['campaign'],
    data() {
      return {
        loader: true,
        campaigns: [],
        link: "",
        selectCampaign: 0,
        selectHash: '',
        referralLinks: {
          link: '',
          linkBb: '',
          linkHtml: '',
        },
      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/affiliate/campaigns?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {
              this.campaigns = response.data.data.transactions

              if (this.campaign !== undefined) {
                for (let i=0; i<this.campaigns.length; i++) {
                  if (this.campaigns[i].hash === this.campaign) {
                    this.selectCampaign = i
                  }
                }
              } else {
                this.selectCampaign = this.campaigns.length - 1
              }
              this.selectHash = this.campaigns[this.selectCampaign].hash
              this.link = this.campaigns[this.selectCampaign].link

              this.createRefLinks()
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      createRefLinks: function () {
        this.referralLinks.link = this.$store.getters.getHost + '/?r=' + this.link
        this.referralLinks.linkBb = '[url=\'' + this.referralLinks.link + '\']' + this.$store.getters.getName + '[/url]'
        this.referralLinks.linkHtml = '<a href="' + this.referralLinks.link + '">' + this.$store.getters.getName + '</a>'
      },
      copyLink: function(link, e) {
        navigator.clipboard.writeText(link)

        let button = e.currentTarget
        button.classList.add('is-tooltip-active')
        setTimeout(function () {
          button.classList.remove('is-tooltip-active')
        }, 2000)
      },
      changeCampaign: function(hash) {
        for (let i=0; i<this.campaigns.length; i++) {
          if (this.campaigns[i].hash === hash) {
            this.selectCampaign = i
          }
        }
        this.selectHash = this.campaigns[this.selectCampaign].hash
        this.link = this.campaigns[this.selectCampaign].link

        this.createRefLinks()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .affiliate-banners {
    .banners-title-block {
      display: flex;
      justify-content: space-between;
      .banners-title {
        text-align: left;
        font-size: 18px;
        color: $color-blue;
        display: inline-flex;
        align-items: center;
      }
    }

    .links-block {
      margin: 20px 10px;

      > div {
        margin: 20px 0;
        > div {
          > div {
            width: 80px;
            font-weight: bold;
          }
          > input {
            width: 420px;
            @media screen and (max-width: 1023px){
              width: 100%;
              max-width: 420px;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
</style>
