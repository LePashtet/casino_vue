<template>
  <div class="ads-faq-page">

    <div>
      <div class="faq-title">{{ $t('earning.paidAds.faq.users') }}</div>

      <div class="faq-question">
        <div><span>{{ $t('earning.paidAds.faq.question') }}:</span>{{ $t('earning.paidAds.faq.q1.index') }}</div>
        <div><span>{{ $t('earning.paidAds.faq.answer') }}:</span>{{ $t('earning.paidAds.faq.q1.answer') }}</div>
        <div class="line"></div>

        <div><span>1.</span>{{ $t('earning.paidAds.faq.q1.one') }}</div>
        <div><span>2.</span>{{ $t('earning.paidAds.faq.q1.two') }}</div>
        <div><span>3.</span>{{ $t('earning.paidAds.faq.q1.three') }}</div>
        <div><span>4.</span>{{ $t('earning.paidAds.faq.q1.four') }}</div>
        <div><span>5.</span>{{ $t('earning.paidAds.faq.q1.five') }}</div>

      </div>

      <div class="faq-question">
        <div><span>{{ $t('earning.paidAds.faq.question') }}:</span>{{ $t('earning.paidAds.faq.q2.index') }}</div>
        <div><span>{{ $t('earning.paidAds.faq.answer') }}:</span>{{ $t('earning.paidAds.faq.q2.answer') }} <router-link :to="{name: 'Exchange'}">{{ $t('earning.paidAds.faq.q2.exchange') }}</router-link></div>

      </div>

      <div class="faq-question">
        <div><span>{{ $t('earning.paidAds.faq.question') }}:</span>{{ $t('earning.paidAds.faq.q3.index') }}</div>
        <div><span>{{ $t('earning.paidAds.faq.answer') }}:</span>{{ $t('earning.paidAds.faq.q3.answer') }}</div>

      </div>

      <div class="faq-question">
        <div><span>{{ $t('earning.paidAds.faq.question') }}:</span>{{ $t('earning.paidAds.faq.q4.index') }}</div>
        <div><span>{{ $t('earning.paidAds.faq.answer') }}:</span>{{ $t('earning.paidAds.faq.q4.answer') }}</div>

      </div>

      <div class="faq-question">
        <div><span>{{ $t('earning.paidAds.faq.question') }}:</span>{{ $t('earning.paidAds.faq.q5.index') }}</div>
        <div><span>{{ $t('earning.paidAds.faq.answer') }}:</span>{{ $t('earning.paidAds.faq.q5.answer') }}</div>

      </div>
    </div>

    <div>
      <div class="faq-title">{{ $t('earning.paidAds.faq.advertisers') }}</div>

      <div class="faq-question">
        <div><span>{{ $t('earning.paidAds.faq.question') }}:</span>{{ $t('earning.paidAds.faq.q6.index') }}</div>
        <div><span>{{ $t('earning.paidAds.faq.answer') }}:</span>{{ $t('earning.paidAds.faq.q6.answer') }} <router-link :to="{name: 'Exchange'}">{{ $t('earning.paidAds.faq.q6.exchange') }}</router-link></div>

      </div>

      <div class="faq-question">
        <div><span>{{ $t('earning.paidAds.faq.question') }}:</span>{{ $t('earning.paidAds.faq.q7.index') }}</div>
        <div><span>{{ $t('earning.paidAds.faq.answer') }}:</span>{{ $t('earning.paidAds.faq.q7.answer') }}</div>
        <div class="line"></div>

        <div><span>1.</span>{{ $t('earning.paidAds.faq.q7.one') }}</div>
        <div><span>2.</span>{{ $t('earning.paidAds.faq.q7.two') }}</div>
        <div><span>3.</span>{{ $t('earning.paidAds.faq.q7.three') }}</div>
        <div><span>4.</span>{{ $t('earning.paidAds.faq.q7.four') }}</div>
        <div><span>5.</span>{{ $t('earning.paidAds.faq.q7.five') }}</div>
        <div><span>6.</span>{{ $t('earning.paidAds.faq.q7.six') }}</div>
        <div><span>7.</span>{{ $t('earning.paidAds.faq.q7.seven') }}</div>

      </div>

      <div class="faq-question">
        <div><span>{{ $t('earning.paidAds.faq.question') }}:</span>{{ $t('earning.paidAds.faq.q8.index') }}</div>
        <div><span>{{ $t('earning.paidAds.faq.answer') }}:</span>{{ $t('earning.paidAds.faq.q8.answer') }}</div>

      </div>

      <div class="faq-question">
        <div><span>{{ $t('earning.paidAds.faq.question') }}:</span>{{ $t('earning.paidAds.faq.q9.index') }}</div>
        <div><span>{{ $t('earning.paidAds.faq.answer') }}:</span>{{ $t('earning.paidAds.faq.q9.answer') }}</div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'EarningAdsFaq'
  }
</script>

<style lang="scss" scoped>
  .ads-faq-page {
    display: flex;

    > div {
      width: 50%;
      text-align: left;
      padding: 0 20px;
      .faq-title {
        margin: 30px 0;
        color: $color-red;
        font-size: 20px;
        font-weight: bold;
      }
      .faq-question {
        margin: 20px 0;
        padding-bottom: 10px;
        //border-bottom: 1px solid $color-blue;
        position: relative;
        > div {
          font-size: 14px;
          color: $color-blue;
          > span {
            color: $color-red;
            font-weight: bold;
            margin-right: 5px;
          }
          &:first-of-type {
            color: #FFF;
            font-weight: bold;
          }
        }
        .line {
          height: 10px;
        }
        &:after {
          position: absolute;
          content: ' ';
          bottom: 0;
          left: 0;
          right: 120px;
          height: 1px;
          background-color: $color-blue;
        }
      }
    }
    @media screen and (max-width: 1023px){
      flex-direction: column;
      align-items: center;
      > div {
        width: 90%;
      }
    }
  }
</style>
