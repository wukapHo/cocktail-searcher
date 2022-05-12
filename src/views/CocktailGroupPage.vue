<template>
  <section v-if="currentGroup.length" class="cocktail-list">
    <div class="container">
      <h1 class="cocktail-list__title">
        {{ $t(`cocktails.${currentGroup[0].id}.subcategory`) }}
      </h1>

      <p class="cocktail-list__description">
        {{ $t(`main.${$route.params.title}`) }}
      </p>

      <ul class="cocktail-list__field">
        <li
          v-for="cocktail in currentGroup"
          :key="cocktail.id"
          class="cocktail-list__item"
          @click="$router.push({ name: 'cocktailPage', params: { id: cocktail.id } })"
        >
          <div class="cocktail-list__item-image">
            <picture>
              <source :srcset="cocktail.imageWebp" type="image/webp">
              <img :src="cocktail.image" :alt="cocktail.title" loading="lazy">
            </picture>
          </div>
          <div class="cocktail-list__item-title">
            {{ $t(`cocktails.${cocktail.id}.title`) }}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CocktailGroupPage',

  computed: {
    normalizeTitle() {
      return this.$route.params.title
        .split('-')
        .map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
        .join(' ');
    },

    currentGroup() {
      return this.$store.state.cocktailList
        .filter(({ subcategory }) => subcategory === this.normalizeTitle);
    },
  },

  created() {
    if (!this.currentGroup.length) {
      this.$router.push({ name: 'errorPage' });
    }
  },
};
</script>

<style lang="scss">
.cocktail-list {
  padding-bottom: 0.625rem;

  &__title {
    padding-left: 0.25rem;
    font-size: calc($font-mob + 0.25rem);

    @media (min-width: $width-tab) {
      font-size: calc($font-tab + 0.25rem);
    }
  }

  &__description {
    font-size: calc($font-mob - 0.25rem);
  }

  &__field {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.625rem;
    margin-top: 0.625rem;

    @media (min-width: $width-tab) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: $width-desk-s) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: $width-desk-l) {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  &__item {
    position: relative;
    border: 0.125rem solid $color-text;
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      border: 0.125rem solid $color-prim;
      color: $color-prim;
    }
  }

  &__item-image {
    position: relative;
    width: 100%;
    padding-top: 100%;

    img {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      object-fit: cover;
    }
  }

  &__item-title {
    padding: 0.25rem 0;
    color: inherit;
    font-size: $font-mob;
    font-weight: 700;

    @media (min-width: $width-tab) {
      font-size: $font-tab;
    }
  }
}
</style>
