<template>
  <div class="premium-calc">
    <!--
    <h5 class="title-p">Premium Calculator</h5>
    -->

    <Loader v-if="loader" />

    <div v-else>
      <div class="premium-calc-contain">
        <div class="premium-calc-banner text-center">
          <span class="icon">
            <img src="../../assets/premium/crown.svg" alt="" />
          </span>
          <p class="bold" v-html="$t('premium.subtitle')"></p>
        </div>

        <VueSlickCarousel ref="carousel" v-bind="settings">

          <div
            class="premium-calc--item text-center mo"
            :class="tariff.className"
            v-for="(tariff, key) in plans" :key="key"
          >
            <input :id="'pc_' + key" type="radio" name="rad" :value="key" v-model="selectedPack" @change="changePack" :disabled="loaderSend">
            <label :for="'pc_' + key">
              <span class="icon">
                <img :src="require(`@/assets/premium/timer_${tariff.name}.svg`)" :alt="tariff.name">
              </span>
              <span class="slider-title"><b><span :style="{color: getPlanColor(tariff.name)}">{{ tariff.name }}</span> {{ $t('other.premium') }}</b></span>
              <span class="discount color-red mo" v-if="tariff.discount > 0">{{ $t('premium.save') }} <b>{{ tariff.discount }}%!</b></span>
              <span class="discount" v-else></span>
              <span class="price"><b :style="{color: getPlanColor(tariff.name)}"><span style="font-size: 16px">$</span>{{ tariff.price }}</b></span>
              <ul>
                <li><span class="color-red">*${{ +((tariff.price / tariff.days) * 1).toFixed(2) }}/</span>{{ $t('premium.day') }}</li>
                <li><span class="color-red">*${{ +((tariff.price / tariff.days) * 7).toFixed(2) }}/</span>{{ $t('premium.week') }}</li>
                <li><span class="color-red">*${{ +((tariff.price / tariff.days) * 30).toFixed(2) }}/</span>{{ $t('premium.month') }}</li>
                <li><span class="color-red">*${{ +((tariff.price / tariff.days) * 365).toFixed(2) }}/</span>{{ $t('premium.year') }}</li>
              </ul>
              <span class="check" />
            </label>
          </div>
          <template #prevArrow="arrowOption">
            <button  class="button-style prev">
              <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-left fa-w-10"><path  fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>
            </button>
          </template>

          <template #nextArrow="arrowOption">
            <button  class="button-style next">
              <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-right fa-w-10"><path  fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg>
            </button>
          </template>
        </VueSlickCarousel>
      </div>



      <div class="premium-calc-bottom flex mobile-flex-column">
        <div class="premium-cb" :class="currentPack.name">
          <div class="premium-cb-top flex">
            <p class="sign">
              <b><span>{{ currentPack.name }}</span> {{ $t('other.premium') }}</b>
              <svg width="211" height="51" viewBox="0 0 211 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.00488281 0.00122575H201.905C203.402 -0.0231637 204.881 0.316775 206.202 0.988859C207.523 1.66094 208.642 2.64293 209.453 3.84188C210.264 5.04083 210.74 6.41706 210.837 7.84031C210.934 9.26356 210.647 10.6867 210.005 11.9751L198.143 35.2267C197.398 36.6653 196.244 37.8756 194.812 38.7195C193.379 39.5635 191.727 40.0071 190.043 39.9999H0.00488281V0.00122575Z" fill="#7CD572"/>
                <path class="fill" d="M16 40H0L16 50.979V40Z" fill="#2C7224"/>
              </svg>
            </p>
            <img :src="require(`@/assets/premium/timer_${currentPack.name}.svg`)" alt="yearly">
          </div>
          <div class="premium-cb-total flex">
            <p class="color-blue">
              {{ $t('premium.total') }}
            </p>
            <span class="color-calc">$<b>{{ totalPrice }}</b></span>
          </div>
          <div class="premium-cb-total-crypto">
            <span><b>{{ $t('premium.or') }} </b>{{totalPriceCrypto}} <b>{{selectedCurr.toUpperCase()}}</b></span>
          </div>
        </div>
        <div class="premium-cm flex mobile-flex-column">
          <div class="options-block">
            <div class="input-field">
              <label class="flex mobile-flex-column">
                <p class="label color-blue left">{{ $t('premium.number') }}</p>
                <span class="select">
                  <select v-model="selectedTerm" :disabled="loaderSend">
                    <option :value="item" v-for="item in currentPack.count" :key="item">x{{ item }}</option>
                  </select>
                </span>
              </label>
            </div>
            <div class="input-field">
              <label class="flex mobile-flex-column">
                <p class="label color-blue left">{{ $t('premium.payment') }}</p>
                <span class="select">
                  <select v-model="selectedCurr" :disabled="loaderSend">
                    <option :value="key" v-for="(item, key) in balances" :key="key">{{key.toUpperCase()}} {{item}}</option>
                  </select>
                </span>
              </label>
            </div>
          </div>
          <div class="buy-block">
            <p v-html="$t('premium.youBuy')"></p>
            <p>{{ $t('premium.valid') }}<span class="gradient-color"><b>{{ premiumEndTimer | printTime }}</b></span></p>

            <button class="btn btn-red" @click="buyPlan()" :disabled="loaderSend">{{ $t('premium.buy') }}</button>
          </div>
        </div>

        <div class="premium-success-buy" :class="{active: success}">
          <div class="premium-success-buy-bg"></div>
          <span><font-awesome-icon icon="check-circle" /><span>{{ $t('premium.success') }}</span></span>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'PremiumFeatures',
  components: { VueSlickCarousel },
  data() {
    return {
      loader: true,
      loaderSend: false,
      success: false,
      selectedPack: 3,
      selectedTerm: 1,
      selectedCurr: 'btc',
      plans: [],
      settings: {
        arrows: true,
        dots: false,
        slidesToShow: 4,
        infinite: false,
        responsive: [
          {
            "breakpoint": 1024,
            "settings": {
              "slidesToShow": 2,
              "slidesToScroll": 1,
              "infinite":true
              //"centerPadding": "5px",
            }
          },
          {
            "breakpoint": 600,
            "settings": {
              "centerMode": true,
              "centerPadding": "40px",
              "slidesToShow": 1,
              "slidesToScroll": 1,
              "initialSlide": 1
            }
          },
          {
            "breakpoint": 480,
            "settings": {
              "centerMode": true,
              "centerPadding": "40px",
              "slidesToShow": 1,
              "slidesToScroll": 1
            }
          }
        ]
      },
    }
  },
  computed: {
    balances() {
      return this.$store.getters.getBalances
    },
    currentPack() {
      return this.plans[this.selectedPack]
    },
    totalPrice() {
      if(this.checkErrorPlans()) {
        console.error('error, we can not find plans by selected plan #2')
        return NaN
      }
      if(this.checkErrorSelectedPlans()) {
        console.error('error, we can not calc totalPrice by this plan #3')
        return NaN
      }
      return this.plans[this.selectedPack].price * this.selectedTerm
    },
    totalPriceCrypto() {
      return this.plans[this.selectedPack].prices[this.selectedCurr] * this.selectedTerm
    },
    premiumEndTimer() {
      let currentPremium = this.$store.getters.getPremiumEnd
      let currentTime = Math.floor(Date.now() / 1000)
      let premiumTime = this.currentPack.days * 24 * 60 * 60
      if (currentPremium < currentTime) {
        // new
        return currentTime + premiumTime
      } else {
        // add time
        return currentPremium + premiumTime
      }
    }
  },
  created () {
    this.load()
  },
  methods: {
    load: function() {
      this.loader = true

      this.axios.get(`/api/premium?t=${new Date().getTime()}`)
        .then(response => {
          if (response.data.status === 'success') {
            this.plans = response.data.data.plans

            this.loader = false
          } else {
            this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
          }
        })
        .catch(() => {
          this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
        })
    },
    buyPlan: function() {
      this.loaderSend = true
      let name = this.plans[this.selectedPack].name

      this.axios.post(`/api/premium`, {type: name, count: parseInt(this.selectedTerm), curr: this.selectedCurr})
        .then(response => {
          if (response.data.status !== 'success') {
            this.$store.dispatch('addNotif', { type: 'danger', text: response.data.message, isClose: false, timer: 2000 }).then()
          } else {
            this.$store.commit('setPremiumTime', response.data.data)
            this.success = true
          }
          this.loaderSend = false
        })
        .catch(() => {
          this.$store.dispatch('addNotif', { type: 'danger', text: 'Server error', isClose: false, timer: 2000 }).then()
        })
    },
    changePack() {
      this.selectedTerm = 1
    },
    /**
     * проверка на отсутствие пакета и выбранного пакета
     * @return Boolean
     * **/
    checkErrorPlans() {
      return !this.plans || !this.plans[this.selectedPack];
    },
    /**
     * проверка на отсутствие выбранного пакета и его значечение
     * @return Boolean
     * **/
    checkErrorSelectedPlans() {
      return !this.selectedTerm || !isFinite(this.plans[this.selectedPack].price);
    },
    showPrev() {
      this.$refs.carousel.prev()
    },
    getPlanColor(plan) {
      switch (plan){
        case 'daily':
          return '#74B5FF';
        case 'weekly':
          return '#FFA374';
        case 'monthly':
          return '#A274FF';
        case 'yearly':
          return '#7CD572';
      }
    }
  },
}
</script>


<style lang="scss" scoped>

  .premium-calc {
    //margin-top: 2.8125rem;

    .title-p {
      margin-bottom: 2rem;
    }

    &-contain {
      border-radius: 6px;
      background: linear-gradient(0deg, $color-blue-dark 0%, rgba(39, 39, 84, 0) 100%);
    }

    &-banner {
      padding: 1.875rem;
      border-radius: 6px;
      background-color: transparent;

      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;

      background-image: url("../../assets/premium/bg-banner.svg");

      .icon {
        @include flexMain(center, center);
        @include flexFlow(nowrap, column);
        background: #2C2E5F;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        margin: auto auto 18px;

        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      }

      p {
        line-height: 1.25;
      }
    }

    .slick-track {
      display: flex !important;
    }

    .slick-slide {
      float: none !important;
    }

    .slick-slider {
      padding: 35px 16px 27px;
    }
  }

  .premium-calc-bottom {
    margin-top: 1.875rem;
    //background: $color-blue-dark;
    //box-shadow: 0 15px 13px rgba(0, 14, 68, 0.161);
    //border-radius: 6px;
    position: relative;
    @media screen and (max-width: 799px){
     max-width: 300px;
      margin: 1.875rem auto;
    }
  }

  .premium-cb {
    background: $color-blue-dark;
    box-shadow: 0 15px 13px rgba(0, 14, 68, 0.161);
    border: 1px solid $color-blue;
    border-radius: 10px;
    padding: 1.875rem 1.25rem 1rem 1.25rem;
    max-width: 300px;
    width: 100%;
    @media screen and (max-width: 799px){
      width: auto;
    }

    &-top {
      margin-bottom: 10px;

      img, svg {
        width: 38px;
      }
    }

    &-total {
      span {
        font-weight: 900;
        font-size: 1rem;
      }
      b {
        font-size: 2.125rem;
      }
    }
    &-total-crypto {
      text-align: right;
      b {
        color: $color-blue;

      }
    }

    .color-calc {
      color: #7CD572;
    }

    &.daily {
      .sign {
        svg path{
          fill: #74B5FF;
        }

        svg .fill {
          fill: #2b537f;
        }
      }
      .color-calc {
        color: #74B5FF;
      }
    }

    &.weekly {
      .sign {
        svg path{
          fill: #FFA374;
        }

        svg .fill {
          fill: #e87e48;
        }
      }
      .color-calc {
        color: #d6652b;
      }
    }

    &.monthly {
      .sign {
        svg path{
          fill: #A274FF;
        }

        svg .fill {
          fill: #6d39dc;
        }
      }
      .color-calc {
        color: #A274FF;
      }
    }
  }

  .premium-success-buy {
    opacity: 0;
    visibility: hidden;
    transition: .3s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    > span {
      color: #FFF;
      font-size: 36px;
      font-weight: bold;
      z-index: 1;
      position: relative;
      background-color: #33a35a;
      padding: 10px 25px;
      border-radius: 12px;
      > span {
        margin-left: 10px;
      }
    }

    &-bg {
      border-radius: 8px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0.5;
      background-color: #33a35a;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2350c679' fill-opacity='0.17' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");

    }
    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

  .premium-cm {
    flex: 1;
    padding: 1.875rem 1.25rem;
    background: $color-blue-dark;
    box-shadow: 0 10px 13px rgba(0, 14, 68, 0.161);
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    @media screen and (max-width: 799px){
      padding: 0 20px;
    }

    .options-block {
      flex: 1;
      margin: 0 20px 0 0;

      @media screen and (max-width: 799px){
        margin: 20px 0;
      }

      .label {
        min-width: 35%;
        font-size: 14px;
        display: inline-block;
        margin-right: 16px;
        @media screen and (max-width: 799px){
          margin-bottom: 15px;
        }
      }

      .select {
        flex: 1;
        background: #2C2E5F;
        border-radius: 5px;
        max-width: 240px;
        min-width: 150px;
        @media screen and (max-width: 799px){
          max-width: none;
        }
      }

      select {
        width: 100%;
        //min-width: 236px;
        text-align: right;
        background-color: #2C2E5F;
      }

      .input-field {
        +.input-field {
          margin-top: 20px;
        }
      }
    }

    p {
      font-size: 13px;
      line-height: 18px;
      text-align: right;
    }
    .left  {
      text-align: left;
    }

    .btn {
      width: 100%;
      margin-top: 1.5rem;
      font-size: 16px;
      line-height: 1.8;
      @media screen and (max-width: 799px){
        max-width: 185px;
        margin: 1.5rem auto;
      }
    }

    .buy-block {
      min-width: 185px;
      @media screen and (max-width: 799px){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .sign {
    font-size: 16px;
    line-height: 1.3;
    padding: 10px;
    padding-left: 34px;
    padding-right: 20px;
    margin-left: -40px;
    position: relative;
    width: 204px;

    b {
      font-weight: 700;
      position: relative;
      z-index: 2;

      span {
        text-transform: capitalize;
      }
    }

    svg {
      position: absolute;
      left: -1px;
      top: -3px;
      width: 100%;
      height: 62px;
    }

  }


  .premium-calc--item {
    position: relative;
    padding: 1px 0;


    input {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      visibility: hidden;
    }

    label {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      border-radius: 10px;
      border: 1px solid transparent;
      //margin: auto;
      max-width: 210px;
      padding: 1.4rem;
      margin: auto 3px;
      position: relative;
      overflow: hidden;
      transition: 1s ease;

      &:before {
        content: '';
        position: absolute;
        height: 9px;
        width: 100%;
        top: 0;
        left: 0;
        transition: .5s ease;
      }
    }

    .slider-title span {
      text-transform: capitalize;
    }

    &.daily {
      .slider-title span, .price {
        color: #74B5FF;
      }
    }

    &.weekly {
      .slider-title span, .price {
        color: #FFA374;
      }
    }

    &.monthly {
      .slider-title span, .price {
        color: #A274FF;
      }
    }

    &.yearly {
      .slider-title span, .price {
        color: #7CD572;
      }
    }

    span {
      line-height: 1.25;
      font-size: 1rem;
    }

    .icon {
      display: inline-block;
      margin: 0 auto 18px;
      width: 50px;
      height: 50px;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .slider-title {
      margin-bottom: 8px;
    }

    .discount {
      margin-bottom: 20px;
      min-height: 20px;
    }

    .price {
      font-size: 2.125rem;
      margin-bottom: 13px;
    }

    li, li span {
      font-size: .875rem;
    }

    li {
      +li {
        margin-top: 3px;
      }
    }

    .check {
      @include flexMain(center, center, column);
      margin: 25px auto 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #6C4365;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: $color-red;
      }
    }

    &:hover {
      label {
        border-color: $color-blue;

      }
    }
  }

  input[type="radio"]:checked+label {
    transition: .17s all;
    border-color: $color-blue;

    .check {
      &:after {
        width: 12px;
        height: 12px;
        animation: check 0.3s ease-in-out;
      }
    }
  }
  input[type="radio"]#pc_0:checked + label{
    &:before {
      background: #74B5FF;
    }
  }
  input[type="radio"]#pc_1:checked + label{
    &:before {
      background: #FFA374;
    }
  }
  input[type="radio"]#pc_2:checked + label{
    &:before {
      background: #A274FF;
    }
  }
  input[type="radio"]#pc_3:checked + label{
    &:before {
      background: #7CD572;
    }
  }

  @keyframes check {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(2);
    }
    100% {
      transform: scale(1);
    }
  }

  .mobile-flex-column {
    @media screen and (max-width: 799px){
      flex-direction: column;
      align-items: stretch;
    }
  }

  .button-style  {
    position: absolute;
    top: 50%;
    z-index: 200;
  }
  .next  {
    right: 20px;
  }
  .prev  {
    left: 20px;
  }
</style>
