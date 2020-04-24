<script>
import { mapGetters, mapActions } from 'vuex'

import PostMixin from '@/mixins/post'

export default {
  name: 'PostItem',
  mixins: [PostMixin],
  computed: {
    ...mapGetters('post', [
      'post',
      'comments',
    ]),
    isDisabled() {
      return this.commentsLoading || this.comments.length === this.commentsCount
    },
  },
  created() {
    this.getComments(this.post.id)
  },
  methods: {
    handleLoadMore() {
      this.setCommentsPage(this.commentsPage + 1)
    },
  },
}
</script>

<template>
  <div class="post">
    <h2
      v-if="!postModal"
      class="post__title"
    >
      {{ post.title }}
    </h2>
    <p class="post__body">
      {{ post.body }}
    </p>
    <aside
      class="post__comments"
      v-if="this.comments.length"
    >
      <h3 class="post__comments_title">
        Comments
      </h3>
      <ul class="post__comments_list">
        <li
          v-for="(comment, index) in comments"
          :key="index"
          class="post__comments_item"
        >
          <header class="post__comments_author">
            {{ comment.name }}&nbsp;({{ comment.email }})
          </header>
          <article class="post__comments_body">
            {{ comment.body }}
          </article>
        </li>
      </ul>
      <div class="post__comments_more">
        <button
          :disabled="isDisabled"
          class="post__comments_more_button"
          @click="handleLoadMore"
        >
          {{ commentsLoading ? 'loading...' : 'load more' }}
        </button>
      </div>
    </aside>
  </div>
</template>

<style lang="scss">
.post {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__title {
    margin: rem(0 0 40px);
    font-size: rem(24px);
    line-height: rem(32px);
  }

  &__body {
    padding: rem(24px 0 48px);
    @include sans-serif;
  }

  &__comments {
    margin: rem(0 -40px);
    padding: rem(40px);
    background-color: var(--background-color);

    &_title {
      padding: rem(0 0 24px);
      @include sans-serif;
      font-size: rem(24px);
      line-height: rem(28px);
    }

    &_list {
      list-style: none;
    }

    &_item {
      padding: rem(16px 0);
      border-bottom: 1px solid var(--text-color);

      &:first-child {
        border-top: 1px solid var(--text-color);
      }
    }

    &_author {
      padding: rem(0 0 10px);
      font-size: rem(18px);
      line-height: rem(24px);
    }

    &_body {
      font-size: rem(18px);
      line-height: rem(24px);
      color: var(--text-color-alt);
      @include sans-serif;
    }

    &_more {
      margin: rem(20px auto 0);
      display: flex;
      align-items: center;
      justify-content: center;

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

}
</style>
