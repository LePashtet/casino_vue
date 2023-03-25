module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API,
        ws: true,
        changeOrigin: true
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~@/styles/global/_variables.scss";
          @import "~@/styles/global/_mixins.scss";
        `
      }
    }
  },

  productionSourceMap: false,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
