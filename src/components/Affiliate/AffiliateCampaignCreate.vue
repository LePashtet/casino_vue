<template>
  <div class="modal modal-main">
    <div class="modal-bg" @click="close()"></div>
    <div class="modal-data modal-freebitme modal-affiliate-campaign">
      <div class="close"><a @click="close()"><font-awesome-icon icon="times" /></a></div>


      <div class="modal-data-wrap">
        <div class="modal-title mo">NEW CAMPAIGN</div>

        <div v-if="success" class="notification is-success">
          <span>Campaign created successfully</span>
        </div>

        <form v-else @submit.prevent="send">

          <div class="affiliate-balance-data">

            <div class="style-input" :class="{error: errors.name}">
              <label for="campaignLink">Name</label>
              <input id="campaignLink" type="text" placeholder="Enter name" v-model.trim="fields.name" :disabled="loaderSend">
              <div class="error-text">{{errors.name}}</div>
            </div>


            <div class="style-input style-input-left link-label" :class="{error: errors.link}">
              <label for="campaignName">Link</label>
              <div class="">
                <div class="">https://freebitme.com/?r=</div>
                <input id="campaignName" type="text" placeholder="Enter link" v-model.trim="fields.link" :disabled="loaderSend">
              </div>
              <div class="error-text">{{errors.link}}</div>
            </div>


            <div class="button-block">
              <button class="button button-style button-classic revert" :disabled="loaderSend">CREATE</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AffiliateCampaignCreate',
    data() {
      return {
        loaderSend: false,
        success: false,
        fields: {
          name: "",
          link: "",
        },
        errors: {
          name: null,
          link: null,
        }
      }
    },
    methods: {
      send: function() {
        this.loaderSend = true
        this.errors = {
          name: null,
          link: null
        }

        this.axios.post(`/api/affiliate/campaigns`, this.fields)
          .then(response => {
            if (response.data.status === 'success') {
              this.success = true
              this.$emit('reload')
              setTimeout(() => {
                this.$emit('close')
              }, 5000)
            } else if (response.data.status === 'error' && response.data.type !== undefined) {
              this.errors[response.data.type] = response.data.message
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loaderSend = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      close: function() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-affiliate-campaign {
    padding: 0 20px 20px 20px;
    width: unset;
    min-width: 280px;
    min-height: 40px;

    .notification {
      margin: 0 10px;
    }

    .link-label {
      > div {
        > div {
          padding: 0 3px;
          width: 155px;
        }
        > input {
          width: 115px;
        }
      }
    }
    .affiliate-balance-data {
      > div {
        margin-bottom: 15px;
        &:last-of-type {
          margin-bottom: 0;
          margin-top: 30px;
        }
      }
      label {
        text-align: left;
        padding: 0 5px;
      }
    }
  }
</style>
