<template>
  <div class="chat-block">
    <div class="chat-messages">

      <div class="messages-list-wrap" id="chatBlock">

        <div v-if="!isLoad" class="chat-loader"><font-awesome-icon icon="circle-notch" size="5x" spin /></div>
        <transition-group name="list" tag="div" class="messages-wrap" id="chatBoxWrap">

          <div v-for="(value, index) in chatMessages" :key="value.time + value.user.hash" class="message" v-show="value.type !== 'delete'">

            <message-text
              :index="index"
              :data="value.data.data"
              :text="value.data.text"
              :hash="value.user.hash"
              :username="value.user.username"
              :is-avatar="value.user.avatar"
              :avatar="value.user.avatar"
              :time="value.time"
              :is-premium="value.user.premium > new Date().getMilliseconds()"
              @name="insertUsername"
            />

          </div>

        </transition-group>

      </div>

      <transition name="fade-command" mode="out-in">
        <picker
          class="emoji-picker"
          v-if="isOpenEmoji"
          @select="addEmoji"
          :style="{bottom: getInputHeight() + 'px'}">
        </picker>
      </transition>

      <div v-if="$store.getters.isAuth" class="message-input" id="inputBlock">
        <div class="input-icon"><a @click="toggleEmoji()"><font-awesome-icon :icon="['far', 'grin-beam']" /></a></div>
        <div class="input-text">
          <span class="input-data mo" @click="closeEmoji" @input="keyDownText" @keydown.enter="sendMessage" id="chatText" contentEditable="true" style="height: 18px" :placeholder="$t('chat.input')"></span>
          <!--
          <textarea @input="keyDownText" @click="closeEmoji" @keydown.enter="sendMessage" id="chatText" class="mo" style="height: auto;" rows="1" placeholder="Write here..."></textarea>
          -->
        </div>
        <div class="input-icon">
          <a v-if="!sendLoader && socketIsConnected" @click="sendMessage"><font-awesome-icon icon="play" /></a>
          <font-awesome-icon v-show="sendLoader || !socketIsConnected" icon="circle-notch" spin/>
        </div>
      </div>
      <div class="chat-block-counter" id="chatCounter"></div>

      <div class="chat-disconnected" :class="{active: reconnect}">
        <div>{{ $t('chat.connect') }}<span>.</span><span>.</span><span>.</span></div>
      </div>

    </div>

    <AdsBlock />


  </div>
</template>

<script>
  import ChatUtils from "./ChatUtils"
  import Picker from "./EmojiPicker"
  import MessageText from './Message/MessageText'
  import AdsBlock from './AdsBlock'
  import AdsModal from './AdsModal'
  import * as URI from "uri-js";

  export default {
    name: 'Chat',
    components: { AdsBlock, MessageText, Picker },
    data() {
      return {
        sendLoader: false,
        reconnect: false,

        isChatLoad: false,
        scrollLock: false,
        isNew: false,
        chatMessages: [],
        chatCommand: '',

        isOpenEmoji: false,

        inputId: 'chatText',
        inputIdBlock: 'inputBlock',
        mainId: 'chatBlock',
        counterId: 'chatCounter',
      }
    },
    created () {
      this.$store.commit('subscribe_chat_send')
      if (this.isLoad === true) {
        this.loadChat()
      }
    },
    computed: {
      isOpen: function () {
        return this.$store.getters.isChatOpen
      },
      isLoad: function () {
        return this.$store.getters.getChatIsLoad
      },
      chatLang: function() {
        return this.$store.getters.getChatLang
      },
      socketIsConnected: function() {
        return this.$store.getters.isConnectedSocket
      },
      socketChatSend: function(){
        return this.$store.getters.socketSubscribesChatSend
      },

    },
    watch: {
      chatMessages: function () {
        if (this.isChatLoad === true && this.scrollLock === false) {
          // new message

          const elem = document.getElementById(this.mainId)
          if (elem !== undefined && elem !== null && elem.clientHeight + 80 > elem.scrollHeight - elem.scrollTop) {
            this.scrollChat()
          } else {
            this.isNew = true
          }

        }
      },
      socketIsConnected: function(value) {
        // если чат загружен и подключился сокет после падения
        if(this.isChatLoad && value) {
          this.loadChat()
        }

        // если чат загружен и сокет упал
        if( this.isChatLoad && !value) {
          this.reconnect = true
        }
      },
      socketChatSend: function (data) {
        if (data !== null) {
          if (data.status === 'success') {
            this.clearTextMsg()
          } else {
            this.$store.dispatch('addNotif', {type: 'danger', text: data.message, isClose: false, timer: 2000}).then()
          }
          this.sendLoader = false
          this.$store.commit('subscribe_chat_send')
        }
      },
      isLoad: function (data) {
        if (data === true) {
          this.loadChat()
        }
      },
      chatLang: function () {
        this.loadChat()
      },
      isOpen: function () {
        if (this.$store.getters.isChatOpen) {
          this.scrollChat()
          document.getElementById(this.inputId).innerHTML = this.$store.getters.getChatShare;
          ChatUtils.changeHeight(this.mainId, this.inputId, this.counterId)
        }
      }
    },

    methods: {
      loadChat: function () {
        this.chatMessages = []
        let lang = this.$store.getters.getChatLang
        if (this.$store.getters.getChatIsLoad === false) {
          return
        }

        setTimeout(()=> {
          if (this.isOpen) {
            this.scrollChat()
          }

          this.chatMessages = this.$store.getters.getChatMsgData[lang]
          setTimeout(()=> {
            this.isChatLoad = true
            this.reconnect = false

            //load scroll
            /*
            if (this.$store.getters.getDeviceType !== 'mobile' && this.$store.getters.getDeviceType !== 'tablet') {
              const scroll = document.getElementById("chatBlockScroll")
              const scrollDiv = document.getElementById("chatBlockScrollDiv")

              scroll.style.bottom = this.getInputHeight() + 'px'
              let elem = document.getElementById("chatBoxWrap")
              let elem2 = document.getElementById("chatBlockMain")

              let percent = (elem2.clientHeight - 30) / elem.scrollHeight

              scrollDiv.style.height = ((elem2.clientHeight - 30) * percent) + 'px'
            }

            if (this.$store.getters.getChatShare !== "") {

              this.setChatShare(this.$store.getters.getChatShare)
            }

             */

          }, 300)
        }, 300)
      },

      parseText: function(elem) {
        //elem.innerHTML.replace('&nbsp;', '')


        //elem.innerHTML.replace(/&nbsp;/g, '')

        const images = elem.getElementsByTagName('img')
        let text = elem.innerHTML.toString().replace(/&gt;/g,'>')
        for (let i = 0; i < images.length; i++) {
          if (images[i].classList.contains('emoji-image')) {
            text = text.replace(images[i].outerHTML.toString(), images[i].getAttribute('data-name')).replace(/&nbsp;/g, ' ')
          }
        }

        const links = text.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g);
        if (links !== null) {
          for (let i = 0; i < links.length; i++) {
            if (URI.parse(links[i]).host === 'freebitme.com') {
              text = text.replace(links[i], `url(${links[i]}|${URI.parse(links[i]).host})`)
            } else {
              text = text.replace(links[i], `?LINK?`)
            }
          }
        }

        // const txid =  text.match(/txid\([^)]*\)/g);
        // if (links !== null) {
        //   for (let i = 0; i < links.length; i++) {
        //       text = text.replace(links[i], `url(${links[i]}|${URI.parse(links[i]).host})`)
        //   }
        // }



        return text
      },
      sendMessage: function (event) {
        if (event !== null && event !== undefined) {
          event.preventDefault()
        }

        let text = this.parseText(document.getElementById(this.inputId));
        this.closeEmoji()
        this.sendLoader = true



        //if (text.substr(0, 1) === '/') {
        //  this.processCommand(text)
        //  return
        //}

        const data = { lang: this.$store.getters.getChatLang, text: text }
        this.$store.dispatch('sendSocketChatSend', data).then()
      },
      clearTextMsg: function() {
        document.getElementById(this.inputId).innerHTML = ''
        this.chatCommand = ''
        this.sendLoader = false

        ChatUtils.changeHeight(this.mainId, this.inputId, this.counterId)
      },

      removeText: function(e) {
        e.target.innerHTML.replace('<br>', '')
          .replace('<br/>', '')
          //.replace('<div>', '')
          //.replace('</div>', '')

        //setInterval(() => {
        //  this.removeText(e)
        //}, 500)
      },
      keyDownText: function(e) {
        //e.target.innerHTML.replace('<br>', '')

        if (e.target.innerText.substr(0, 1) === '/') {
          this.chatCommand = e.target.innerText
        } else if (this.chatCommand !== '') {
          this.chatCommand = ''
        }

        ChatUtils.changeHeight(this.mainId, this.inputId, this.counterId)

        //this.removeText(e)
      },
      scrollChat: function() {
        const elem = document.getElementById(this.mainId)
        if (elem === undefined || elem === null) {
          return
        }

        let height = elem.scrollTop
        let attempt = 4
        let intS = 0

        this.scrollLock = true
        intS = setInterval(() => {
          if (height < elem.scrollHeight) {
            elem.scrollTo(0, height)
            attempt++
            height = height + attempt
          } else {
            elem.scrollTo(0, elem.scrollHeight)
            this.scrollLock = false
            clearInterval(intS)
          }
        }, 10)
      },
      focusOnText: function () {
        const elem = document.getElementById(this.inputId)
        if (elem !== undefined && elem !== null) {
          elem.focus()
        }
      },
      toggleEmoji: function() {
        this.isOpenEmoji = !this.isOpenEmoji
      },
      addEmoji: function(emoji) {
        if (emoji.src === null) return

        const image = document.createElement('img')
        image.src = emoji.src
        image.setAttribute('data-name', emoji.native)
        image.className = 'emoji-image'

        document.getElementById(this.inputId).appendChild(image)
        //this.focusOnText()

        //ChatUtils.changeHeight(this.mainId, this.inputId, this.counterId)
      },
      closeEmoji: function() {
        this.isOpenEmoji = false
      },
      getInputHeight: function() {
        if (document.getElementById(this.inputIdBlock) === null){
          return 0
        }
        return document.getElementById(this.inputIdBlock).clientHeight
      },
      insertUsername: function (username) {
        let elem = document.getElementById(this.inputId)
        elem.innerHTML += '@' + username + '\u00A0'
        //elem.focusOnText()

        setTimeout(function() {
          //elem.focus();
          let sel, range;
          if (window.getSelection && document.createRange) {
            range = document.createRange()
            range.selectNodeContents(elem)
            sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
            sel.collapseToEnd()
          } else if (document.body.createTextRange) {
            range = document.body.createTextRange()
            range.moveToElementText(elem)
            range.select()
          }
        }, 1)

        //ChatUtils.changeHeight(this.mainId, this.inputId, this.counterId)
      },

    }
  }
</script>

<style>
  .emoji-image {
    height: 16px;
  }
  .chat-bold{
    font-weight: 700;
  }
  .chat-italic{
    font-style: italic;
  }
  .chat-under{
    text-decoration: underline;
  }
  .chat-strike{
    text-decoration: line-through;
  }
</style>

<style lang="scss" scoped>
  .emoji-picker,
  .chat-command {
    position: absolute;
    bottom: 80px;
    right: 0;
    left: 0;
  }
  .fade-command-enter-active, .fade-command-leave-active {
    transition: all .5s ease;
  }
  .fade-command-enter, .fade-command-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all .5s ease;
  }
  .list-enter {
    opacity: 0;
    transform: translateY(-30px);
  }
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .chat-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
    width: 100%;

    .chat-messages {
      flex: 1;
      min-height: 0;
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 1;
      background-color: #2C2E5F;
      // box-shadow: inset 0 0 36px -10px rgba(0, 0, 0, .4);

     .messages-list-wrap {
          overflow-y: scroll;
          overflow-x: hidden;
          margin-right: -30px;
          outline: none;
          flex: 1;


        // тут скролл прячем
        .messages-wrap {
          height: 100%;
          border-right: 30px solid #28292d;
          border-right-width: 30px;
          border-right-width: 30px;
          position: relative;
          outline: medium none currentcolor;

        }
      }
      .message-input {
        background-color: #262653;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        box-shadow: 0 -1px 1px 1px rgba(23, 23, 50, 0.4);
        z-index: 1;

        .input-text {
          flex: 1;
          padding: 0 10px 0 5px;
          display: flex;
          align-items: center;
          textarea {
            resize: none;
            width: 100%;
            font-size: 14px;
            color: $color-blue;
            outline: none;
            border: 0;
            background-color: #262653;
            margin: 0;
          }
          .input-data {
            width: 100%;
            height: 18px;
            text-align: left;
            font-size: 14px;
            color: $color-blue;
            outline: none;
            border: 0;
            background-color: #262653;
            margin: 0;
            word-break: break-all;
            display: inline-flex;
            align-items: center;
            overflow: hidden;

            &[contenteditable][placeholder]:empty:before {
              content: attr(placeholder);
              display: inline;
              color: gray;
              background-color: transparent;
            }
          }
        }
        .input-icon {
          min-width: 16px;
          a {
            color: $color-red;
          }
        }
      }
      .chat-block-counter {
        position: absolute;
        bottom: 0;
        left: 1px;
        font-size: 6px;
        font-weight: lighter;
        z-index: 2;
      }

      .chat-disconnected {
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
        z-index: 3;
        &.active {
          opacity: 1;
          visibility: visible;
        }
        &:before {
          content: ' ';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #2c2e5f;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23f9f9f9' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
          opacity: .5;
        }
        > div {
          z-index: 4;
          background-color: rgba(255, 255, 255, 0.3);
          padding: 5px 10px;
          border-radius: 8px;
          font-weight: bold;
          span {
            animation-name: blink;
            animation-duration: 1.4s;
            animation-iteration-count: infinite;
            animation-fill-mode: both;

            font-size: 20px;
          }
          span:nth-child(2) {
            animation-delay: .2s;
          }
          span:nth-child(3) {
            animation-delay: .4s;
          }
          @keyframes blink {
            0% { opacity: .2;}
            20% { opacity: 1;}
            100% { opacity: .2;}
          }
        }
      }
    }
  }

  .message {
    padding: 5px;


  }
</style>
