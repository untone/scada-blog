<script>

export default {
  name: 'Nav',
  computed: {
    routes() {
      const { routes } = this.$router.options
      return routes.filter(route => route.meta.display)
    },
  },
}
</script>

<template>
  <nav>
    <ul class="nav">
      <li
        v-for="({ path, meta }) in routes"
        :key="path"
        class="nav__item"
      >
        <router-link
          :to="path"
          class="nav__link"
          exact
          @click.native="$emit('close')"
        >
          {{ meta.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  padding: rem(20px 0 40px);
  list-style: none;
  transition: padding .15s;

  @include mq($from: 768px) {
    flex-direction: row;
    padding: 0;
  }

  &__item {
    width: 100%;
    padding: rem(8px 0);
    border-bottom: 1px solid var(--text-color);

    &:first-child {
      border-top: 1px solid var(--text-color);
    }

    @include mq($from: 768px) {
      width: auto;
      margin: rem(0 4px);
      border: none !important;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: rem(20px);
    font-size: rem(18px);
    color: var(--text-color);
    text-decoration: none;
    text-transform: lowercase;
    transition: color .15s;
    border-radius: rem(16px);

    &:not(.router-link-active):hover {
      color: var(--primary-color);
    }

    @include mq($from: 768px) {
      height: rem(32px);
      padding: rem(0 16px);
      background-color: rgba(white, 0);
      transition: background-color .15s;

      &.router-link-active {
        background-color: var(--white-color);
        cursor: default;
      }
    }
  }
}
</style>
