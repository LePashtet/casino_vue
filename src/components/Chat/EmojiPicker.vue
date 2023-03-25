<template>
  <div class="picker-main">
    <div class="picker-bar">
      <div class="picker-anchors">
        <div class="picker-anchor" v-for="(item, key) in anchorData" :key="key" :class="{active: key === select}" @click="clickAnchor(key)">
          <div v-html="item"></div>
          <span class="picket-anchor-bar"></span>
        </div>

      </div>
    </div>
    <div class="loader-block" v-if="loader">Loading...</div>

    <div v-else class="picker-scroll" id="pickerScroll" v-on:scroll.passive="onScroll" @click="clickPicker">
      <div class="picker-category">
        <div class="picker-category-label">
          <span>Frequently Used</span>
        </div>
        <div class="picker-emoji">
          <span v-for="(item, key) in packsUsed" :key="key">
            <span class="emoji-span" :data-id="item.name" :data-name="item.code"><img class="emoji-img" :data-id="item.name" :data-name="item.code" :alt="item.code" :src="'https://cdn.jsdelivr.net/emojione/assets/4.5/png/64/'+item.name+'.png'" /></span>
          </span>
        </div>
      </div>

      <div class="picker-category" v-for="(item, key) in dataText" :key="key">
        <div class="picker-category-label">
          <span>{{ getCatName(key) }}</span>
        </div>
        <div class="picker-emoji" v-html="item"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'EmojiPicker',
  data () {
    return {
      dataText: null,
      loader: true,
      select : 0,
      anchorData: [
        '<svg width="18" height="18" class="picker-anchor-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>',
        '<svg width="18" height="18" class="picker-anchor-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path></svg>',
        '<svg width="18" height="18" class="picker-anchor-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8"></path><path fill="currentColor" d="M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235"></path></svg>',
        '<svg width="18" height="18" class="picker-anchor-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9"></path></svg>',
        '<svg width="18" height="18" class="picker-anchor-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113"></path></svg>',
        '<svg width="18" height="18" class="picker-anchor-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5"></path><path fill="currentColor" d="M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z"></path></svg>',
        '<svg width="18" height="18" class="picker-anchor-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z"></path><path fill="currentColor" d="M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789"></path></svg>',
        '<svg width="18" height="18" class="picker-anchor-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76"></path></svg>',
        '<svg width="18" height="18" class="picker-anchor-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z"></path></svg>'
      ],
      categorys: ['Frequently Used', 'Smileys & People', 'Animals & Nature', 'Food & Drink', 'Activity', 'Travel & Places', 'Objects', 'Symbols', 'Flags'],
      cats: {0: 'Smileys & People', 1: 'Animals & Nature', 2: 'Food & Drink', 3: 'Activity', 4: 'Travel & Places', 5: 'Objects', 6: 'Symbols', 7: 'Flags'},
      packsUsed:  [
        {name: '1f600', code:':grinning:'},
        {name: '1f606', code:':laughing:'},
        {name: '1f605', code:':sweat_smile:'},
        {name: '1f602', code:':joy:'},
        {name: '1f60d', code:':heart_eyes:'},
        {name: '1f618', code:':kissing_heart:'},
        {name: '1f61c', code:':stuck_out_tongue_winking_eye:'},
        {name: '1f631', code:':scream:'},
        {name: '1f44d', code:':thumbsup:'},
      ],

      scrollEventBlock: false
    }
  },
  created () {
    let cat = JSON.parse(localStorage.getItem('pickerUsed'))
    if (cat !== null) {
      this.packsUsed = cat
    }
    this.loadContent()
  },
  computed: {
    getCatHeight: function () {
      let height = []
      for (let i = 0; i < this.categorys.length; i++){
        height[i] = document.getElementsByClassName('picker-category')[i].offsetTop
      }

      return height
    }
  },
  methods: {
    loadContent: function () {
      this.axios.get('/api/emoji')
        .then((response) => {
          this.dataText = response.data.data.data
          this.loader = false
        })
    },
    getCatName: function(index) {
      return this.cats[index]
    },
    onScroll: function () {
      // e.preventDefault()
      if (this.scrollEventBlock === true) {
        return
      }
      const position = document.getElementById('pickerScroll').scrollTop
      const cats = this.getCatHeight
      // console.log('scroll position - ' + position)
      let cat = 0
      let isSet = false
      for (let i = 0; i < cats.length; i++){
        if (position < cats[i + 1]) {
          cat = i
          isSet = true
          break
        }
      }
      if (isSet === false) {
        cat = cats.length - 1
      }

      // console.log(cat)
      this.select = cat
    },
    clickAnchor: function (val){
      this.scrollEventBlock = true
      this.select = val
      let elem = document.getElementById('pickerScroll')
      let height = elem.scrollTop
      let attempt = 1
      let intS = 0
      let isDown = true
      let goTo = 0
      let self = this
      if (val > 0) {
        goTo = this.getCatHeight[val]
      }
      if (height > goTo) {
        isDown = false
      }
      // console.log(height)

      function scrollToEndPage () {
        if (height < goTo && isDown === true) {
          elem.scrollTo(0, height)
          attempt++
          height = height + attempt
        } else if (height > goTo && isDown === false) {
          elem.scrollTo(0, height)
          attempt++
          height = height - attempt
        } else {
          elem.scrollTo(0, goTo)
          clearInterval(intS)
          self.scrollEventBlock = false
        }
      }
      intS = setInterval(scrollToEndPage, 5)
    },
    clickPicker: function (e) {
      let id = null
      let name = null
      let src = null
      if (e.target.classList.contains('emoji-span') || e.target.classList.contains('emoji-img')) {
        id = e.target.getAttribute('data-id')
        name = e.target.getAttribute('data-name')
        src = e.target.getAttribute('src')

        this.selectEmoji(id, name, src)
      }
    },
    selectEmoji: function (value, name, src) {
      let isFind = false
      for (let i = 0; i < this.packsUsed.length; i++) {
        if (this.packsUsed[i].name === value) {
          let newPack = this.packsUsed
          newPack.unshift({name: value, code: name})
          newPack.splice(i + 1, 1)
          this.packsUsed = []
          this.packsUsed = newPack
          localStorage.setItem('pickerUsed', JSON.stringify(newPack))
          isFind = true
          break
        }
      }

      if (isFind === false) {
        let newPack = this.packsUsed
        newPack.unshift({name: value, code: name})
        newPack.pop()
        this.packsUsed = []
        this.packsUsed = newPack
        localStorage.setItem('pickerUsed', JSON.stringify(newPack))
      }

      this.$emit('select', {native: name, src: src})
    }
  }
}
</script>

<style>
  .picker-scroll span{
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 26px;
    height: 26px;
  }
  .picker-scroll img{
    width: 24px;
    height: 24px;
  }
  .picker-scroll span:hover {
    background-color: #848486;
    border-radius: 4px;
  }
</style>


<style scoped>
  .loader-block{
    color: #FFFC;
    font-weight: bold;
  }
  .picker-main{
    color: #222427;
    border: 1px solid #222427;
    border-radius: 6px 6px 0 0;
    background: #2c2e5f;
  }
  .picker-bar{
    border-bottom: 1px solid #222427;
  }
  .picker-anchors{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 6px;
    color: #858585;
    line-height: 0;
  }
  .picker-anchor{
    position: relative;
    padding: 12px 4px;
    transition: color .1s ease-out;
    display: block;
    flex: 1 1 auto;
    text-align: center;
    overflow: hidden;
    cursor: pointer;
  }

  .picket-anchor-bar{
    background-color: #FFF;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    display: none;
  }
  .picker-anchor:hover {
    color: #FFFC;
  }
  .picker-anchor.active {
    color: #FFF;
  }
  .picker-anchor.active .picket-anchor-bar{
    display: inline-block;
  }
  .picker-scroll{
    overflow-y: scroll;
    overflow-x: hidden;
    height: 270px;
    will-change: transform;
  }
  .picker-category-label{
    z-index: 2;
    position: relative;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .picker-category-label span{
    display: block;
    width: 100%;
    font-weight: 500;
    padding: 2px 6px;
    background-color: rgba(44, 46, 95, 0.7);
    color: #FFF;
  }
  .picker-emoji{
    position: relative;
    display: inline-block;
    font-size: 0;
    padding: 5px;
  }

</style>
