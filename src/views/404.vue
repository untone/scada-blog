<script>
export default {
  name: '404',
  created() {
    document.documentElement.classList.add('empty')
  },
  destroyed() {
    document.documentElement.classList.remove('empty')
  },
}
</script>

<template>
  <main class="main main--error">
    <h1 class="error">
      404
    </h1>
    <router-link
      class="button"
      :to="{name: 'Posts'}"
    >
      Go to home
    </router-link>
  </main>
</template>

<style lang="scss">
.empty .header,
.empty #app {
  background-color: var(--white-color);
}

.main--error {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.error {
  padding-bottom: rem(80px);
  font-size: rem(280px);
  line-height: rem(280px);
  color: var(--background-color);
}

.button {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: rem(0 16px);
  width: 175px;
  height: rem(48px);
  font-size: rem(18px);
  color: var(--text-color);
  appearance: none;
  background-color: var(--white-color);
  border: 1px solid var(--text-color);
  border-radius: rem(4px);
  transition: color .15s, background-color .15s, border-color .15s;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
}
</style>
