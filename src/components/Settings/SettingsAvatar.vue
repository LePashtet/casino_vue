<template>
  <div class="avatar-modal">

    <!--<img v-if="$store.getters.getAvatar" :src="$store.getters.getAvatar" alt="" />-->

    <Avatar :avatar="$store.getters.getAvatar" :is-avatar="$store.getters.getAvatar" size="100" />

    <div class="click-button delete-button"><a @click="deleteClicked"><font-awesome-icon icon="trash-alt" /></a></div>
    <div class="click-button change-button"><a @click="openChange"><font-awesome-icon icon="camera" /></a></div>

    <div v-show="open" class="avatar-data">
      <div class="close-modal"><a @click="closeChange"><font-awesome-icon icon="times"/></a></div>
      <div class="upload-icon"><font-awesome-icon icon="upload" /></div>
      <vue-avatar
        :width=200
        :height=200
        :border="0"
        :border-radius="100"
        :scale="parseFloat(scale)"
        ref="vueavatar"
        class="upload-wrap"
        @vue-avatar-editor:image-ready="onImageReady" />
      <input
        type="range"
        min=1
        max=3
        step=0.02
        v-model="scale"
      />

      <button v-on:click="saveClicked">UPLOAD</button>


      <!--<img ref="image"> -->


    </div>

  </div>
</template>

<script>

  import {VueAvatar} from 'vue-avatar-editor-improved'
  import Avatar from '../Cabinet/Avatar'
  export default {
    name: 'SettingsAvatar',
    components: {
      Avatar,
      VueAvatar},
    data () {
      return {
        scale: 1,
        open: false,
      };
    },
    methods: {
      saveClicked () {
        const img = this.$refs.vueavatar.getImageScaled()
        if (this.$refs.vueavatar.getImageScaled().toDataURL() === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAsUlEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8GXHmAAFMgHIEAAAAAElFTkSuQmCC') {
          this.deleteClicked()
          return
        }
        //this.$refs.image.src = img.toDataURL()

        this.axios.post('/api/settings/avatar', {data: img.toDataURL()})
          .then(response => {
            if (response.data.status === 'success') {

              this.$store.commit('updateAvatar', response.data.data)
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.closeChange()
            //this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      deleteClicked() {
        this.axios.delete('/api/settings/avatar')
          .then(response => {
            if (response.data.status === 'success') {

              this.$store.commit('updateAvatar', null)
            } else {
              this.$store.dispatch('addNotif', {type: 'danger', text: response.data.message, isClose: false, timer: 2000}).then()
            }
            this.open = false
            //this.loader = false
          })
          .catch(() => {
            this.$store.dispatch('addNotif', {type: 'danger', text: 'Server error', isClose: false, timer: 2000}).then()
          })
      },
      onImageReady () {
        this.scale = 1
      },
      openChange () {
        this.open = true
        //console.log('open')
      },
      closeChange() {
        this.open = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-modal {
    //width: 100px;
    //height: 100px;
    //background: url(../../assets/avatar_default.svg);
    //border: 1px solid rgba(198, 209, 222, 0.51);
    //border-radius: 50px;
    position: relative;
    /*
    > img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
    */

    .click-button {
      position: absolute;
      width: 25px;
      height: 25px;
      bottom: -5px;
      border-radius: 15px;
      font-size: 14px;
      background-color: #6C4365;
      display: flex;
      transition: .3s ease;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:hover {
        background-color: #82567b;
      }
    }
    .delete-button {
      left: -5px;
      background-color: #ff1e00;
      &:hover {
        background-color: #ff3a1f;
      }
    }
    .change-button {
      right: -5px;
    }
    .avatar-data {
      position: absolute;
      top: -5px;
      left: -10px;
      background-color: $color-blue-dark;
      padding: 10px 10px 20px 10px;
      border-radius: 6px;
      border: 1px solid #121226;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1;
      .upload-wrap {
        z-index: 1;
      }
      > input {
        margin-top: 5px;
      }
      > button {
        margin-top: 5px;
        background-color: #2c2e5f;
        color: $color-blue;
        font-size: 18px;
        font-weight: bold;
        border: 1px solid #434580;
        border-radius: 4px;
        padding: 4px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
        &:hover {
          color: #707070;
          box-shadow: none;
        }
      }
      .upload-icon {
        z-index: 0;
        position: absolute;
        display: flex;
        top: 91px;
        left: calc(50% - 19px);
        font-size: 38px;
        color: #FFFC;
      }
      .close-modal {
        position: absolute;
        top: -15px;
        right: -15px;
        > a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 24px;
          height: 24px;
          background-color: #2c2e5f;
          border: 1px solid #000;
          border-radius: 12px;

        }

      }
    }
  }
</style>
