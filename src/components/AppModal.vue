<template>
  <div class="modal" :class="{ 'modal--gradient': gradient }">
    <picture v-if="item.image">
      <source :srcset="item.imageWebp" type="image/webp">
      <img :src="item.image" :alt="item.title">
    </picture>
  </div>
</template>

<script>
export default {
  name: 'AppModal',

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },

    gradient: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.modal {
  z-index: 50;
  position: absolute;
  top: 0;
  width: 50vw;
  height: 100vw;
  border-radius: 1.5rem;

  &--gradient {
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
</style>
