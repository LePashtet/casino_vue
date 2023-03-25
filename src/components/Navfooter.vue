<template>
  <div class="footer">
    <div class="menu">

      <div class="logo-block">
        <router-link to="/"><img class="logo" src="../assets/logo.svg" alt="logo" /></router-link>
      </div>

      <div class="links-social">
        <div>
          <a href="/"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
          <a href="/"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
          <a href="/"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
          <a href="/"><font-awesome-icon :icon="['fab', 'vk']" /></a>
        </div>
        <div class="lang">
          {{ $t('footer.lang') }} <language-selector color="#FF7475"></language-selector>
        </div>

      </div>

      <div class="links">
        <div class="title"><span>{{ $t('footer.start') }}</span></div>
        <router-link to="/">{{ $t('footer.menu.faq') }}</router-link>
        <router-link to="/">{{ $t('footer.menu.terms') }}</router-link>
        <router-link to="/">{{ $t('footer.menu.home') }}</router-link>
        <router-link to="/">{{ $t('footer.menu.privacy') }}</router-link>
        <router-link to="/">{{ $t('footer.menu.links') }}</router-link>
      </div>
      <div>
        <div class="title"><span>{{ $t('footer.contact') }}</span></div>
        <div><font-awesome-icon icon="envelope" /> support@freebitme.com</div>
        <div><font-awesome-icon :icon="['fab', 'telegram-plane']" /> @hostobit</div>
      </div>

    </div>
    <div class="copyright">
      <span>© 2021 Freebitme  {{ $t('footer.rights') }}</span>
    </div>
  </div>
</template>

<script>
import LanguageSelector from "./LanguageSelector";

  export default {
    name: 'Navfooter',
    components: {
      LanguageSelector
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    background-color: $color-blue-dark;
    color: #FFF;
    padding: 3% 0 0 0;

    .menu {
      padding: 20px 10%;
      display: flex;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      text-align: left;
      > div {
        margin: 0 auto;
        padding: 0 10px 0 10px;
        &:first-of-type {
          padding-top: 0;
        }
      }
      .logo-block {
        display: flex;
        max-width: 250px;
        a {
          display: flex;
        }
        .logo {
          transition: .3s all linear;
          margin-left: 5px;
          height: 40px;
        }
      }
      .links-social{
        @media screen and (min-width: 1024px){
          order: 1;
          margin-bottom: auto;
        }

      }
      .links {
        display: flex;
        flex-direction: column;
        a {
          text-decoration: none;
          transition: .3s all ease;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .title {
        margin-bottom: 10px;
        span {
          padding: 0 30px 3px 5px;

          border-bottom: 2px solid $color-red;
        }
      }
      .links-social {
        align-self: center;
        .lang {
          display: grid;
          grid-template-columns: 40% 60%;
          align-items: center;
          justify-content: center;
          margin: 20px 0 0 0;
          color: #8B8ECE;
          font-size: 14px;
        }
        a {
          margin: 0 3px;
          width: 30px;
          height: 30px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background-color: #FFF;
          color: #282732;
          border-radius: 6px;
          transition: .3s ease;
          &:hover {
            background-color: $color-red;
          }

          svg {
            font-size: 20px;
          }
        }
      }
    }
    .copyright {
      padding: 10px 0;
      border-top: 1px solid #626491;
      color: #626491;
      text-align: center;
      font-size: 12px;
    }

    @media screen and (max-width: 1023px){
      .menu {
        padding: 20px 3%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        text-align: left;
        > div {
          margin: 0 auto;
          padding: 0;
          &:first-of-type {
            padding-top: 0;
          }
        }
        .logo-block {
          display: flex;
          align-items: center;
          a {
            display: flex;
          }
          .logo {
            transition: .3s all linear;
            margin-left: 0;
            height: 24px;
          }
        }
        .links {
          display: flex;
          flex-direction: column;
          a {
            color: #7C7D8D;
            text-decoration: none;
            transition: .3s all ease;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .title {
          margin-bottom: 10px;
          span {
            padding: 0;

            border-bottom: 2px solid $color-red;
          }
        }
        .links-social {
          align-self: center;
          a {
            margin: 0 3px;
            width: 30px;
            height: 30px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background-color: #FFF;
            color: #282732;
            border-radius: 6px;
            transition: .3s ease;
            &:hover {
              background-color: $color-red;
            }

            svg {
              font-size: 20px;
            }
          }
        }
      }
      .copyright {
        padding: 10px 0;
        border-top: 1px solid #626491;
        color: #626491;
        text-align: center;
        font-size: 12px;
      }
    }
  }

</style>
