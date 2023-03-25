<template>
    <select :style="{color: color}" v-model="$i18n.locale">
      <option  v-for="(item, key) in langs" :key="key" :value="item.val">
        {{ item.item }}
      </option>
    </select>
</template>

<script>
export default {
  name: "LanguageSelector",
  props: {
    langs: {
      type: Array,
      default: function () {
        return [{
          item: 'English',
          val: 'en'
        }, {
          item: 'Русский',
          val: 'ru'
        },
          {
            item: 'Українська',
            val: 'ua'
          }]
      }
    },
    color: {
      type: String,
      default: '#fffff'
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
select {
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #FFF;
  margin-right: 20px;
  min-width: 35px;
  height: 35px;
  box-sizing: border-box;
  border: none;
  border-radius: .5em;
  appearance: none;
  background-color: #2B2D5E;
  transition: .3s ease;
  cursor: pointer;
  text-align-last:center;

  &:hover, &:active {
    box-shadow: 0 0 0 1px #fe7475;
  }
}
</style>
