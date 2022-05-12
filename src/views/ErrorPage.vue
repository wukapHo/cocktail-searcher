<template>
  <section class="error">
    <h2 class="error__message">
      {{ $t('main.error') }}
    </h2>
    <button
      class="error__button"
      @click="$router.push({ name: 'indexPage' })"
    >
      {{ $t('main.back') }}
    </button>
  </section>
</template>

<script>
export default {
  name: 'ErrorPage',
};
</script>

<style lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__message {
    margin-top: 2rem;
    font-size: $font-mob;

    @media (min-width: $width-tab) {
      margin-top: 4rem;
      font-size: $font-tab;
    }

    @media(min-width: $width-desk-l) {
      font-size: $font-desk;
    }
  }

  &__button {
    margin-top: 3.5rem;
    padding: 0.375rem 0.625rem;
    border: 0.125rem solid rgba($color: $color-prim, $alpha: 0.5);
    outline: none;
    border-radius: 0.625rem;
    background-color: transparent;
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
</style>
