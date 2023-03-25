<template>
  <div class="nav-auth">

    <div class="user-data">
      <div class="user-avatar">
        <Avatar :avatar="$store.getters.getAvatar" :is-avatar="$store.getters.getAvatar" size="50" />
        <!--<img v-if="$store.getters.getAvatar" :src="$store.getters.getAvatar" alt="" />-->
      </div>
      <div class="user-info">
        <div class="user-profile"><div class="user-name">{{ $store.getters.getUsername }}</div></div>
        <div><a class="logout" @click="logout"><font-awesome-icon icon="sign-out-alt" size="xs" /></a></div>
      </div>
    </div>
    <div class="menu-auth menu-main">
      <router-link @click.native="closeMenu" to="/cabinet" exact><span><font-awesome-icon icon="home"/></span><span>{{ $t('menu.lobby') }}</span></router-link>
      <!--<router-link to="/about"><span><font-awesome-icon :icon="['far', 'bell']" /></span><span>News</span></router-link>-->
      <router-link @click.native="closeMenu" to="/games"><span><font-awesome-icon icon="play"/></span><span>{{ $t('menu.games') }}</span></router-link>
      <router-link @click.native="closeMenu" to="/cabinet/earning"><span><font-awesome-icon icon="dollar-sign"/></span><span>{{ $t('menu.earning') }}</span></router-link>
      <router-link @click.native="closeMenu" to="/exchange"><span><font-awesome-icon icon="exchange-alt"/></span><span>{{ $t('menu.exchange') }}</span></router-link>
      <router-link @click.native="closeMenu" to="/cabinet/premium"><span><font-awesome-icon icon="gem"/></span><span>{{ $t('menu.premium') }}</span></router-link>
      <router-link @click.native="closeMenu" to="/cabinet/affiliate"><span><font-awesome-icon icon="user-friends"/></span><span>{{ $t('menu.affiliates') }}</span></router-link>
      <router-link @click.native="closeMenu" to="/cabinet/statistics"><span><font-awesome-icon icon="layer-group"/></span><span>{{ $t('menu.statistics') }}</span></router-link>
      <router-link @click.native="closeMenu" to="/cabinet/sites"><span><font-awesome-icon icon="sitemap"/></span><span>{{ $t('menu.owner') }}</span></router-link>
      <router-link @click.native="closeMenu" to="/cabinet/settings"><span><font-awesome-icon icon="cog"/></span><span>{{ $t('menu.settings') }}</span></router-link>
    </div>
    <div class="menu-auth menu-down">
      <router-link @click.native="closeMenu" to="/help"><span><font-awesome-icon :icon="['far', 'question-circle']"/></span><span>{{ $t('menu.help') }}</span></router-link>
    </div>
  </div>

</template>

<script>
  import Avatar from './Cabinet/Avatar'
  export default {
    name: 'Navauth',
    components: { Avatar },
    methods: {
      logout: function() {

        this.axios.get(`/api/auth/logout?t=${new Date().getTime()}`)

        this.$store.commit('logout')

        this.$store.commit('socketAuthStatus', false)

        this.$router.push({path: '/'})
      },
      closeMenu(){
        this.$emit('closeMenu');
        console.log(this.$route.path.split('/'))
      }
    },

  }
</script>

<style lang="scss" scoped>
  .nav-auth {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 80px;
    background-color: $color-blue-dark;
    border-bottom: 3px solid $color-red;
    border-bottom-right-radius: 4px;

    transition: width .5s ease;


    .user-data {
      width: 100%;
      padding: 10px 0;
      display: flex;
      align-items: center;
      // justify-content: flex-start;
      transition: .5s ease;
      .user-avatar {
        margin: 0 14px;
      }
      /*
      .avatar {
        min-width: 50px;
        display: flex;
        margin: 0 14px;
        > img {
          border-radius: 25px;
          width: 100%;
        }
      }
      */
      .user-info {
        visibility: hidden;
        opacity: 0;
        margin-left: 20px;
        margin-right: 10px;
        display: flex;
        justify-content: space-between;
        width: 100%;

        .user-profile {
          flex: 1;
        }
        .user-name {
          text-transform: capitalize;
        }

        .logout {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFF;
          text-decoration: none;
          width: 25px;
          height: 25px;
          background-color: #3f3f78;
          border-radius: 4px;

          &:hover {
            background-color: $color-red;
          }
        }
      }
    }

    .menu-auth {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 10px 0;
      a {
        color: #FFF;
        font-size: 18px;
        margin: 10px 0;
        z-index: 1;

        display: flex;

        align-items: center;
        text-decoration: none;

        span {
          transition: .3s ease;
          &:first-of-type {
            min-width: 30px;
            height: 30px;
            background-color: #3f3f78;
            border-radius: 4px;

            display: flex;
            justify-content: center;
            align-items: center;

            margin-left: 25px;
          }
          &:last-of-type {
            visibility: hidden;
            opacity: 0;
            margin-left: 20px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 30px;
            width: 100%;
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            white-space: nowrap;

            padding-left: 20px;
          }

        }
        // &.router-link-exact-active {
        &.router-link-active {
          span {
            &:first-of-type {
              background-color: $color-red;
            }
            &:last-of-type {
              background-color: #3f3f78;
            }
          }
        }
        &:hover {
          span {
            &:first-of-type {
              background-color: $color-red;
            }
            &:last-of-type {
              background-color: #3f3f78;
            }
          }
        }
      }
    }

    .menu-down {
      position: relative;
      a {
        span:first-of-type {
          color: $color-red;
          background-color: transparent;
        }
        &:hover {
          span:first-of-type {
            //background-color: transparent;
            color: #FFF;
          }
        }
        //&.router-link-exact-active {
        &.router-link-active {
          span {
            &:first-of-type {
              //background-color: transparent;
              color: #FFF;
            }
          }
        }
      }
      &:before {
        content: ' ';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 2px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #383A70);
      }
    }

    .menu-main {
      position: relative;
      &:after {
        visibility: hidden;
        opacity: 0;
        transition: .8s ease;
        content: ' ';
        position: absolute;
        bottom: 10px;
        right: 0;
        height: 90px;
        width: 105px;
        z-index: 0;
        background-image: url("../assets/icon_menu.svg");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }



    &:hover {
      width: 260px;
      border-right: 2px solid #383A70;

      .user-data {
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #383A70);
        .user-info {
          visibility: visible;
          opacity: 1;
        }
      }
      .menu-auth {
        a {
          span {
            &:last-of-type {
              visibility: visible;
              opacity: 1;
            }
          }
        }
      }
      .menu-main {
        &:after {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
</style>
