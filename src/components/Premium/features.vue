<template>
  <div class="premium-features">
    <h5 class="title-block" v-html="$t('premium.premGive')"></h5>
    <p class="title-p" v-html="$t('premium.premGiveSub')"></p>

    <ul class="color-blue">
      <li>
        <span class="icon"><img src="@/assets/premium/features/1.svg" alt="1"></span>
        <p v-html="$t('premium.give1')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/2.svg" alt="2"></span>
        <p v-html="$t('premium.give2')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/3.svg" alt="3"></span>
        <p v-html="$t('premium.give3')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/4.svg" alt="4"></span>
        <p v-html="$t('premium.give4')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/5.svg" alt="5"></span>
        <p v-html="$t('premium.give5')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/6.svg" alt="6"></span>
        <p v-html="$t('premium.give6')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/7.svg" alt="7"></span>
        <p v-html="$t('premium.give7')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/8.svg" alt="8"></span>
        <p v-html="$t('premium.give8')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/9.svg" alt="9"></span>
        <p v-html="$t('premium.give9')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/10.svg" alt="10"></span>
        <p v-html="$t('premium.give10')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/11.svg" alt="11"></span>
        <p v-html="$t('premium.give11')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/12.svg" alt="12"></span>
        <p v-html="$t('premium.give12')"></p>
      </li>
      <li>
        <span class="icon"><img src="@/assets/premium/features/13.svg" alt="13"></span>
        <p v-html="$t('premium.give13')"></p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'PremiumCalc',
  data() {
    return{

    }
  }
}
</script>

<style lang="scss" scoped>

  .premium-features {
    margin-top: 5rem;

    .title-block {
      margin-bottom: 18px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;


      @media (min-width: 768px) {
        margin: 3.31rem -20px 0;
      }
    }

    li {
      display: flex;
      align-items: center;
      margin: 17px 20px;


      @media (min-width: 768px) {
        width: calc(50% - 40px);
      }

    }

    .icon {
      width: 50px;
      height: 50px;
      flex: none;
      margin-right: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 10px;
      background: $color-blue-dark;
    }
  }
</style>
