<template>
  <div class="slider_dots-wrp">
    <div  class="slider-dots">
      <div v-for="item in pages" :key="item" :class="{active:item-1 === current}"></div>
    </div>
  </div>
</template>

<script>
export default {
name: "SliderDots",
  props: {
    pages: Number,
    current: Number
  }
}
</script>

<style scoped lang="scss">
.slider-dots {
  margin-right: 50px;
  display: flex;
> div {
  margin: 0 5px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background-color: #6C4365;
  cursor: pointer;
  transition: .3s ease;
&.active, &:hover {
             background-color: $color-red;
           }
}
}
</style>
