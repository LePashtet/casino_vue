<template>
  <div class="home" :class="{ chat: $store.getters.isChatOpen }">
    <div class="content-top-bg"></div>
    <div class="content-top">
      <div class="content-data">
        <div class="title">
          <div class="title_img"><img src="../assets/logo_main.svg" alt="logo frebitme"/></div>
          <div class="rasp" v-html="$t('home.logo')"></div>
        </div>
        <SliderFrame v-if="$store.getters.isMobile" v-slot:default="{ next, prev, slidesCount, activeIndex }">
          <div class="relative">
            <SliderWrapper class="top-features">
              <SliderSlide>
                <div>
                  <div class="icon"><img src="../assets/icon_safe.svg" alt=""/></div>
                </div>
                <div class="text-wrap">
                  <div class="head mo">{{ $t('home.mainBlocks.safely') }}</div>
                  <div class="text rasp" v-html="$t('home.mainBlocks.safelyText')"></div>
                </div>
              </SliderSlide>
              <SliderSlide>
                <div>
                  <div class="icon"><img src="../assets/icon_server.svg" alt=""/></div>
                </div>
                <div class="text-wrap">
                  <div class="head mo">{{ $t('home.mainBlocks.decentralized') }}</div>
                  <div class="text rasp" v-html="$t('home.mainBlocks.decentralizedText')"></div>
                </div>
              </SliderSlide>
              <SliderSlide>
                <div>
                  <div class="icon"><img src="../assets/icon_cloud.svg" alt=""/></div>
                </div>
                <div class="text-wrap">
                  <div class="head mo">{{ $t('home.mainBlocks.cloud') }}</div>
                  <div class="text rasp" v-html="$t('home.mainBlocks.decentralizedText')"></div>
                </div>
              </SliderSlide>

            </SliderWrapper>
            <div class="slider-buttons">
              <button @click="prev" class="button-style">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                     class="svg-inline--fa fa-chevron-left fa-w-10">
                  <path fill="currentColor"
                        d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                        class=""></path>
                </svg>
              </button>
              <button @click="next" class="button-style">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                     class="svg-inline--fa fa-chevron-right fa-w-10">
                  <path fill="currentColor"
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                        class=""></path>
                </svg>
              </button>
            </div>
            <SliderDots :current="activeIndex" :pages="slidesCount"></SliderDots>
          </div>
        </SliderFrame>
        <div v-else class="top-features">
          <div>
            <div>
              <div class="icon"><img src="../assets/icon_safe.svg" alt=""/></div>
            </div>
            <div class="text-wrap">
              <div class="head mo">{{ $t('home.mainBlocks.safely') }}</div>
              <div class="text rasp" v-html="$t('home.mainBlocks.safelyText')"></div>
            </div>
          </div>
          <div>
            <div>
              <div class="icon"><img src="../assets/icon_server.svg" alt=""/></div>
            </div>
            <div class="text-wrap">
              <div class="head mo">{{ $t('home.mainBlocks.decentralized') }}</div>
              <div class="text rasp" v-html="$t('home.mainBlocks.decentralizedText')"></div>
            </div>
          </div>
          <div>
            <div>
              <div class="icon"><img src="../assets/icon_cloud.svg" alt=""/></div>
            </div>
            <div class="text-wrap">
              <div class="head mo">{{ $t('home.mainBlocks.cloud') }}</div>
              <div class="text rasp" v-html="$t('home.mainBlocks.decentralizedText')"></div>
            </div>
          </div>
        </div>
        <div class="top-features-buttons">
          <a href="#" class="button-style mo">{{ $t('home.signin') }}
            <font-awesome-icon icon="sign-in-alt"/>
          </a>
          <a href="#" class="button-style mo">{{ $t('home.signup') }}</a>
        </div>
        <div id="statistics" ref="statistics" class="statistics">
          <div class="online">
            <div class="online-title mo rasp" v-html="$t('home.online.title')"></div>
            <div class="online-data">
              <div>
                <div class="mo">{{ days }}</div>
                <div class="mo">{{ $t('home.online.days') }}</div>
              </div>
              <div>
                <div class="mo">{{ hours }}</div>
                <div class="mo">{{ $t('home.online.hours') }}</div>
              </div>
              <div>
                <div class="mo">{{ minutes }}</div>
                <div class="mo">{{ $t('home.online.mins') }}</div>
              </div>
              <div>
                <div class="mo">{{ seconds }}</div>
                <div class="mo">{{ $t('home.online.sec') }}</div>
              </div>
            </div>
          </div>
          <div class="statistics-right">
            <div style="grid-area: sr-1">
              <div class="stat-icon"><img src="../assets/icon_stat0.svg" alt=""/></div>
              <div class="stat-text"><span>{{ $t('home.online.totalPaid') }}</span></div>
              <div class="stat-count mo"><span>$55 000.23</span></div>
            </div>

            <div style="grid-area: sr-2">
              <div class="stat-icon"><img src="../assets/icon_stat1.svg" alt=""/></div>
              <div class="stat-text"><span>{{ $t('home.online.totalPaid') }}</span></div>
              <div class="stat-count mo"><span>$55 000.23</span></div>
            </div>

            <div style="grid-area: sr-3">
              <div class="stat-icon"><img src="../assets/icon_stat2.svg" alt=""/></div>
              <div class="stat-text"><span>{{ $t('home.online.totalPaid') }}</span></div>
              <div class="stat-count mo"><span>$55 000.23</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-why">
      <div class="content-data">
        <div class="why-title mo rasp" v-html="$t('home.why.title')"></div>
        <div class="why-data">
          <div>
            <div>
              <div>
                <div class="why-text-title mo">{{ $t('home.why.wallet') }}</div>
                <div class="why-text rasp" v-html="$t('home.why.walletText')"></div>
              </div>
              <div class="why-icon"><img src="../assets/icon_why0.svg" alt="" /></div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <div class="why-text-title mo">{{ $t('home.why.wallet') }}</div>
                <div class="why-text rasp" v-html="$t('home.why.walletText')"></div>
              </div>
              <div class="why-icon"><img src="../assets/icon_why1.svg" alt="" /></div>
            </div>
          </div>

          <div>
            <div>
             <div>
                <div class="why-text-title mo">{{ $t('home.why.wallet') }}</div>
                <div class="why-text rasp" v-html="$t('home.why.walletText')"></div>
              </div>
              <div class="why-icon"><img src="../assets/icon_why2.svg" alt="" /></div>
            </div>
          </div>

          <div>
            <div>
             <div>
                <div class="why-text-title mo">{{ $t('home.why.wallet') }}</div>
                <div class="why-text rasp" v-html="$t('home.why.walletText')"></div>
              </div>
              <div class="why-icon"><img src="../assets/icon_why3.svg" alt="" /></div>
            </div>
          </div>

          <div>
            <div>
             <div>
                <div class="why-text-title mo">{{ $t('home.why.wallet') }}</div>
                <div class="why-text rasp" v-html="$t('home.why.walletText')"></div>
              </div>
              <div class="why-icon"><img src="../assets/icon_why4.svg" alt="" /></div>
            </div>
          </div>

          <div>
            <div>
             <div>
                <div class="why-text-title mo">{{ $t('home.why.wallet') }}</div>
                <div class="why-text rasp" v-html="$t('home.why.walletText')"></div>
              </div>
              <div class="why-icon"><img src="../assets/icon_why5.svg" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-features">
      <div class="content-data">
        <div class="chat-icon"><img src="../assets/icon_chat.png" alt="chat freebitme"/></div>
        <div class="features-block">
          <div class="features-text-block">
            <div class="features-text-up mo rasp" v-html="$t('home.features.title')"></div>
            <div class="features-title mo rasp" v-html="$t('home.features.block1Title')"></div>
            <div class="features-text rasp" v-html="$t('home.features.block1Text')"></div>
          </div>
          <div class="slider">
            <!--            <div class="slider-pages">-->
            <!--              <div class="active"></div>-->
            <!--              <div></div>-->
            <!--              <div></div>-->
            <!--              <div></div>-->
            <!--              <div></div>-->
            <!--            </div>-->
            <div class="slider-buttons">
              <a class="button-style" href="#">
                <font-awesome-icon icon="chevron-left"/>
              </a>
              <a class="button-style" href="#">
                <font-awesome-icon icon="chevron-right"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-coins">
      <div class="content-data">
        <div class="coins-title mo rasp" v-html="$t('home.crypto')"></div>
        <div class="coins-block">
          <div>
            <cryptoicon symbol="btc" color="#3f3f78" size="70"/>
          </div>
          <div>
            <cryptoicon symbol="eth" color="#3f3f78" size="70"/>
          </div>
          <div>
            <cryptoicon symbol="btc" color="#3f3f78" size="70"/>
          </div>
          <div>
            <cryptoicon symbol="eth" color="#3f3f78" size="70"/>
          </div>
          <div>
            <cryptoicon symbol="btc" color="#3f3f78" size="70"/>
          </div>
          <div>
            <cryptoicon symbol="eth" color="#3f3f78" size="70"/>
          </div>
          <div>
            <cryptoicon symbol="btc" color="#3f3f78" size="70"/>
          </div>
          <div>
            <cryptoicon symbol="eth" color="#3f3f78" size="70"/>
          </div>
        </div>
        <div class="coins-button">
          <a href="#" class="button-style mo">
            <font-awesome-icon :icon="['fab', 'telegram-plane']"/>
            {{ $t('home.tgJoin') }}</a>
        </div>
      </div>
    </div>
    <div class="content-last">
      <div class="content-data">
        <div>
          <div class="last-title rasp mo" v-html="$t('home.getStart.title')"></div>
          <div class="last-subtitle rasp mo" v-html="$t('home.getStart.subTitle1')">
          </div>
          <div class="last-text rasp" v-html="$t('home.getStart.subTitle2')">
          </div>
        </div>
        <div class="last-right mo">
          <div>
            <img src="@/assets/free.svg" alt="Free Badge">
            <div>
              <p>{{ $t('home.getStart.its') }}<span @click="$router.push({name:'Services'})">{{ $t('home.getStart.its1') }}</span></p>
              <p>{{ $t('home.getStart.its1sub') }}</p>
            </div>
          </div>
          <div>
            <img src="@/assets/fun.svg" alt="Fun Badge">
            <div>
              <p>{{ $t('home.getStart.its') }}<span @click="$router.push({name:'SiteList'})">{{ $t('home.getStart.its2') }}</span></p>
              <p>{{ $t('home.getStart.its2sub') }}</p>
            </div>
          </div>
          <div>
            <img src="@/assets/potential.svg" alt="Huge Potential Badge">
            <div>
              <p>{{ $t('home.getStart.iths') }}<span @click="scrollPageTo('statistics')">{{ $t('home.getStart.its3') }}</span></p>
              <p>{{ $t('home.getStart.its3sub') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SliderWrapper from "./Slider/SliderWrapper";
import SliderFrame from "./Slider/SliderFrame";
import SliderSlide from "./Slider/SliderSlide";
import SliderDots from "./Slider/SliderDots";

export default {
  name: 'Home',
  components: {SliderWrapper, SliderFrame, SliderSlide, SliderDots},
  data() {
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    }
  },
  created() {
    this.timerStart()
  },
  methods: {
    timerStart: function () {
      let timeStart = Math.floor(Date.now() / 1000) - this.$store.getters.timeSiteStart
      this.days = Math.floor(timeStart / 24 / 60 / 60)
      this.hours = Math.floor((timeStart - this.days * 24 * 60 * 60) / 60 / 60)
      this.minutes = Math.floor((timeStart - this.days * 24 * 60 * 60 - this.hours * 60 * 60) / 60)
      this.seconds = timeStart - this.days * 24 * 60 * 60 - this.hours * 60 * 60 - this.minutes * 60

      setInterval(() => {
        if (this.seconds === 59) {
          this.seconds = 0
          if (this.minutes === 59) {
            this.minutes = 0
            if (this.hours === 23) {
              this.hours = 0
              this.days++
            } else {
              this.hours++
            }
          } else {
            this.minutes++
          }
        } else {
          this.seconds++
        }
      }, 1000)
    },
    scrollPageTo(refName) {
      let element = this.$refs[refName];
      element.scrollIntoView({behavior: 'smooth'});
    }
  }

}
</script>

<style lang="scss" scoped>
.home {
  .content-top-bg {
    min-height: 830px;
    background-image: linear-gradient(#2C2E5F, $color-blue-dark);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;

    &::before {
      content: '';
      position: absolute;
      left: 40px;
      top: 0;
      bottom: 0;
      width: 200px;
      background: url('../assets/image_bg1.svg') no-repeat;
      background-size: auto;
      background-size: 200px 1200px;
    }

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 850px;
      background: url('../assets/image_bg0.svg') no-repeat;
      background-size: auto;
      background-size: 850px 700px;
    }

    @media screen and (max-width: 1023px) {
      min-height: 900px;

      &::before {
        background: none;
      }
      &::after {
        right: 0;
        top: 0;
        bottom: 0;
        width: 200px;
        background: url('../assets/image_bg0.svg') no-repeat;
        background-size: auto;
        background-size: 300px 400px;
      }
    }
  }

  .content-data {
    width: 60vw;
    margin: 0 auto;
    max-width: 1152px;

    @media screen and (max-width: 1023px) {
      width: 90vw;
    }
  }

  .content-top {
    min-height: 740px;
    z-index: 1;
    position: relative;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 40px;
      padding: 15px 0;
      position: relative;
      width: 60%;
      color: #FFF;

      @media screen and (max-width: 1023px) {
        flex-direction: column;
        text-align: left;
        width: 205px;

        &_img {
          position: relative;
          padding-bottom: 20px;

          &::after {
            content: ' ';
            position: absolute;
            left: 30%;
            right: 0;
            bottom: 0;
            height: 3px;
            width: 100%;
            background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #ff3860);
          }
        }
      }

      img {
        height: 40px;
        @media screen and (max-width: 1023px) {
          height: 30px;
        }
      }

      @media screen and (min-width: 1024px) {
        &::after {
          content: ' ';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #ff3860);
        }
      }

    }

    .top-features {
      width: 60%;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      > div {
        margin: 15px 0;
        display: flex;

        .icon {
          background-color: #3f3f78;
          border-radius: 10px;
          padding: 10px;
          display: flex;
          box-shadow: 5px 5px 10px #252754;

          > img {
            width: 45px;
            height: 45px;
          }
        }

        .text-wrap {
          margin-left: 20px;
          text-align: left;

          .head {
            font-size: 22px;
            font-weight: bold;
            line-height: 22px;
          }

          .text {
            color: $color-blue;
            font-weight: lighter;
          }
        }
      }

      @media screen and (max-width: 1023px) {
        width: 100%;
        max-width: 500px;
        min-height: 190px;
      }
    }

    .top-features-buttons {
      margin: 20px 0 30px 0;
      text-align: left;

      > a {
        padding: 10px 40px;

        &:last-of-type {
          margin-left: 30px;
        }
      }

      @media screen and (max-width: 1023px) {
        width: 100%;
        max-width: 350px;
        display: flex;
        justify-content: center;
        > a {
          padding: 10px 10px;
        }
      }
    }

    .statistics {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;

      > div {
        flex: 1;
      }

      .online {
        text-align: left;

        .online-title {
          width: 100%;
          font-weight: bold;
          font-size: 34px;
          padding-bottom: 20px;
          position: relative;

          &::after {
            content: ' ';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 2px;
            background-image: linear-gradient(to right, $color-red, rgba(0, 0, 0, 0));
          }
        }

        .online-data {
          padding-top: 20px;
          display: flex;

          > div {
            border-radius: 8px;

            background-color: #2C2E5F;
            box-shadow: 0 15px 13px rgba(0, 14, 68, 0.35);
            margin-right: 20px;
            min-width: 105px;

            > div {
              position: relative;
              text-align: center;

              &:first-of-type {
                padding: 20px 20px 5px 20px;
                font-weight: bold;
                font-size: 42px;

                &::after {
                  content: ' ';
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  height: 2px;
                  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #383A70);
                }
              }

              &:last-of-type {
                padding: 5px 20px 15px 20px;
                color: $color-red;
              }
            }
          }
        }
      }

      .statistics-right {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

        > div {
          background-color: #2C2E5F;
          box-shadow: 0 17px 19px rgba(0, 0, 0, 0.16);
          border-radius: 12px;
          border-bottom: 4px solid $color-red;
          margin-left: 20px;

          .stat-icon {
            margin-left: 50px;
            margin-bottom: 10px;
            background-color: #4A4C82;
            border-radius: 12px;
            display: flex;
            position: relative;

            > img {
              height: 90px;
              width: 90px;
            }
          }

          .stat-text {
            width: 100%;
            position: relative;
            padding-top: 5px;
            color: $color-red;
            text-align: right;

            > span {
              font-size: 14px;
              margin-right: 10px;
            }

            &::before {
              content: ' ';
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              height: 2px;
              background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #383A70);
            }
          }

          .stat-count {
            text-align: right;
            padding: 2px 0 8px 0;
            font-size: 18px;
            font-weight: bold;

            > span {
              margin-right: 10px;
            }
          }
        }
      }

      @media screen and (max-width: 1023px) {
        height: 100%;
        margin-top: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        > div {
          flex: 1;
        }

        .online {
          text-align: center;

          .online-title {
            width: 100%;
            font-weight: bold;
            font-size: 34px;
            padding-bottom: 20px;
            position: relative;

            &::after {
              content: none;
            }
          }

          .online-data {
            width: 100%;
            max-width: 500px;
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            > div {
              border-radius: 8px;

              background-color: #2C2E5F;
              box-shadow: 0 15px 13px rgba(0, 14, 68, 0.35);
              margin-right: 2px;
              min-width: 90px;

              > div {
                position: relative;
                text-align: center;

                &:first-of-type {
                  padding: 20px 20px 5px 20px;
                  font-weight: bold;
                  font-size: 35px;

                  &::after {
                    content: ' ';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 2px;
                    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #383A70);
                  }
                }

                &:last-of-type {
                  padding: 5px 20px 15px 20px;
                  color: $color-red;
                }
              }
            }

            @media screen and (max-width: 440px) {
              width: 40%;
              margin: 0 auto;
              flex-direction: column;
              justify-content: center;

              > div {
                margin: 5px 0;
              }
            }
          }
        }
        .statistics-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 40px 0;

          > div {
            background-color: #2C2E5F;
            box-shadow: 0 17px 19px rgba(0, 0, 0, 0.16);
            border-radius: 12px;
            border-bottom: 4px solid $color-red;
            margin-left: 20px;

            .stat-icon {
              margin-left: 0;
              margin-bottom: 0;
              background-color: #4A4C82;
              border-radius: 12px;
              display: flex;
              position: relative;

              > img {
                height: 120px;
                width: 120px;
              }
            }

            .stat-text {
              width: 100%;
              position: relative;
              padding-top: 5px;
              color: $color-red;
              text-align: right;

              > span {
                font-size: 14px;
                margin-right: 10px;
              }

              &::before {
                content: ' ';
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                height: 2px;
                background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #383A70);
              }
            }

            .stat-count {
              text-align: right;
              padding: 2px 0 8px 0;
              font-size: 18px;
              font-weight: bold;

              > span {
                margin-right: 10px;
              }
            }
          }

          @media screen and (max-width: 1023px) {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
                ". sr-2 ."
                "sr-1 sr-2 sr-3"
                "sr-1 . sr-3";
          }
          @media screen and (max-width: 440px) {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-row-gap: 10px;
            grid-template-areas:
                ". sr-1 ."
                ". sr-2 ."
                ". sr-3 .";

            > div {
              margin-left: 0;
            }
          }
        }
      }
    }
  }

  .content-why {
    background-color: #2C2E5F;
    margin-bottom: 50px;

    .why-title {
      margin: 50px 0 30px 0;
      font-size: 30px;
      font-weight: bold;
    }

    .why-data {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      > div {
        width: 32%;
        margin: 20px 0;

        > div {
          padding: 10px 20px;
          border-radius: 12px;
          background-color: #272856;

          box-shadow: 0 17px 19px rgba(0, 14, 68, 0.44);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          .why-text-title {
            text-align: left;
            font-weight: bold;
            font-size: 20px;
          }

          .why-text {
            text-align: left;
            margin-top: 5px;
            font-size: 14px;
            color: $color-blue;
            font-weight: lighter;
          }

          .why-icon {
            display: flex;

            > img {
              height: 70px;
              width: 70px;
            }
          }
        }
      }
    }

    @media screen and (max-width: 1023px) {
      .why-title {
        margin: 50px 0 30px 0;
        font-size: 30px;
        font-weight: bold;
      }
      .why-data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        > div {
          width: 100%;
          max-width: 500px;
          height: 20vh;
          margin: 40px 0;

          > div {
            height: 100%;
            padding: 10px 20px;
            border-radius: 12px;
            background-color: #272856;

            box-shadow: 0 17px 19px rgba(0, 14, 68, 0.44);
            display: flex;
            justify-content: space-between;
            align-items: center;

            .why-text-title {
              text-align: left;
              font-weight: bold;
              font-size: 20px;
            }

            .why-text {
              text-align: left;
              margin-top: 5px;
              font-size: 14px;
              color: $color-blue;
              font-weight: lighter;
            }

            .why-icon {
              display: flex;

              > img {
                height: 70px;
                width: 70px;
              }
            }
          }
        }
      }
    }

  }

  .content-features {
    background-color: $color-blue-dark;

    .content-data {
      padding: 50px 0;
      display: flex;
      position: relative;


      > div {
        width: 50%;
      }

      .chat-icon {
        position: relative;

        img {
          height: 500px;
        }

        &::after {
          content: ' ';
          position: absolute;
          background-image: url("../assets/icon_chat1.svg");
          background-size: 250px;
          background-repeat: no-repeat;
          top: 30px;
          right: -60px;
          height: 250px;
          width: 250px;
        }
      }

      .features-block {
        z-index: 1;
        text-align: right;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 40px;

        .features-text-up {
          font-weight: bold;
          font-size: 26px;
          margin-bottom: 20px;
          position: absolute;
          top: 20px;
          right: 0;
        }

        .features-title {
          font-weight: bold;
          font-size: 48px;
          margin-bottom: 40px;
        }

        .features-text {
          font-weight: lighter;
          color: $color-blue;
        }

        .slider {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .slider-buttons {
            display: flex;
            align-items: center;
            justify-content: center;

            > a {
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 10px;
              box-shadow: none;

              &:hover {
                box-shadow: none;
              }
            }

            @media screen and (max-width: 1023px) {
              position: relative;
            }
          }

        }
      }
    }

    @media screen and (max-width: 1023px) {
      .content-data {
        padding: 50px 0;
        display: flex;
        flex-direction: column-reverse;

        > div {
          width: 90%;
          max-width: 500px;
        }

        .chat-icon {
          position: relative;

          img {
            height: 500px;
          }

          &::after {
            content: ' ';
            position: absolute;
            background-image: url("../assets/icon_chat1.svg");
            background-size: 250px;
            background-repeat: no-repeat;
            top: 30px;
            right: -60px;
            height: 250px;
            width: 250px;
          }
        }

        .features-block {
          z-index: 1;
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 40px;

          .features-text-up {
            font-weight: bold;
            font-size: 26px;

            margin-bottom: 20px;
          }

          .features-title {
            font-weight: bold;
            font-size: 48px;
            margin-bottom: 40px;
          }

          .features-text {
            font-weight: lighter;
            color: $color-blue;
          }

          .slider {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 10px;

            .slider-buttons {
              display: flex;
              align-items: center;
              justify-content: center;

              > button {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 10px;
                box-shadow: none;

                &:hover {
                  box-shadow: none;
                }
              }
            }

          }
        }
      }

    }
  }

  .content-coins {
    padding: 50px 0;
    background-color: #2C2E5F;

    .coins-title {
      font-size: 26px;
      font-weight: bold;

    }

    .coins-block {
      margin: 20px 0 50px 0;
      display: flex;
      justify-content: center;
      align-items: center;

      > div {
        display: flex;
        margin: 0 20px;
        position: relative;
        box-shadow: 5px 17px 18px rgba(0, 14, 68, 0.32);
        border-radius: 70px;

        > svg {
          z-index: 1;
          transition: .5s ease;
          cursor: pointer;
        }

        &:before {
          content: ' ';
          position: absolute;
          top: 10px;

          right: -2px;
          width: 72px;
          height: 72px;
          border-radius: 70px;
          border: 1px dashed $color-red;
          transition: .8s ease;
        }

        &:hover {
          box-shadow: 5px 17px 18px rgba(0, 14, 68, 0.2);

          > svg {
            transform: rotateZ(360deg);
          }

          &:before {
            top: -2px;
          }
        }
      }
    }

    .coins-button {
      > a {
        padding: 10px 20px;

        > svg {
          font-size: 18px;
          margin-right: 20px;
        }
      }
    }

    @media screen and (max-width: 1023px) {
      .coins-block {
        margin: 20px 0 50px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        > div {
          display: flex;
          margin: 20px;
          position: relative;
          box-shadow: 5px 17px 18px rgba(0, 14, 68, 0.32);
          border-radius: 70px;

          > svg {
            z-index: 1;
            transition: .5s ease;
            cursor: pointer;
          }

          &:before {
            content: ' ';
            position: absolute;
            top: 10px;

            right: -2px;
            width: 72px;
            height: 72px;
            border-radius: 70px;
            border: 1px dashed $color-red;
            transition: .8s ease;
          }

          &:hover {
            box-shadow: 5px 17px 18px rgba(0, 14, 68, 0.2);

            > svg {
              transform: rotateZ(360deg);
            }

            &:before {
              top: -2px;
            }
          }
        }
      }
    }
  }

  .content-last {
    background-image: linear-gradient($color-blue-dark, #2B2D5E);
    padding: 50px 0;

    > div {
      display: flex;
      justify-content: space-between;
      text-align: left;

      > div {
        width: 50%;

        .last-title {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .last-subtitle {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .last-text {
          color: $color-blue;
          font-weight: lighter;
          margin-bottom: 20px;
        }

        .start {
          display: flex;
          align-items: center;
          font-weight: bold;

          p {
            margin-left: 10px;
          }

          span {
            color: #FF7475;
            text-decoration: underline;
            cursor: pointer;
          }
        }

        .last-icon {
          display: flex;

          > img {
            margin-left: -80px;
          }

        }
      }

      .last-right {
        font-weight: bold;
        background: center / contain no-repeat url("~@/assets/icon_freebitme.svg");
        margin-left: 8%;

        > div {
          display: flex;
          align-items: center;

          span {
            color: #FF7475;
            text-decoration: underline;
            cursor: pointer;
          }

          > div {
            p:nth-child(2) {
              font-family: 'Open Sans', sans-serif;
              font-weight: normal;
              font-size: 16px;
              color: #8B8ECE;
            }
          }
        }
      }
    }

    @media screen and (max-width: 1023px) {
      > div {
        flex-direction: column;

        > div {
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .last-title {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 20px;
          }

          .last-text {
            color: $color-blue;
            font-weight: lighter;
            margin-bottom: 20px;
            max-width: 500px;
          }

          .last-icon {
            display: flex;

            > img {
              margin-left: -80px;
            }

          }
        }

        .last-right {
          margin: 20px 0 0 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          text-align: left;
        }
      }
    }
  }
}

.slider-buttons {
  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
  }

  @media screen and (max-width: 1023px) {
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

</style>
