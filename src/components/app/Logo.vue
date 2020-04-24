<script>
import LogoImage from '@/assets/logo.svg'

export default {
  name: 'Logo',
  components: {
    LogoImage,
  },
}
</script>

<template>
  <router-link
    :to="{ name: 'Posts' }"
    class="logo"
  >
    <logo-image class="logo__image" />
  </router-link>
</template>

<style lang="scss">
.logo {
  display: block;
  padding: rem(22px);

  @include mq($from: 768px) {
    padding: rem(58px 0);
  }

  .modal & {
    padding: 0;
  }

  &__image {
    width: rem(28px);
    height: rem(28px);
    color: var(--primary-color);
  }
}
</style>
