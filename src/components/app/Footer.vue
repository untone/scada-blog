<script>
export default {
  name: 'Footer',
}
</script>

<template>
  <footer
    v-show="this.$route.meta.page !== '404'"
    class="footer"
  >
    <small class="footer__copy">&copy; 2020</small>
  </footer>
</template>

<style lang="scss">
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: rem(85px);
  background-color: var(--white-color);

  @include mq($from: tablet) {
    margin: rem(0 calc(-1 * var(--app-margin)));
  }

  &__copy {
    @include sans-serif;
    font-size: rem(18px);
    color: var(--text-color-alt);
  }
}
</style>
