const modulePtcAds = {
  state: {
    ptcBlock: false,
    ptcHash: undefined,
    ptcLink: undefined,
    ptcDuration: undefined,
  },
  getters: {
    isAdsFrame: state => state.ptcBlock,
    getPtcParams: state => {
      return {hash: state.pctHash, link: state.ptcLink, duration: state.ptcDuration}
    }
  },
  mutations: {
    openPtcAdsFrame: (state, {hash, link, duration}) => {
      state.ptcBlock = true
      state.pctHash = hash
      state.ptcLink = link
      state.ptcDuration = duration
    },
    closePtcAdsFrame: state => {
      state.ptcBlock = false
      state.pctHash = undefined
      state.ptcLink = undefined
      state.ptcDuration = undefined
    }
  }

}
export default modulePtcAds
