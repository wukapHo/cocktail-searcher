<template>
  <header class="container">
    <div class="header">
      <logo-icon class="header__logo" @click.stop="$router.push({ name: 'indexPage' })" />

      <input
        class="header__search"
        type="text"
        :placeholder="$t('main.search')"
        v-model="search"
        @click.stop="isActive = true"
      >

      <locale-switcher class="header__locale-switcher" />

      <div
        v-if="search && isActive"
        class="header__search-suggestion"
        @click.stop
      >
        <ul class="header__suggestion-list">
          <li
            v-for="item in searchResult"
            :key="item.id"
            class="header__suggestion-item"
            @click="goToPage(item)"
          >
            {{ $t(`cocktails.${item.id}.title`) }}
          </li>
        </ul>
        <p
          v-if="searchResult.length === 0"
          class="header__suggestion-item header__suggestion-item--disabled"
        >
          {{ $t('main.no-suggest') }}
        </p>
      </div>

      <nav class="header__nav">
        <ul v-if="$route.fullPath === '/'">
          <li
            v-for="(group, idx) in cocktailGroups"
            :key="idx"
            class="header__nav-item"
            @click="goToPage(group)"
          >
            {{ $t(`categories[${idx}]`) }}
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import LogoIcon from '@/assets/svg/logo.svg?inline';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';

export default {
  name: 'AppHeader',

  components: {
    LogoIcon,
    LocaleSwitcher,
  },

  data: () => ({
    search: '',
    suggestionCount: 6,
    isActive: false,
  }),

  computed: {
    normalizeSearch() {
      return this.search.toLowerCase();
    },

    searchResult() {
      if (!this.search) {
        return [];
      }

      let suggestionList = [...this.$store.state.cocktailList
        .filter((item) => item.title.toLowerCase().includes(this.normalizeSearch)
          || item['title-ru'].toLowerCase().includes(this.normalizeSearch))];

      if (suggestionList.length > this.suggestionCount) {
        suggestionList = suggestionList.slice(0, this.suggestionCount);
      }

      return suggestionList;
    },

    cocktailGroups() {
      const set = new Set();

      this.$store.state.cocktailList.forEach((item) => {
        set.add(item.subcategory);
      });

      return set;
    },
  },

  watch: {
    isActive() {
      if (this.isActive) {
        document.body.addEventListener('click', this.closeSuggestions);
      } else {
        document.body.removeEventListener('click', this.closeSuggestions);
      }
    },
  },

  methods: {
    closeSuggestions() {
      this.isActive = false;
    },

    goToPage(value) {
      if (value.id) {
        this.$router.push({ name: 'cocktailPage', params: { id: value.id } });
      } else {
        const normalizeValue = value.split(' ').map((item) => item.toLowerCase()).join('-');

        this.$router.push({ name: 'cocktailGroupPage', params: { title: normalizeValue } });
      }

      this.search = '';
    },
  },
};
</script>

<style lang="scss">
.header {
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  display: grid;
  align-content: start;
  padding-top: 0.675rem;
  gap: 0.375rem;
  grid-template-areas:
    "logo . switcher"
    "search search search"
    "search-output search-output search-output"
    "list list list";
  grid-template-columns: 13% auto 3rem;

  @media (min-width: $width-desk-s) {
    grid-template-areas:
      "logo search switcher"
      ". search-output ."
      ". list .";
    grid-template-columns: 6rem auto 2.875rem;
  }

  @media (min-width: $width-desk-l) {
    grid-template-columns: 6rem auto 4.375rem;
  }

  &__logo {
    grid-area: logo;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    fill: transparent;
    cursor: pointer;
    transition: 0.3s;

    @media (min-width: $width-tab) {
      width: 3.5rem;
      height: 3.5rem;
      padding: 0.125rem;
    }

    @media (min-width: $width-desk-l) {
      width: 4rem;
      height: 4rem;
    }

    &:hover {
      fill: rgba($color: $color-prim, $alpha: 0.6);
    }
  }

  &__search {
    grid-area: search;
    width: 100%;
    padding: 0 0.625rem;
    border: 0.125rem solid transparent;
    border-radius: 0.625rem;
    background-color: rgba($color: $color-prim, $alpha: 0.2);
    font-size: $font-mob;

    @media (min-width: $width-tab) {
      font-size: $font-tab;
    }

    @media (min-width: $width-desk-l) {
      font-size: 3.125rem;
    }

    &:focus {
      outline: 0.125rem solid $color-prim;
    }
  }

  &__locale-switcher {
    grid-area: switcher;
  }

  &__search-suggestion {
    grid-area: search-output;
    position: absolute;
    left: 0;
    top: 100%;
    right: 0;
    border-radius: 0.625rem;
    box-shadow: 0px 0.875rem 1.5rem rgba($color: $color-text, $alpha: 0.25);
    background-color: rgba($color: $color-prim, $alpha: 0.95);
    z-index: 10;
  }

  &__suggestion-item {
    padding: 0.625rem;
    border-radius: 0.625rem;
    font-size: calc($font-mob - 0.125rem);
    cursor: pointer;
    transition: 0.3s;

    @media (min-width: $width-tab) {
      font-size: calc($font-tab - 0.125rem);
    }

    @media (min-width: $width-desk-l) {
      font-size: $font-desk;
    }

    &:hover {
      background-color: rgba($color: $color-sec, $alpha: 0.5);
    }

    &--disabled {
      text-align: center;
      cursor: default;
      pointer-events: none;
    }
  }

  &__nav {
    grid-area: list;
  }

  &__nav-item {
    margin-top: 0.375rem;
    padding: 0 0.625rem;
    border-radius: 0.625rem;
    font-size: $font-mob;
    cursor: pointer;
    transition: 0.3s;

    @media (min-width: $width-tab) {
      font-size: $font-tab;
    }

    @media (min-width: $width-desk-l) {
      font-size: $font-desk;
    }

    &:hover {
      background-color: rgba($color: $color-sec, $alpha: 0.3);
    }
  }
}
</style>
