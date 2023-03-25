<template>
  <nav class="navbar" :class="{userActive: $store.getters.isAuth}">
    <div class="burger" @click="showMenu">
      <div class="burger-icon"/>
    </div>
    <div class="news-background" v-if="news" @click="newsClose"></div>

    <div class="logo">
      <router-link @click.native="closeMenu" to="/"><img src="../assets/logo.svg" alt="freebitme"/></router-link>
    </div>
    <div class="center">
      <!--      <div></div>-->
      <div class="links-wr">
        <div class="links">

          <div class="user-data" v-if="$store.getters.isAuth">
            <div class="user-avatar">
              <Avatar :avatar="$store.getters.getAvatar" :is-avatar="$store.getters.getAvatar" size="50"/>
              <!--<img v-if="$store.getters.getAvatar" :src="$store.getters.getAvatar" alt="" />-->
            </div>
            <div class="user-info">
              <div class="user-profile">
                <div class="user-name">{{ $store.getters.getUsername }}</div>
              </div>
              <div><a class="logout" @click="logout">
                <font-awesome-icon icon="sign-out-alt" size="xs"/>
              </a></div>
            </div>
          </div>

          <div class="links-list">
            <router-link @click.native="closeMenu" to="/" exact>{{ $t('header.home') }}</router-link>
            <router-link @click.native="closeMenu" to="/services">{{ $t('header.service') }}</router-link>
            <router-link @click.native="closeMenu" to="/site-owner">{{ $t('header.owner') }}</router-link>
            <router-link @click.native="closeMenu" to="/site-list">{{ $t('header.list') }}</router-link>
            <router-link @click.native="closeMenu" to="/stats">{{ $t('header.stats') }}</router-link>
            <router-link @click.native="closeMenu" to="/news">{{ $t('header.news') }}</router-link>
          </div>


          <transition name="fade" mode="out-in">
            <Navauth v-if="$store.getters.isAuth" @closeMenu="closeMenu"/>
          </transition>


        </div>
        <div class="links-ad--btns">
          <button v-if="!$store.getters.isAuth" class="nav-button login" @click="openToggle">{{ $t('header.signin') }}
            <font-awesome-icon icon="sign-in-alt"/>
          </button>
        </div>
      </div>
      <div class="left-buttons">
        <language-selector :langs="langs" v-show="showLangSelector"></language-selector>
        <button v-show="showTopBar" class="nav-button news active" :class="{open: news}" @click="newsToggle">
          <font-awesome-icon :icon="['far', 'bell']"/>
        </button>
        <transition name="fade" mode="out-in">
          <Navnews v-if="news" @close="newsClose"/>
        </transition>
      </div>
    </div>
    <div v-show="showTopBar" class="reserve">
      <div class="reserve-menu" :class="{opened: $store.getters.isChatOpen}">
        <div class="chat-button">
          <button class="nav-button open" @click="chatToggle">
            <font-awesome-icon :icon="['far', 'comment-dots']"/>
          </button>
        </div>
        <transition name="fade-menu" mode="out-in">
          <div class="chat-menu" v-show="$store.getters.isChatOpen">
            <a class="nav-button language-button">
              <div class="language-icon">
                <div>{{ $store.getters.getChatLang.toUpperCase() }}</div>
                <div><img :src="require(`@/assets/flags/flag_${$store.getters.getChatLang}.svg`)" alt=""></div>
              </div>
              <div class="language-select">
                <div v-for="(item, key) in $store.getters.getChatLanguages" :key="key" @click="changeLang(item.code)"
                     v-show="item.code !== $store.getters.getChatLang" class="language-icon">
                  <div>{{ item.code.toUpperCase() }}</div>
                  <div><img :src="require(`@/assets/flags/flag_${item.code}.svg`)" alt=""></div>
                </div>
              </div>
            </a>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
import Navauth from './Navauth'
import Navnews from './Navnews'
import Avatar from './Cabinet/Avatar'
import LanguageSelector from "./LanguageSelector";

export default {
  name: 'Navbar',
  components: {Navauth, Navnews, Avatar, LanguageSelector},
  data() {
    return {
      news: false,
      showTopBar: true,
      //showLanguages: localStorage.getItem('chat-lang')?localStorage.getItem('chat-lang').split(','):[this.$store.getters.getChatLang,this.$store.getters.getChatLang==='en'?'ru':'en'],
      langs: [{
        item: 'En',
        val: 'en'
      }, {
        item: 'Ru',
        val: 'ru'
      },
        {
          item: 'Ua',
          val: 'ua'
        }]
    }
  },
  computed: {
    showLangSelector() {
      return this.$store.getters.isMobile && !this.showTopBar || !this.$store.getters.isMobile
    }
    /*isAuth: function() {
      return this.$store.getters.isAuth
    },

     */
  },
  methods: {
    showMenu() {
      this.$emit('showMenu');
      this.showTopBar = !this.showTopBar
    },
    closeMenu() {
      this.$emit('closeMenu');
      if (this.$store.getters.isMobile) {
        this.showTopBar = !this.showTopBar
      }
    },
    openToggle: function () {
      this.$store.commit('openModalAuth')
    },
    chatToggle: function () {
      this.$store.commit('chatToggle')
    },
    newsToggle: function () {
      this.news = !this.news
    },
    newsClose: function () {
      this.news = false
    },
    changeLang: function (lang) {
      if (this.checkLang(lang) !== true) {
        this.$store.dispatch('addNotif', {
          type: 'danger',
          text: 'Language not found!',
          isClose: false,
          timer: 2000
        }).then()
        return
      }
      this.$store.commit('changeChatLang', lang)

      //if (this.showLanguages.indexOf(lang) === -1) {
      //  this.showLanguages[1] = this.showLanguages[0]
      //  this.showLanguages[0] = lang
      //  localStorage.setItem('chat-lang', this.showLanguages)
      //}

      //this.toggleLanguages(false)
    },
    checkLang: function (lang) {
      let find = false
      const languages = this.$store.getters.getChatLanguages
      for (let key in languages) {
        if (languages.hasOwnProperty(key) && languages[key].code === lang) {
          find = true
        }
      }
      return find
    },
    logout: function () {

      this.axios.get(`/api/auth/logout?t=${new Date().getTime()}`)

      this.$store.commit('logout')

      this.$store.commit('socketAuthStatus', false)

      this.$router.push({path: '/'})
    }
  },
  watch: {
    isAuth: function (value) {
      //if (value === true && this.isConnectedSocket === true) {
      //  this.$store.dispatch("sendSocketAuth").then()
      //}


      //const redirect = this.$route.query.redirect
      //if (redirect !== undefined && value === true && redirect !== this.$router.currentRoute.path) {
      //  this.$router.push({ path: redirect })
      //}
    },
  }
}
</script>

<style lang="scss" scoped>

.fade-menu-enter-active, .fade-menu-leave-active {
  transition: all .5s ease;
}

.fade-menu-enter {
  transform: translateX(100%);
  opacity: 0;
}

.fade-menu-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  transform: translateX(100%);
  opacity: 0;
}


</style>
