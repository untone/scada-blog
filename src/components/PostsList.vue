<script>
import PostsMixin from '@/mixins/posts'
import PostsItem from '@/components/PostsItem'

export default {
  name: 'PostsList',
  components: {
    PostsItem,
  },
  mixins: [PostsMixin],
  data() {
    return {
      view: 'list',
      views: [
        'list',
        'tiles',
      ],
    }
  },
  created() {
    const { view } = this.$route.query
    if (this.views.includes(view)) {
      this.view = view
    }
  },
  computed: {
    placeholders() {
      return new Array(8)
    },
    isDisabled() {
      return this.postsLoading || this.posts.length === this.postsCount
    },
  },
  methods: {
    handleView(event, view) {
      this.view = view
      this.$router.push({
        query: {
          view: view,
        },
      })
    },
    handleLoadMore() {
      this.setPage(this.page + 1)
    },
  },
}
</script>

<template>
  <section
    class="posts"
    :class="`posts--${view}`"
  >
    <ul class="posts__toggle">
      <li
        v-for="(mode, index) in views"
        :key="index"
        class="posts__toggle_item"
        :class="{
          'posts__toggle_item--active': mode === view
        }"
        @click="handleView($event, mode)"
      >
        {{ mode }}
      </li>
    </ul>
    <ul class="posts__list">
      <template v-if="postsReady">
        <PostsItem
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
        />
      </template>
      <template v-else>
        <PostsItem
          v-for="(post, index) in placeholders"
          :key="index"
        />
      </template>
    </ul>
    <div class="posts__more">
      <button
        class="posts__more_button"
        :disabled="isDisabled"
        @click="handleLoadMore"
      >
        {{ postsLoading ? 'loading...' : 'load more' }}
      </button>
    </div>
  </section>
</template>

<style lang="scss">
.posts {
  padding: rem(0 20px);

  @include mq($from: tablet) {
    margin: 0 auto;
    padding: 0;
    max-width: var(--max-width);
  }

  &__toggle {
    padding: rem(0 0 40px);
    display: flex;
    align-items: center;
    justify-content: center;

    &_item {
      margin: rem(0 4px 0 0);
      padding: rem(0 16px);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      @include sans-serif;
      font-size: rem(18px);
      border: 1px solid rgba(0, 0, 0, 0);
      border-radius: rem(16px);
      transition: border-color .15s, color .15s;
      cursor: pointer;

      &:not(&--active):hover {
        color: var(--primary-color);
      }

      &--active {
        border-color: var(--text-color);
        cursor: default;
      }
    }
  }

  &__list {
    display: flex;
    list-style: none;
    flex-direction: column;

    .posts--tiles & {
      flex-direction: row;
      flex-wrap: wrap;

      @include mq($from: mobileLarge) {
        margin: rem(0 -23px);
        padding-left: rem(23px);
      }
    }
  }

  &__more {
    margin: rem(20px auto 40px);
    display: flex;
    align-items: center;
    justify-content: center;

    @include mq($from: tablet) {
      margin: rem(40px auto 80px);
    }

    &_button {
      @include sans-serif;
      font-size: rem(18px);
      text-transform: lowercase;
      color: var(--text-color);
      appearance: none;
      background: none;
      border: none;
      transition: color .15s;
      cursor: pointer;

      &:hover:not(:disabled) {
        color: var(--primary-color);
      }

      &:disabled {
        cursor: default;
      }
    }
  }
}
</style>
