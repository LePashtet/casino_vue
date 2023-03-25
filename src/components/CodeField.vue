<template>
  <div class="style-input">
    <div class="code-2fa" :class="{'is-danger': error, shake: error}">

      <div class="input-2fa">
        <input class="input" type="text" maxlength="6" v-on:input.prevent="nextCode(1, $event)" v-model="code[0]" :disabled="loader">
        <input class="input" type="text" maxlength="1" v-on:input.prevent="nextCode(2, $event)" v-model="code[1]" :disabled="loader">
        <input class="input" type="text" maxlength="1" v-on:input.prevent="nextCode(3, $event)" v-model="code[2]" :disabled="loader">
        <input class="input" type="text" maxlength="1" v-on:input.prevent="nextCode(4, $event)" v-model="code[3]" :disabled="loader">
        <input class="input" type="text" maxlength="1" v-on:input.prevent="nextCode(5, $event)" v-model="code[4]" :disabled="loader">
        <input class="input" type="text" maxlength="1" v-on:input.prevent="nextCode(6, $event)" v-model="code[5]" :disabled="loader">
      </div>
      <p class="help is-danger">{{error}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CodeField",
    props: ['codeError', 'codeLoader'],
    data() {
      return {
        error: '',
        code: new Array(6),
        loader: false
      }
    },
    watch: {
      codeError: function(newVal) {
        this.error = newVal
      },
      codeLoader: function(newVal) {
        this.loader = newVal
      }
    },
    methods: {
      nextCode: function (num, event) {
        this.error = ''

        if (event.target.value !== undefined && event.target.value !== '') {
          if (this.isNumeric(event.target.value) === false) {
            event.target.value = ''
            return
          }

          // enter with ctrl+c
          if (num === 1 && event.target.value.length === 6) {

            let val = event.target.value
            event.target.value = val[0]
            this.code[0] = val[0]

            let elem = event.target
            for (let i=1; i<6; i++){
              elem = elem.nextElementSibling
              elem.value = val[i]

              this.code[i] = val[i]
            }
            this.finishNum()
            return
          }
          if (num === 6) {
            this.finishNum()
            return
          }
          event.target.nextElementSibling.focus()
          return
        }
        if (event.target.value !== undefined && event.target.value === '') {
          if (event.target.previousElementSibling !== null) {
            event.target.previousElementSibling.focus()
            event.target.previousElementSibling.select()
            event.target.previousElementSibling.setSelectionRange(0, 99)
          }
        }
      },
      isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
      },
      finishNum: function(){
        let value = ''
        for (let i = 0; i < this.code.length; i++) { value += this.code[i] }

        this.$emit('code', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .code-2fa.is-danger .input {
    border-color: #ff3860;
  }
  .input-2fa .input {
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 30px;
    line-height: 0.8;
    margin: 0 3px;
    text-align: center;
    &:first-of-type {
      margin-left: 0;
    }
  }

  .code-2fa .input-2fa {
    display: flex;
    justify-content: flex-start;
  }
  .code-2fa .help.is-danger {
    color: $color-red;
    margin: 0;
    padding-left: 10px;
    font-size: 12px;
  }
</style>
