module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'ru',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/_variables.scss";',
      },
    },
  },
};
