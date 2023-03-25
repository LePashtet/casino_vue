<template>
  <div class="modal modal-main">
    <div class="modal-bg" @click="close()"></div>
    <div class="modal-data modal-freebitme modal-site-review">
      <div class="close"><a @click="close()"><font-awesome-icon icon="times" /></a></div>

      <div class="modal-data-wrap">
        <div class="modal-title mo">Create new review</div>

        <div v-if="success" class="notification is-success">
          <span>Your review has been submitted successfully</span>
        </div>

        <form v-else @submit.prevent="send">
          <div class="review-form-data">

            <div class="rating-box style-input" :class="{error: errors.rating}">
              <div class="rating-data">
                <div class="site-rating-stars">
                  <span v-for="n in 5" :key="n" class="site-rating-icon" @click="changeRating(6 - n)" :id="'star_'+(6-n)">
                    <font-awesome-icon :icon="[(fields.rating < 6-n?'far':'fas'), 'star']" size="xs" />
                  </span>
                </div>
                <div class="site-rating-text">{{fields.rating}}/<span>5</span></div>
              </div>
              <div class="error-text">{{errors.rating}}</div>
            </div>

            <div class="style-input review-text" :class="{error: errors.text}">
              <textarea placeholder="Enter review text" rows="6" v-model="fields.text" :disabled="loader" />
              <div class="text-counter">{{fields.text.length}}/2048 characters</div>
              <div class="error-text">{{errors.text}}</div>
            </div>

            <div class="review-buttons">
              <button class="button button-style revert button-classic" :disabled="loader">Submit my review</button>
            </div>

          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteReviewModal',
  props: ['hash'],
  data() {
    return {
      loader: false,
      success: false,
      fields: {
        text: "",
        rating: 0,
      },
      errors: {
        text: null,
        rating: null,
      }
    }
  },
  methods: {
    send: function() {
      this.loader = true
      this.errors = {
        title: null,
        rating: null
      }

      this.axios.post(`/api/faucets/detail/${this.hash}/reviews`, this.fields)
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
    },
    changeRating: function(value) {
      this.fields.rating = value
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-site-review {
    max-width: 340px;
    min-height: 10px;

    .notification {
      margin: 10px;
    }

    .review-form-data {
      padding: 20px;

      .rating-box {
        margin-bottom: 20px;

        .rating-data {
          display: flex;
          background-color: $color-blue-dark;
          border-radius: 10px;
          padding: 15px;

          justify-content: space-between;
          .site-rating-stars {
            display: flex;
            flex-direction: row-reverse;
            font-size: 35px;
            line-height: 35px;
            > span {
              display: flex;
              padding: 0 5px;
              cursor: pointer;
              &:hover {
                color: $color-red;
                ~ span {
                  color: $color-red;
                }
              }
            }
          }
          .site-rating-text {
            font-size: 25px;
            font-weight: bold;
            > span {
              font-size: 20px;
              font-weight: normal;
            }
          }
        }
      }

      .review-buttons {
        margin-top: 40px;
      }
    }
  }
</style>
