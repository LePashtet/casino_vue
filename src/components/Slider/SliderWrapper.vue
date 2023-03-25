<template>
  <div class="slider-wrp">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'SliderWrapper',
};
</script>

<style lang="scss">
.slider-wrp {
  position: relative;
}
</style>
