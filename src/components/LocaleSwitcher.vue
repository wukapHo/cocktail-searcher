<template>
  <button class="switcher" @click.stop="switchLocale()">
    {{ locales[currentLocale] }}
  </button>
</template>

<script>
export default {
  name: 'LocaleSwitcher',

  data: () => ({
    locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALES.split(','),
    currentLocale: 0,
  }),

  created() {
    this.currentLocale = localStorage.getItem('currentLocale');

    if (this.currentLocale) {
      this.$i18n.locale = this.locales[this.currentLocale];
    } else {
      this.currentLocale = 0;
    }
  },

  methods: {
    switchLocale() {
      if (this.currentLocale < this.locales.length - 1) {
        this.currentLocale += 1;
      } else {
        this.currentLocale = 0;
      }

      this.$i18n.locale = this.locales[this.currentLocale];

      localStorage.setItem('currentLocale', this.currentLocale);
    },
  },
};
</script>

<style lang="scss">
.switcher {
  display: inline-block;
  align-items: center;
  justify-content: center;
  padding: 0.125rem;
  border: 0.125rem solid transparent;
  border-radius: 0.625rem;
  background-color: transparent;
  font-size: $font-mob;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;

  @media (min-width: $width-tab) {
    font-size: $font-tab;
  }

  @media (min-width: $width-desk-l) {
    font-size: $font-desk;
  }

  &:hover {
    background-color: rgba($color: $color-prim, $alpha: 0.2);
  }

  &:active {
    border: 0.125rem solid $color-prim;
  }
}
</style>
