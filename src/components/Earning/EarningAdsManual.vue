<template>
  <div>
    <div v-if="loader">
      <Loader />
    </div>

    <div v-else class="data-list">

      <div v-if="adverts.length === 0">There are currently no ads to view</div>


      <div v-for="(item, key) in adverts" :key="key">
        <EarningAdsBlock
          :hash="item.hash"
          :title="item.title"
          :text="item.text"
          :duration="item.duration"
          :price="item.pay"
          :feature="item.feature"
          :next="item.next"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import EarningAdsBlock from './EarningAdsBlock'
  export default {
    name: 'EarningAdsManual',
    components: { EarningAdsBlock },
    data() {
      return {
        loader: true,
        adverts: []
      }
    },
    watch: {
      '$store.getters.isAdsFrame': function(value) {
        if (!value) {
          this.load()
        }
      }
    },
    created () {
      this.load()
    },
    methods: {
      load: function() {
        this.loader = true

        this.axios.get(`/api/ptc/list?t=${new Date().getTime()}`)
          .then(response => {
            if (response.data.status === 'success') {

              this.adverts = response.data.data

            } else {
              this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
            }
            this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .data-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;


    > div {
      width: calc(50% - 10px);
      padding: 10px 5px;

    }
    @media screen and (max-width: 1023px){
      flex-direction: column;
      align-items: center;
      > div {
        width: calc(90% - 10px);
        max-width: 300px;
        padding: 10px 5px;

      }
    }
  }
</style>
