<template>
  <div class="loader">


    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 30">
      <defs>
        <linearGradient id="a" x1="-10.68" y1="112.69" x2="-9.68" y2="112.69" gradientTransform="matrix(33.91, 0, 0, -29.74, 377.27, 3366.1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#014cff"/>
          <stop offset="1" stop-color="#4db2ff"/>
        </linearGradient>
        <linearGradient id="b" x1="-10.62" y1="111.36" x2="-9.62" y2="111.36" gradientTransform="matrix(28.65, 0, 0, -20.25, 334.81, 2275.18)" xlink:href="#a"/>
      </defs>

      <g class="coin">
        <path d="M7.78,10.2a12.07,12.07,0,0,0,3.54,16.69L24.47,6.66A12.06,12.06,0,0,0,7.78,10.2Z" style="fill:#f7931a"/>
        <path d="M11.12,12.37l-1.2-.78a9.53,9.53,0,0,0,2.79,13.17l.78-1.2A8.1,8.1,0,0,1,11.12,12.37Z" style="fill:#f3c100"/>
        <path d="M9.92,11.59l1.2.78A8.08,8.08,0,0,1,22.3,10l.78-1.2A9.52,9.52,0,0,0,9.92,11.59Z" style="fill:#e2790c"/>
      </g>

      <g class="stars">
        <path d="M2.11,6.09l1-1.82a.31.31,0,0,1,.42-.13.4.4,0,0,1,.13.13l1,1.82a.34.34,0,0,0,.12.12l1.82,1a.33.33,0,0,1,.13.43.37.37,0,0,1-.13.12l-1.82,1a.3.3,0,0,0-.12.13l-1,1.82a.32.32,0,0,1-.43.12.34.34,0,0,1-.12-.12l-1-1.82A.27.27,0,0,0,2,8.76l-1.82-1A.31.31,0,0,1,0,7.34a.3.3,0,0,1,.12-.13L2,6.21A.3.3,0,0,0,2.11,6.09Z" style="fill:#f7931a"/>
        <path d="M9.11,2.4l.55-1a.18.18,0,0,1,.24-.06A.12.12,0,0,1,10,1.4l.55,1a.16.16,0,0,0,.07.07l1,.55a.16.16,0,0,1,.06.23s0,0-.06.07l-1,.54a.16.16,0,0,0-.07.07l-.55,1A.17.17,0,0,1,9.73,5a.23.23,0,0,1-.07-.07l-.55-1a.13.13,0,0,0-.06-.07l-1-.54A.17.17,0,0,1,8,3.08.13.13,0,0,1,8.05,3l1-.55A.13.13,0,0,0,9.11,2.4Z" style="fill:#f3c100"/>
      </g>

      <g class="icon-left">
        <path d="M15.24,28.31l.91-1.45.2-.31.12-.2c1.1-1.75,2.25-3.55,3.38-5.33,2.63-4.12,5.23-8.17,7.35-11.39l.29-.44.29-.43,1-1.47a48.29,48.29,0,0,1,3-4.22l.21-.2C33.59,1.31,36.93.27,39.14,0c-.94,0-1.81,0-2.42,0a10.29,10.29,0,0,0-7,2.86l-.21.2a48.29,48.29,0,0,0-3,4.22l-1,1.47-.29.43-.29.44C22.76,12.85,20.16,16.9,17.53,21l-3.38,5.33-.12.2-.2.31-.92,1.45,0,0a11.21,11.21,0,0,0,5.64,1.42h2.32a11.23,11.23,0,0,1-5.64-1.42Z" style="fill:#133b8c"/>
        <polyline points="21.7 29.72 28.88 29.56 44.68 8.73 41.84 2.54 32.76 5.33" style="fill:#fff"/>
        <path d="M38.53,9.91a2,2,0,1,0-2-2A2,2,0,0,0,38.53,9.91Z" style="fill:#2e88ff"/>
        <path d="M39,0a10.19,10.19,0,0,0-7,2.86l-.21.21a48.14,48.14,0,0,0-3,4.21l-1,1.47-.29.44-.29.44c-2.12,3.22-4.72,7.27-7.35,11.39l-3.38,5.32-.12.2-.2.32-.91,1.44,0,0a11.23,11.23,0,0,0,5.64,1.42h2.48l12-18.34.61-.94a3.67,3.67,0,1,1,2.56,1,3.36,3.36,0,0,1-1.13-.2l-.07,0-12,18.4H36.49L49.15,9.5A10.13,10.13,0,0,0,39,0Z" style="fill:url(#a)"/>
      </g>

      <g class="icon-right">
        <path d="M28.33,29.75H30.7L37,20.05l2.7-4.15.37-.58,1.33-2a7.92,7.92,0,0,1,1-1.1,10.66,10.66,0,0,1,1.23-1,10.27,10.27,0,0,1,4-1.59l1.75-.13c-1.1,0-1.69,0-2.48,0h-.15a9.5,9.5,0,0,0-1.5.13,10.12,10.12,0,0,0-4,1.59,12.89,12.89,0,0,0-1.23,1,5.77,5.77,0,0,0-1.09,1.2" style="fill:#133b8c"/>
        <polygon points="56.14 14.52 43.23 14.52 36.09 29.75 42.4 29.75 56.14 24.29 56.14 14.52" style="fill:#fff"/>
        <path d="M51.15,21.44a2,2,0,1,0-2-2A2,2,0,0,0,51.15,21.44Z" style="fill:#2e88ff"/>
        <path d="M39.69,15.9,37,20.05l-6.28,9.7h6.35l6.17-9.54,1.05-1.62h3.31A3.65,3.65,0,0,1,50,16a3.42,3.42,0,0,1,1.19-.2,3.65,3.65,0,0,1,0,7.3,3.2,3.2,0,0,1-1.19-.2,3.65,3.65,0,0,1-2.37-2.64H45.15L39,29.75H49.42A10.13,10.13,0,0,0,49.29,9.5h-.15a8.42,8.42,0,0,0-1,.07c-.17,0-.33,0-.49.06a10.12,10.12,0,0,0-4,1.59,12.89,12.89,0,0,0-1.23,1,7.6,7.6,0,0,0-1,1.15" style="fill:url(#b)"/>
      </g>

    </svg>

  </div>
</template>

<script>
  export default {
    name: 'Loader'
  }
</script>

<style lang="scss" scoped>
  .loader {
    padding: 20px;
    max-width: 600px;
    max-height: 300px;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  .stars {
    animation: logo-move-4 1.3s infinite forwards linear;
  }
  .coin {
    animation: logo-move-3 1.3s infinite forwards linear;
  }
  .icon-left {
    animation: logo-move-2 1.3s infinite forwards linear;
  }
  .icon-right {
    animation: logo-move-1 1.3s infinite forwards linear;
  }
  @keyframes logo-move-1 {
    0% {
      visibility: hidden;
      opacity: .4;
      transform: scale(0.5) translateY(100%) translateX(40%);
    }
    50% {
      visibility: visible;
      opacity: 1;
      transform: none;
    }
    100% { transform: none;}
  }
  @keyframes logo-move-2 {
    0%,20% {
      visibility: hidden;
      opacity: .1;
      transform: scale(0.5) translateY(100%) translateX(60%);
    }
    80% {
      visibility: visible;
      opacity: 1;
      transform: none;
    }
    100% { transform: none;}
  }
  @keyframes logo-move-3 {
    0% {
      visibility: hidden;
      opacity: 0;
      transform: scale(0.5) translateY(100%) translateX(60%);
    }
    50% {
      visibility: hidden;
      opacity: 0;
      transform: scale(0.5) translateY(100%) translateX(60%);
    }
    80% {
      visibility: visible;
      opacity: 1;
      transform: none;
    }
    100% { transform: none;}
  }
  @keyframes logo-move-4 {

    0%, 70% {
      visibility: hidden;
      opacity: 0;
      transform: scale(0.5)
    }
    80% {
      visibility: visible;
      opacity: 1;
      transform: scale(1)
    }
    100% { transform: none;}
  }
</style>
