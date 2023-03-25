<template>
  <div id="tridiv">
    <div class="scene" ref="coin">
      <div class="shape cylinder-1 cyl-1">
        <div class="face bm">
          <img src="@/assets/coin_btc.svg" alt="Bitcoin">
        </div>
        <div class="face tp"></div>
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
        <div class="face side s3"></div>
        <div class="face side s4"></div>
        <div class="face side s5"></div>
        <div class="face side s6"></div>
        <div class="face side s7"></div>
        <div class="face side s8"></div>
        <div class="face side s9"></div>
        <div class="face side s10"></div>
        <div class="face side s11"></div>
        <div class="face side s12"></div>
        <div class="face side s13"></div>
        <div class="face side s14"></div>
        <div class="face side s15"></div>
        <div class="face side s16"></div>
        <div class="face side s17"></div>
        <div class="face side s18"></div>
        <div class="face side s19"></div>
      </div>
      <div class="shape cylinder-2 cyl-2">
        <div class="face bm"></div>
        <div class="face tp">
          <img src="@/assets/coin_ef.svg" alt="Ethereum">
        </div>
        <div class="face side s0"></div>
        <div class="face side s1"></div>
        <div class="face side s2"></div>
        <div class="face side s3"></div>
        <div class="face side s4"></div>
        <div class="face side s5"></div>
        <div class="face side s6"></div>
        <div class="face side s7"></div>
        <div class="face side s8"></div>
        <div class="face side s9"></div>
        <div class="face side s10"></div>
        <div class="face side s11"></div>
        <div class="face side s12"></div>
        <div class="face side s13"></div>
        <div class="face side s14"></div>
        <div class="face side s15"></div>
        <div class="face side s16"></div>
        <div class="face side s17"></div>
        <div class="face side s18"></div>
        <div class="face side s19"></div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "CoinflipCoin",
  props: {
    win: String
  },
  data() {
    return {
      heads: false,
      tails: false,
    }
  },
  methods: {
    flipEth() {
      const targets = this.$refs.coin;
      anime.timeline({
        duration: 1500,
      }).add({
        targets,
        easing: "easeOutCubic",
        rotateY: 810,
        scale: 2,
      })
        .add({
          targets,
          easing: "linear",
          rotateY: 910,
          duration: 1000,
        }, '-=280')
        .add({
          targets,
          easing: "easeInCubic",
          rotateY: 1980,
          rotateZ: function() { return anime.random(-360, 360) },
          rotateX: function() { return anime.random(-30, 30) },
          translateX: function() { return anime.random(-20, 20) },
          // translateY: function() { return anime.random(-20, 20) },
          scale: 1,
          complete: () => {
           this.$emit('flipped');
          }
        }, '-=280')
    },
    flipBtc() {
      const targets = this.$refs.coin;
      anime.timeline({
        duration: 1500,

      }).add({
        targets,
        easing: "easeOutCubic",
        rotateY: 810,
        scale: 2,
      })
        .add({
          targets,
          easing: "linear",
          rotateY: 910,
          duration: 1000
        }, '-=280')
        .add({
          targets,
          easing: "easeInCubic",
          rotateY: 1800,
          scale: 1,
          rotateZ: function() { return anime.random(-360, 360) },
          rotateX: function() { return anime.random(-30, 30) },
          translateX: function() { return anime.random(-20, 20) },
          // translateY: function() { return anime.random(-20, 20) },
          complete: () => {
            this.$emit('flipped');
          }
        }, '-=280')
    }
  },
  mounted() {
    if (this.win === 'eth') {
      this.flipEth();
    } else {
      this.flipBtc();
    }
  },
}
</script>

<style scoped lang="scss">
/* /!\ You need to add vendor prefixes in order to render the CSS properly (or simply use http://leaverou.github.io/prefixfree/) /!\ */
#tridiv {
  perspective: 800px;
  position: absolute;
  height: 300px;
  font-size: 100%;
  z-index: 5;
  overflow: hidden;
  pointer-events: none;
}

.scene, .shape, .face, .face-wrapper, .cr {
  position: absolute;
  transform-style: preserve-3d;
}

.scene {
  width: 80em;
  height: 80em;
  top: 50%;
  left: 50%;
  margin: -40em 0 0 -40em;
  z-index: 20;
}

.shape {
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-origin: 50%;

  & > .heads {
    -webkit-animation: flipHeads 3s ease-out forwards;
    -moz-animation: flipHeads 3s ease-out forwards;
    -o-animation: flipHeads 3s ease-out forwards;
    animation: flipHeads 3s ease-out forwards;
  }

  & > .tails {
    -webkit-animation: flipTails 3s ease-out forwards;
    -moz-animation: flipTails 3s ease-out forwards;
    -o-animation: flipTails 3s ease-out forwards;
    animation: flipTails 3s ease-out forwards;
  }


  @-webkit-keyframes flipHeads {
    from {
      -webkit-transform: rotateY(0);
      -moz-transform: rotateY(0);
      transform: rotateY(0);

    }
    50% {
      -webkit-transform: rotateY(990deg) scale(3);
      -moz-transform: rotateY(990deg) scale(3);
      transform: rotateY(990deg) scale(3);
    }
    to {
      -webkit-transform: rotateY(1980deg) scale(1);
      -moz-transform: rotateY(1980deg) scale(1);
      transform: rotateY(1980deg) scale(1);
    }
  }
  @-webkit-keyframes flipTails {
    from {
      -webkit-transform: rotateX(0);
      -moz-transform: rotateX(0);
      transform: rotateX(0);

    }
    50% {
      -webkit-transform: rotateX(990deg) scale(3);
      -moz-transform: rotateX(990deg) scale(3);
      transform: rotateX(990deg) scale(3);
    }
    to {
      -webkit-transform: rotateX(1980deg) scale(1);
      -moz-transform: rotateX(1980deg) scale(1);
      transform: rotateX(1980deg) scale(1);
    }
  }
}

.face, .face-wrapper {
  overflow: hidden;
  transform-origin: 0 0;
  backface-visibility: hidden;
  /* hidden by default, prevent blinking and other weird rendering glitchs */
}

.face {
  background-size: 100% 100% !important;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.face > img {
  width: 50px;
  height: 50px;
}

.face-wrapper .face {
  left: 100%;
  width: 100%;
  height: 100%
}

.photon-shader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%
}

.side {
  left: 50%;
}

.cr, .cr .side {
  height: 100%;
}

[class*="cylinder"] .tp {
  transform: rotateX(90deg) translateY(-50%);
}

[class*="cylinder"] .bm {
  transform: rotateX(-90deg) translateY(-50%);
}

[class*="cylinder"] .tp, [class*="cylinder"] .bm, [class*="cylinder"] .tp .photon-shader, [class*="cylinder"] .bm .photon-shader {
  border-radius: 50%;
}

[class*="cylinder"] .bm {
  top: 100%;
}

/* .cyl-1 styles */
.cyl-1 {
  transform: translate3D(0em, 0em, 0em) rotateX(90deg) rotateY(0deg) rotateZ(0deg);
  opacity:1;
  width:3em;
  height:0.24em;
  margin:-0.12em 0 0 -1.5em;
}
.cyl-1 .tp, .cyl-1 .bm {
  width:3em;
  height:3em;
}
.cyl-1 .side {
  width:0.5001533209736089em;
  height:0.24em;
}
.cyl-1 .s0 {
  transform: rotateY(9deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s1 {
  transform: rotateY(27deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s2 {
  transform: rotateY(45deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s3 {
  transform: rotateY(63deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s4 {
  transform: rotateY(81deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s5 {
  transform: rotateY(99deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s6 {
  transform: rotateY(117deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s7 {
  transform: rotateY(135deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s8 {
  transform: rotateY(153deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s9 {
  transform: rotateY(171deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s10 {
  transform: rotateY(189deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s11 {
  transform: rotateY(207deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s12 {
  transform: rotateY(225deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s13 {
  transform: rotateY(243deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s14 {
  transform: rotateY(261deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s15 {
  transform: rotateY(279deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s16 {
  transform: rotateY(297deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s17 {
  transform: rotateY(315deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s18 {
  transform: rotateY(333deg) translate3D(-50%, 0, 1.475em);
}
.cyl-1 .s19 {
  transform: rotateY(351deg) translate3D(-50%, 0, 1.475em);
}
//.cyl-1 .face, .cyl-1 .side {
//  background-color: #FFFFFF;
//}
.cyl-1 .bm {
  background-color:#FF7475;
}
.cyl-1 .side {
  background-color:#6C4365;
}
/* .cyl-2 styles */
.cyl-2 {
  transform:translate3D(0em, 0, -0.24em) rotateX(90deg) rotateY(0deg) rotateZ(0deg);
  opacity:1;
  width:3em;
  height:0.25em;
  margin:-0.125em 0 0 -1.5em;
}
.cyl-2 .tp, .cyl-2 .bm {
  width:3em;
  height:3em;
}
.cyl-2 .side {
  width:0.5001533209736089em;
  height:0.25em;
}
.cyl-2 .s0 {
  transform: rotateY(9deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s1 {
  transform: rotateY(27deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s2 {
  transform: rotateY(45deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s3 {
  transform: rotateY(63deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s4 {
  transform: rotateY(81deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s5 {
  transform: rotateY(99deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s6 {
  transform: rotateY(117deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s7 {
  transform: rotateY(135deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s8 {
  transform: rotateY(153deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s9 {
  transform: rotateY(171deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s10 {
  transform: rotateY(189deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s11 {
  transform: rotateY(207deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s12 {
  transform: rotateY(225deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s13 {
  transform: rotateY(243deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s14 {
  transform: rotateY(261deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s15 {
  transform: rotateY(279deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s16 {
  transform: rotateY(297deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s17 {
  transform: rotateY(315deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s18 {
  transform: rotateY(333deg) translate3D(-50%, 0, 1.475em);
}
.cyl-2 .s19 {
  transform: rotateY(351deg) translate3D(-50%, 0, 1.475em);
}
//.cyl-2 .face, .cyl-2 .side {
//  background-color:#FFFFFF;
//}
.cyl-2 .tp {
  background-color:#8B8ECE;
}
.cyl-2 .side {
  background-color:#424475;
}
</style>
