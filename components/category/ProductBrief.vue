<template>
  <div :class="$style.wrapper">
    <nuxt-link :to="`/product/${product.pSlug}`">
      <p>{{ product.pName }}</p>
      <div :class="$style['image-wrapper']">
        <img v-lazy="product.image.imgL" :class="$style.image" />
      </div>
    </nuxt-link>
    <p>Цена {{ product.pPrice }}</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56%;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  &[lazy='loading'] {
    object-fit: contain;
  }
}
</style>
