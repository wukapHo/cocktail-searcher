<template>
  <section v-if="currentCocktail" class="cocktail">
    <div class="container">
      <div class="cocktail__wrapper">
        <div class="cocktail__image">
          <h1 class="cocktail__title">
            {{ $t(`cocktails.${currentCocktail.id}.title`) }}
          </h1>
          <picture>
            <source :srcset="currentCocktail.imageWebp" type="image/webp">
            <img :src="currentCocktail.image" :alt="currentCocktail.title">
          </picture>
          <div class="cocktail__modal-opener" @click.stop="toggleModal" />
        </div>

        <transition name="open">
          <image-modal
            v-if="isOpen"
            :item="currentCocktail"
            :gradient="true"
          />
        </transition>

        <p class="cocktail__title cocktail__title--mob">
          {{ $t(`cocktails.${currentCocktail.id}.title`) }}
        </p>

        <div class="cocktail__recipe">
          <p class="cocktail__subtitle">
            {{ $t(`main.ingredients`) }}
          </p>
          <ul>
            <li
              v-for="(ingredient, idx) in ingredients"
              :key="idx"
              class="cocktail__description"
            >
              {{ $t(`cocktails.${currentCocktail.id}.ingredients[${idx}]`) }}
            </li>
          </ul>
          <p class="cocktail__subtitle">
            {{ $t('main.method') }}
          </p>
          <p class="cocktail__description">
            {{ $t(`cocktails.${currentCocktail.id}.method`) }}
          </p>
          <p class="cocktail__subtitle">
            {{ $t('main.garnish') }}
          </p>
          <p class="cocktail__description">
            {{ $t(`cocktails.${currentCocktail.id}.garnish`) }}
          </p>
        </div>

        <div class="cocktail__buttons-area">
          <button
            class="cocktail__button cocktail__button--prev"
            @click="goTo('prev')"
          >
            {{ $t('main.prev') }}
          </button>
          <button
            class="cocktail__button cocktail__button--next"
            @click="goTo('next')"
          >
            {{ $t('main.next') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ImageModal from '@/components/ImageModal.vue';

export default {
  name: 'CocktailPage',

  components: {
    ImageModal,
  },

  data: () => ({
    isOpen: false,
  }),

  computed: {
    currentCocktail() {
      return this.$store.state.cocktailList.find(({ id }) => id === this.$route.params.id);
    },

    ingredients() {
      return this.currentCocktail.ingredients;
    },
  },

  created() {
    if (!this.currentCocktail) {
      this.$router.push({ name: 'errorPage' });
    }
  },

  watch: {
    isOpen() {
      if (this.isOpen) {
        document.body.addEventListener('click', this.toggleModal);
      } else {
        document.body.removeEventListener('click', this.toggleModal);
      }
    },
  },

  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },

    goTo(target) {
      let targetIndex;
      const { cocktailList } = this.$store.state;

      if (target === 'next') {
        targetIndex = cocktailList.indexOf(this.currentCocktail) + 1;
        targetIndex = targetIndex >= cocktailList.length ? 0 : targetIndex;
      } else if (target === 'prev') {
        targetIndex = cocktailList.indexOf(this.currentCocktail) - 1;
        targetIndex = targetIndex < 0 ? cocktailList.length - 1 : targetIndex;
      }

      this.$router.push({ name: 'cocktailPage', params: { id: cocktailList[targetIndex].id } });
    },
  },
};
</script>

<style lang="scss">
.cocktail {
  width: 100%;
  padding-bottom: 0.625rem;

  &__wrapper {
    position: relative;

    @media (min-width: $width-tab) {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
  }

  &__image {
    position: relative;
    width: 4rem;
    padding-top: 6rem;
    border-radius: 1.5rem;
    cursor: pointer;
    transition: 0.3s;

    @media (min-width: $width-tab) {
      width: 35%;
      padding-top: 60%;
    }

    @media (min-width: $width-desk-l) {
      width: 30%;
      padding-top: 55%;
    }

    &:hover {
      outline: 0.125rem solid $color-prim;

      @media (min-width: $width-tab) {
        outline: none;
        cursor: default;
      }
    }

    &::before {
      content: "";
      z-index: 1;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      border-radius: 1.5rem;
      background: linear-gradient(to bottom right,#ffffff00 50%,$color-prim 100%);
    }

    img {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      border-radius: 1.5rem;
      object-fit: cover;
    }
  }

  &__modal-opener {
    z-index: 40;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 1.5rem;

    @media (min-width: $width-tab) {
      display: none;
    }
  }

  &__title {
    z-index: 1;
    display: none;
    position: absolute;
    color: $color-light;
    font-size: $font-mob;

    @media (min-width: $width-tab) {
      display: block;
      bottom: 0.625rem;
      right: 1rem;
      font-size: $font-tab;
      text-align: right;
    }

    @media (min-width: $width-desk-s) {
      bottom: 1rem;
      right: 1.5rem;
    }

    @media (min-width: $width-desk-l) {
      bottom: 2rem;
      right: 2.5rem;
    }

    &--mob {
      z-index: 0;
      display: block;
      top: 1rem;
      right: 0;
      color: $color-text;
      font-size: calc($font-mob + 0.125rem);

      @media (min-width: $width-tab) {
        display: none;
      }
    }
  }

  &__recipe {
    position: relative;
    padding-bottom: 3rem;
    overflow-y: auto;

    @media (min-width: $width-tab) {
      position: absolute;
      top: 0;
      right: 0;
      width: 60%;
      height: 90%;
      padding-bottom: 0;
    }
  }

  &__subtitle {
    margin: 0.5rem 0;
    font-size: $font-mob;
    text-transform: uppercase;
    text-decoration: underline;

    @media (min-width: $width-tab) {
      font-size: $font-tab;
    }
  }

  &__description {
    font-size: calc($font-mob - 0.375rem);

    @media (min-width: $width-tab) {
      font-size: calc($font-tab - 0.25rem);
    }
  }

  &__buttons-area {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: $width-tab) {
      width: 60%;
    }
  }

  &__button {
    padding: 0.125rem 0.375rem;
    border-radius: 0.625rem;
    border: 0.125rem solid rgba($color: $color-prim, $alpha: 0.5);
    outline: none;
    background-color: transparent;
    font-size: $font-mob;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: rgba($color: $color-prim, $alpha: 0.5);
    }

    &:active {
      border: 0.125rem solid $color-prim;
    }
  }
}

.open-enter-active,
.open-leave-active {
  transition: 0.5s;
}

.open-enter-to,
.open-leave-from {
  opacity: 1;
}

.open-enter-from,
.open-leave-to {
  opacity: 0;
  transform: scale(0.5) translate(-50%, -50%);
}
</style>
