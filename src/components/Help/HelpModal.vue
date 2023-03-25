<template>
  <div class="modal modal-main">
    <div class="modal-bg" @click="close()"></div>
    <div class="modal-data modal-freebitme modal-help-ticket">
      <div class="close"><a @click="close()"><font-awesome-icon icon="times" /></a></div>

      <div class="modal-data-wrap">
        <div class="modal-title mo">{{ $t('helpdesk.create') }}</div>

        <div v-if="success" class="notification is-success">
          <span>{{ $t('helpdesk.createModal.submitted') }}</span>
        </div>

        <form v-else @submit.prevent="send">
          <div class="help-form-data">

            <div class="style-input" :class="{error: errors.title}">
              <input type="text" :placeholder="$t('helpdesk.createModal.subj')" v-model.trim="fields.title" :disabled="loader" maxlength="64">
              <div class="error-text">{{errors.title}}</div>
            </div>

            <div class="style-input help-text" :class="{error: errors.text}">
              <textarea :placeholder="$t('helpdesk.createModal.ticketText')" rows="6" v-model="fields.text" :disabled="loader" />
              <div class="text-counter">{{fields.text.length}}/1024 {{ $t('other.characters') }}</div>
              <div class="error-text">{{errors.text}}</div>

            </div>

            <div class="help-buttons">
              <button class="button button-style revert button-classic" :disabled="loader">{{ $t('helpdesk.createModal.submit') }}</button>
            </div>

          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelpModal',
    data() {
      return {
        loader: false,
        success: false,
        fields: {
          title: "",
          text: "",
        },
        errors: {
          title: null,
          text: null
        }
      }
    },
    methods: {
      send: function() {
        this.loader = true
        this.errors = {
          title: null,
          text: null
        }

        this.axios.post(`/api/help`, this.fields)
          .then(response => {
            if (response.data.status === 'success') {

              this.success = true

              this.$emit('reload')

            } else if (response.data.status === 'error' && response.data.type !== undefined) {
              this.errors[response.data.type] = response.data.message
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
            this.loader = false
          })
      },
      close: function() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-help-ticket {
    max-width: 340px;
    min-height: 10px;

    .notification {
      margin: 10px;
    }

    .help-form-data {
      padding: 20px;

      .help-text {
        //display: flex;
        //flex-direction: column;

      }

      > div {
        margin-top: 20px;
        &:first-of-type {
          margin-top: 0;
        }
      }

      .help-buttons {
        margin-top: 40px;
      }
    }
  }
</style>
