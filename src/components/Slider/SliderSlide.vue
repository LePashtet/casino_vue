<template>
  <transition :name="transition">
    <div
      v-show="active"
      class="slider_slide"
    >
      <slot/>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SliderSlide',
  data() {
    return {
      active: false,
      transition: '',
    };
  },
  methods: {
    // Deactivate and hide the slide and
    // also activate the correct transition.
    hide(direction) {
      this.transition = `slider_slide--transition-${direction}`;
      this.active = false;
    },
    // Activate and show the slide and
    // also activate the correct transition.
    show(direction) {
      this.transition = `slider_slide--transition-${direction}`;
      this.active = true;
    },
  },
};
</script>

<style lang="scss">
.slider_slide--transition-left-enter-active,
.slider_slide--transition-left-leave-active,
.slider_slide--transition-right-enter-active,
.slider_slide--transition-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slider_slide--transition-left-leave-active,
.slider_slide--transition-right-leave-active {
  top: 0;
  position: absolute;
}

.slider_slide--transition-left-enter,
.slider_slide--transition-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slider_slide--transition-left-leave-active,
.slider_slide--transition-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
