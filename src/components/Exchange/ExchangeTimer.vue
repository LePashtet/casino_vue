<template>
  <div class="exchange-timer">
    <svg :width="(size + (margin * 2))" :height="(size + (margin * 2))" class="timer-loader">
      <g :transform="`translate(${margin} ${margin})`">
        <g :transform="`translate(${size / 2} ${size / 2})`">
          <g>
            <g class="seconds">
              <path
                v-for="i in 60"
                :key="i"
                stroke="#FF7475"
                stroke-width="4px"
                stroke-linecap="square"
                fill="none"
                :class="{current: i === seconds + 1}"
                :d="`M 0 -${spread} v -${size/10}`"
                :transform="`rotate(${i * 360 / 60})`"
              />
            </g>
            <path stroke="none" fill="#FF7475" :d="`M 0 -${spread - 5} l 3.4 5 h -7 Z`" :transform="`rotate(${(seconds + 1) * 360 / 60 + (360 * turn)})`" />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'ExchageTimer',
    data() {
      return {

        turn: 0,
        size: 25,
        margin: 2,
        seconds: 0,
        interval: null,

      }
    },
    computed: {
      spread: function() {
        return this.size / 2.7
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    created() {
      this.interval = setInterval(() => {

        if (this.seconds === 59) {
          this.seconds = 0
        } else {
          this.seconds++
        }

      }, 1000);

    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .timer-loader {
    g.seconds path {
      opacity: 0.2;
      transition: 5s linear all;
    }
    g.seconds path.current {
      opacity: 1;
      stroke-width: 3px;
      transition: 1s linear all;
    }
  }
</style>

<style lang="scss" scoped>
  .exchange-timer {
    display: flex;
  }
</style>
