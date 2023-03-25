<template>
  <div class="message-user">
    <div class="user-data" @click="$router.push({name: 'UserPage', params: {hash: hash}}).catch(err => {})">
      <Avatar :avatar="avatar" :is-avatar="isAvatar" :size="45" />
    </div>
    <div class="message-text">
      <div class="message-title">
        <div class="user-name" @click="addUsername(username)"><img v-show="isPremium" src="@/assets/crown.svg" alt="Premium Icon">{{username}}</div>
        <div class="message-time"><ChatTime :time="time"/></div>
      </div>
      <div class="message-text-data">
        <span v-for="item in elements" :key="item.index">
          <span v-if="item.component" :is="item.component" v-bind="item.props"></span>
          <span v-else>{{item}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import ChatTime from '../ChatTime'
  import ChatEmoji from './ChatEmoji'
  import ChatStyle from './ChatStyle'
  import ChatUser from './ChatUser'
  import ChatBalance from './ChatBalance'
  import ChatPrice from './ChatPrice'
  import Avatar from '../../Cabinet/Avatar'
  import currencyMixin from "../../../mixins/currencyMixin";
  export default {
    name: 'MessageText',
    components: { Avatar, ChatTime, ChatEmoji, ChatStyle, ChatUser, ChatBalance, ChatPrice },
    props: ['index', 'data', 'text', 'hash', 'username','isAvatar','avatar', 'time', 'isPremium'],
    mixins:[currencyMixin],
    data() {
      return {
        elements: ['loading...']
      };
    },
    created() {
      // this.index
      this.elements = this.process(this.text, this.data)
    },
    methods: {
      process: function (text, data) {

        if (text.length === 1) {
          return [text]
        }

        let elements = []

        text = text.replace('§', '±')


        if (data !== null) {

          if (data.users !== undefined && data.users !== null && data.users.length > 0) {
            for (let i = 0; i < data.users.length; i++) {
              //console.log(text.lowe.search(data.users[i].username))
              text = text.replace(new RegExp('(@' + data.users[i].username+')','gim'), '§<ChatUser hash="'+data.users[i].hash+'" username="'+data.users[i].username+'"></ChatUser>§')
            }
          }

          if (data.prices !== undefined && data.prices !== null && data.prices.length > 0) {
            for (let i = 0; i < data.prices.length; i++) {
              let dataText = '§<ChatPrice curr="'+data.prices[i].curr+'" price="'+data.prices[i].price+'"></ChatPrice>§'
              let regEx = new RegExp('(!' + data.prices[i].curr + ')')
              text = text.replace(regEx, dataText)
            }
          }

          if (data.balances !== undefined && data.balances !== null && data.balances.length > 0) {
            for (let i = 0; i < data.balances.length; i++) {
              let dataText = '§<ChatBalance curr="'+data.balances[i].curr+'" balance="'+data.balances[i].amount+'"></ChatBalance>§'
              let regEx = new RegExp('\\$' + data.balances[i].curr, "ig");
              text = text.replace(regEx, dataText)
            }
          }

          if (data.emoji !== undefined && data.emoji !== null && data.emoji.length > 0) {
            for (let i = 0; i < data.emoji.length; i++) {
              let dataText = '§<ChatEmoji code="'+data.emoji[i].code+'"></ChatEmoji>§'
              let regEx = new RegExp(data.emoji[i].name, "ig");
              text = text.replace(regEx, dataText)
            }
          }

        }


        const italicData = text.match(/(\*\*[A-Za-zа-яА-Я0-9]+\*\*)/g)
        if (italicData !== null) {
          for (let i = 0; i < italicData.length; i++) {
            text = text.replace(italicData[i], '§<ChatStyle style="bold" text="'+italicData[i].substr(2, italicData[i].length - 4)+'"></ChatStyle>§')
          }
        }

        const boldData = text.match(/(\*[A-Za-zа-яА-Я0-9]+\*)/g)
        if (boldData !== null) {
          for (let i = 0; i < boldData.length; i++) {
            text = text.replace(boldData[i], '§<ChatStyle style="italic" text="'+boldData[i].substr(1, boldData[i].length - 2)+'"></ChatStyle>§')
          }
        }

        const underData = text.match(/(_[A-Za-zа-яА-Я0-9]+_)/g)
        if (underData !== null) {
          for (let i = 0; i < underData.length; i++) {
            text = text.replace(underData[i], '§<ChatStyle style="under" text="'+underData[i].substr(1, underData[i].length - 2)+'"></ChatStyle>§')
          }
        }

        const strikeData = text.match(/(~[A-Za-zа-яА-Я0-9]+~)/g)
        if (strikeData !== null) {
          for (let i = 0; i < strikeData.length; i++) {
            text = text.replace(strikeData[i], '§<ChatStyle style="strike" text="'+strikeData[i].substr(1, strikeData[i].length - 2)+'"></ChatStyle>§')
          }
        }

        const urlData = text.match(/url\([^)]*\)/g);
        if (urlData !== null) {
          for (let i = 0; i < urlData.length; i++) {

            let url = urlData[i].match(/\(.+\|/i)[0].replace(/^[(]+|[|]+$/g, '');
            let textUrl = urlData[i].match(/\|.+\)/i)[0].replace(/^[|]+|[)]+$/g, '');

            text = text.replace(urlData[i], '§<ChatStyle style="under" :isUrl="'+ url + '" text="'+ textUrl +'"></ChatStyle>§')
          }
        }

        const txidData = text.match(/txid\([^)]*\)/g);
        if (txidData !== null) {
          for (let i = 0; i < txidData.length; i++) {

            let txid = txidData[i].match(/\(.+\|/i)[0].replace(/^[(]+|[|]+$/g, '');
            let curr = txidData[i].match(/\|.+\)/i)[0].replace(/^[|]+|[)]+$/g, '');
            let url = this.getTxUrl(curr, txid)

            text = text.replace(txidData[i], '§<ChatStyle style="under" :isUrl="'+ url + '" text=">'+ txid +'"></ChatStyle>§')
          }
        }

        text = text.replace('±', '§')

        let isOpen = false
        let tmpText = ''
        for (let i = 0; i < text.length; i++) {
          if (i === 0) {
            isOpen = true
            if (text[i] !== '§') {
              tmpText = tmpText + text[i]
            }
          } else if (isOpen === true && text[i] === '§') {
            elements.push(tmpText)
            tmpText = ''
          } else if (i === text.length - 1) {
            if (text[i] !== '§') {
              tmpText = tmpText + text[i]
            }
            elements.push(tmpText)
            tmpText = ''
          } else if (isOpen === true) {
            tmpText = tmpText + text[i]
          }
        }

        let retElements = []

        for (let i = 0; i < elements.length; i++) {

          if (elements[i].search('ChatStyle') !== -1) {
            let text = elements[i].match(/text="([\S]+)"/i)
            let style = elements[i].match(/style="([\S]+)"/i)
            let isUrl = elements[i].match(/isUrl="([\S]+)"/i)
            retElements.push({
              component: 'ChatStyle',
              props: {text: text[1], config: style[1], isUrl: isUrl[1]}
            })
          } else if (elements[i].search('ChatUser') !== -1) {
            let hash = elements[i].match(/hash="([\S]+)"/i)
            let username = elements[i].match(/username="([\S]+)"/i)
            retElements.push({
              component: 'ChatUser',
              props: {hash: hash[1], username: username[1]}
            })
          } else if (elements[i].search('ChatPrice') !== -1) {
            let curr = elements[i].match(/curr="([\S]+)"/i)
            let price = elements[i].match(/price="([\S]+)"/i)
            retElements.push({
              component: 'ChatPrice',
              props: {curr: curr[1], price: price[1]}
            })
          } else if (elements[i].search('ChatBalance') !== -1) {
            let curr = elements[i].match(/curr="([\S]+)"/i)
            let balance = elements[i].match(/balance="([\S]+)"/i)
            retElements.push({
              component: 'ChatBalance',
              props: {curr: curr[1], balance: balance[1]}
            })
          } else if (elements[i].search('ChatEmoji') !== -1) {
            let code = elements[i].match(/code="([\S]+)"/i)

            retElements.push({
              component: 'ChatEmoji',
              props: {code: code[1]}
            })
          } else {
            retElements.push(elements[i])
          }
        }

        return retElements
      },
      addUsername: function(username) {
        this.$emit('name', username)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message-user {
    display: flex;
    .user-data {
      // тут левая часть с авкой
      padding-top: 5px;
      cursor: pointer;
    }

    .message-text {
      width: 100%;
      margin-left: 5px;
      background-color: $color-blue-dark;
      border-radius: 10px;

      word-break: break-all;
      //word-wrap: break-word;

      .message-title {
        display: flex;
        justify-content: space-between;
        padding: 0 5px 0 10px;
        .user-name {
          font-size: 14px;
          color: $color-red;
          cursor: pointer;
          display: flex;
          align-items: center;

          img {
            width: 14px;
            margin: 0 5px 0 0;
          }
        }
        .message-time {
          font-size: 14px;
          font-weight: lighter;
          color: $color-blue;
        }
      }
      .message-text-data {
        // margin-top: 5px;
        padding: 5px 10px;

        text-align: left;


      }
    }

  }
</style>
