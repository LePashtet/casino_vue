<template>
  <div class="nav-news">
    <div class="title mo">{{ $t('news.title') }}</div>
    <div class="list">
      <div v-for="n in 2" :key="n">
        <div class="time">Yesterday, 24:22</div>
        <div class="title mo"><span>New</span> Courses</div>
        <div class="text">Is the process by of an organization, particularly those regarding planning making.</div>
        <div class="buttons">
          <div><a href="#" class="read-news mo">{{ $t('news.more') }}</a></div>
          <div class="comments">
            <div><font-awesome-icon :icon="['far', 'comment-alt']" size="xs" /><span>23</span></div>
            <div><font-awesome-icon icon="eye" size="xs" /><span>123</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="read">
      <a @click="close('/news')">{{ $t('news.more') }}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navnews',
    methods: {
      close: function(value) {
        this.$emit('close')
        this.$router.push(value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav-news {
    position: absolute;
    width: 370px;
    background-color: #2C2E5F;
    box-shadow: 0 18px 20px rgba(0, 0, 0, 0.16);
    top: 47px;
    right: 10px;
    z-index: 13;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;

    @media screen and (max-width: 1023px){
      right: -80px;
      width: 300px;
    }

    > .title {
      font-weight: bold;
      padding: 15px 0;
      position: relative;
      text-transform: capitalize;
    }
    .list {
      > div {
        padding: 10px 20px;
        position: relative;
        margin-bottom: 10px;
        .time {
          font-size: 14px;
          font-weight: lighter;
          color: $color-red;
          text-align: right;
          line-height: 12px;
        }
        .title {
          font-weight: bold;
          font-size: 22px;
          text-align: left;
          > span {
            color: $color-red;
          }
        }
        .text {
          color: $color-blue;
          font-weight: lighter;
          padding: 5px 0 20px 0;
          text-align: left;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          > div {
            display: flex;
            align-items: center;

            .read-news {
              color: $color-red;
              text-decoration: none;
              padding: 3px 0;
              border-bottom: 1px solid $color-red;
              font-weight: bold;
              font-size: 14px;
              transition: .3s ease;
              &:hover {
                color: #ff8e90;
              }
            }
          }
          .comments {
            > div {
              display: flex;
              align-items: center;
              color: $color-blue;
              margin: 0 6px;
            }
            .fa-comment-alt {
              margin-top: 3px;
            }
            span {
              margin-left: 5px;
              font-size: 14px;
              font-weight: lighter;
            }
          }
        }
        &::before {
          content: ' ';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 1px;
          background-image: linear-gradient(to right, #383A70, $color-red);
        }
      }
    }
    .read {
      background-color: $color-blue-dark;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      > a {
        display: block;
        padding: 20px 0;
        color: $color-red;
        text-decoration: none;
        font-weight: lighter;
        transition: .3s ease;
      }
      &:hover {
        > a {
          color: #ff8e90;
        }
      }
    }
  }
</style>
