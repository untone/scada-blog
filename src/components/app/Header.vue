<script>
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import Modal from '@/components/app/Modal'
import Nav from './Nav'
import Logo from './Logo'
import MenuImage from '@/assets/menu.svg'

export default {
  name: 'Header',
  components: {
    Nav,
    Logo,
    Modal,
    MenuImage,
  },
  data() {
    return {
      pinned: false,
      menuModal: false,
    }
  },
  computed: {
   isMobile() {
      return this.$ui.mobile
    },
  },
  created() {
    window.addEventListener('scroll', debounce(this.handleScroll, 100));
    window.addEventListener('resize', throttle(this.handleResize, 100));
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, 100);
    window.removeEventListener('resize', this.handleResize, 100);
  },
  methods: {
    handleMenuOpen() {
      this.menuModal = true
    },
    handleMenuClose() {
      this.menuModal = false
    },
    handleResize() {
      if (!this.isMobile) {
        this.handleMenuClose()
      }
    },
    handleScroll() {
      this.pinned = window.scrollY > 0
    },
  },
}
</script>

<template>
  <header
    class="header"
    :class="{
      'header--pinned': pinned
    }"
  >
    <Logo />

    <button
      v-if="isMobile"
      @click="handleMenuOpen"
      class="header__menu"
    >
      <menu-image class="header__menu_image" />
    </button>
    <Nav v-else />
    <modal
      v-if="isMobile && menuModal"
      @close="handleMenuClose"
      auto
    >
      <Logo slot="title" />
      <Nav
        slot="body"
        @close="handleMenuClose"
      />
    </modal>
  </header>
</template>

<style lang="scss">
.header {
  box-sizing: border-box;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  max-width: var(--max-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-color);
  box-shadow: rem(0 1px 0 0) rgba(0, 0, 0, 0);
  transition: box-shadow .15s;
  transform: translate3d(0, 0, 0);

  &--pinned {
    box-shadow: rem(0 1px 0 0) var(--text-color-alt);
  }

  @include mq($from: tablet) {
    padding: rem(0 var(--app-margin));

    .viewport-lock & {
      left: calc(-1 * var(--fake-scrollbar-width));
    }
  }


  &__menu {
    padding: rem(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;

    &_image {
      width: rem(32px);
      height: rem(32px);
      color: var(--text-color);
    }
  }
}
</style>
