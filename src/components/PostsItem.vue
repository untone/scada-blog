<script>
import VClamp from 'vue-clamp'
import PostsMixin from '@/mixins/posts'
import PostMixin from '@/mixins/post'
import Arrow from '@/assets/arrow.svg'
import Placeholder from '@/assets/image.svg'

export default {
  name: 'PostsItem',
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [PostsMixin, PostMixin],
  components: {
    Arrow,
    Placeholder,
    VClamp,
  },
}
</script>

<template>
  <li class="posts__item">
    <template v-if="post">
      <router-link
        :key="post.id"
        :to="{
          name: 'Post',
          params: {
            id: post.id
          }
        }"
        class="posts__link"
        :event="''"
        @click.native.prevent="openPostModal($event, post)"
      >
        <Placeholder class="posts__image" />
        <div class="posts__wrap">
          <v-clamp
            tag="h2"
            :max-lines="3"
            autoresize
            class="posts__title"
          >
            {{ post.title }}
          </v-clamp>
          <Arrow class="posts__arrow" />
        </div>
      </router-link>
    </template>
    <template v-else>
      <div class="posts__link">
        <span class="posts__title" />
      </div>
    </template>
  </li>
</template>

<style lang="scss">
.posts {

  &__item {
    transition: all .15s;
    width: 100%;

    .posts--list & {
      border-bottom: 1px solid var(--text-color);

      &:first-child {
        border-top: 1px solid var(--text-color);
      }
    }

    .posts--tiles & {

      @include mq($from: mobileLarge) {
        flex-basis: 50%;
      }

      @include mq($from: desktop) {
        flex-basis: 25%;
      }
    }
  }


  &__image {
    display: none;

    .posts--tiles & {
      display: block;
      width: 100%;
      height: auto;

      @include mq($from: mobileLarge) {
        height: rem(180px);
      }
    }
  }

  &__link {
    display: block;
    color: var(--text-color);
    text-decoration: none;

    .posts--list & {
      padding: rem(12px 0);
    }

    .posts--tiles & {
      display: flex;
      flex-wrap: wrap;
      margin: rem(0 0 23px 0);
      border-radius: rem(2px);
      background-color: var(--white-color);

      @include mq($from: mobileLarge) {
        margin: rem(0 23px 23px 0);
        height: rem(300px);
      }
    }
  }

  &__wrap {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 180px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;

    .posts--tiles & {
      overflow: hidden;
      padding: rem(16px);
      align-items: flex-start;
    }
  }

  &__title {
    padding: rem(0 20px 0 0);
    font-size: rem(20px);
    line-height: rem(24px);

    @include mq($from: tablet) {
      font-size: rem(24px);
      line-height: rem(32px);
    }

    .posts--tiles & {
      flex-basis: 80%;
      padding: rem(0 16px 0 0);
      font-size: rem(18px);
      line-height: rem(23px);
    }
  }

  &__arrow {
    margin-left: auto;
    width: rem(24px);
    height: rem(24px);
    transition: color .15s;

    .posts--tiles & {
      align-self: flex-end;
    }
  }

  &__link:hover &__arrow {
    color: var(--primary-color);
  }
}
</style>
