<template>
  <app-header />
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'App',

  components: {
    AppHeader,
  },

  created() {
    this.loadCocktails();
  },

  methods: {
    ...mapActions({
      loadCocktails: 'fetchCocktailList',
    }),
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  color: $color-text;
  font-family: 'JetBrains Mono', monospace;
  text-decoration: none;

  scrollbar-width: thin;
  scrollbar-color: rgba($color: $color-prim, $alpha: 0.5) rgba($color: $color-prim, $alpha: 0.1);

  &::-webkit-scrollbar {
    width: 0.75rem;
  }

  &::-webkit-scrollbar-track {
    background: rgba($color: $color-prim, $alpha: 0.1);
    border-radius: 1.125rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba($color: $color-prim, $alpha: 0.3);
    border-radius: 1.125rem;
    border: 0.125rem solid rgba($color: $color-prim, $alpha: 0.35);
  }
}

body {
  min-height: 100vh;
}

.container {
  margin: 0 auto;
  padding: 0 0.625rem;
  width: 100%;

  @media (min-width: $width-desk-s) {
    max-width: $width-desk-s;
  }

  @media (min-width: $width-desk-l) {
    max-width: $width-desk-l;
  }
}
</style>
