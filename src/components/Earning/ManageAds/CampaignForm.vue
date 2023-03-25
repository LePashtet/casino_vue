<template>
  <div>

    <div v-if="loaderData">
      <Loader />
    </div>

    <div v-else class="create-form">
      <div>
        <div class="form-back"><a @click="$router.go(-1)"><font-awesome-icon icon="angle-double-left"/>Back</a></div>

        <div>
          <form @submit.prevent="send" class="style-form">
            <div :class="{error: errors.name}">
              <input v-model="fields.name" placeholder="Name (private)" type="text" :disabled="loader">
              <div class="error-text">{{errors.name}}</div>
            </div>

            <div :class="{error: errors.url}">
              <input v-model="fields.url" placeholder="URL" type="text" :disabled="loader">
              <div class="error-text">{{errors.url}}</div>
            </div>

            <div :class="{error: errors.title}">
              <input v-model="fields.title" placeholder="Title" type="text" :disabled="loader" maxlength="20">
              <div class="error-text">{{errors.title}}</div>
            </div>

            <div :class="{error: errors.text}">
              <textarea v-model="fields.text" placeholder="Text" rows="6" :disabled="loader" />
              <div class="text-counter">{{fields.text.length}}/1024</div>
              <div class="error-text">{{errors.text}}</div>
            </div>

            <div>
              <button class="button button-style" :disabled="loader">Create</button>
            </div>

          </form>
        </div>
      </div>
      <div class="form-desc">
        <div class="form-desc-title">Preview</div>
        <div>
          <EarningAdsBlock :title="fields.title" :text="fields.text" status="preview" />
        </div>

        <div class="form-desc-title">How does it work?</div>
        <div class="form-desc-text">Here you can create a PTC (Paid to Click) advertisement and purchase traffic for any website that does not break our rules.</div>
        <div class="form-desc-text">All visitors are guaranteed to be cryptocurrency users.</div>
        <div class="form-desc-text">This is a perfect opportunity to advertise your crypto related business/website  or promote an affiliate programme of your choice.</div>
        <div class="form-desc-text">Non-member clicks are not counted. Only unique visits are counted.</div>
        <div class="form-desc-text">You can purchase PTC ads with your Freebitme coin balance.</div>
        <div class="form-desc-text">After your purchase is complete and your ad is approved, Freebitme users will view your website for the amount of time you have chosen, going to another tab or window will stop the ad timer.</div>

        <div class="form-desc-title">Rules and guidelines</div>
        <div class="form-desc-text"><font-awesome-icon icon="circle"/>No URL shorteners.</div>
        <div class="form-desc-text"><font-awesome-icon icon="circle"/>No malicious websites or frame breakers , frame busters or framekillers.</div>
        <div class="form-desc-text"><font-awesome-icon icon="circle"/>No copyright infringing material.</div>
        <div class="form-desc-text"><font-awesome-icon icon="circle"/>No illegal products or services (weapons, organs , drugs, prostitution etc.)</div>
        <div class="form-desc-text"><font-awesome-icon icon="circle"/>No infinitely loading websites.</div>
        <div class="form-desc-text"><font-awesome-icon icon="circle"/>No malware, viruses, spyware or ransomware.</div>
        <div class="form-desc-text"><font-awesome-icon icon="circle"/>No adult (18+) content.</div>
        <div class="form-desc-text"><font-awesome-icon icon="circle"/>No unsolicited or automated downloads.</div>
        <div class="form-desc-text"><font-awesome-icon icon="circle"/>No browser locking scripts or other attempts to hijack the browser.</div>

        <div class="form-desc-text"><strong>Warning!</strong> Any illegal ad will not be approved and no refunds will be given.</div>


      </div>
    </div>
  </div>
</template>

<script>
  import EarningAdsBlock from '../EarningAdsBlock'
  export default {
    name: 'CampaignForm',
    components: { EarningAdsBlock },
    props: ['hash'],
    data() {
      return {
        loader: false,
        loaderData: true,
        fields: {
          hash: "",
          name: "",
          url: "",
          title: "",
          text: ""
        },
        errors: {
          name: null,
          url: null,
          title: null,
          text: null
        }
      }
    },
    created () {
      if (this.hash !== undefined) {
        this.load(this.hash)
      } else {
        this.loaderData = false
      }
    },
    methods: {
      load: function(hash) {
        this.loaderData = true

        this.axios.get(`/api/ptc/manage/campaigns/${hash}?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.fields = response.data.data
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loaderData = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      send: function() {
        this.loader = true
        this.errors = {
          name: null,
          url: null,
          title: null,
          text: null
        }

        if (this.hash !== undefined) this.fields.hash = this.hash

        this.axios.post(`/api/ptc/manage/campaigns`, this.fields)
          .then(response => {
            if (response.data.status === 'success') {
              if (this.hash !== undefined) {
                this.$router.push({ name: 'EarningAdsManageCampaigns', params: { update: 'success' } })
              } else {
                this.$router.push({ name: 'EarningAdsManageCampaigns', params: { create: 'success' } })
              }
            } else if (response.data.status === 'error' && response.data.type !== undefined) {
              this.errors[response.data.type] = response.data.message
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      }
    }
  }
</script>

<style lang="scss" src="../../../styles/form.scss"></style>

<style lang="scss" scoped>

</style>
