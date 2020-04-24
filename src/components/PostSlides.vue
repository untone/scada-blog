<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import PostsMixin from '@/mixins/posts'
import PostMixin from '@/mixins/post'

export default {
  name: 'PostSlides',
  components: {
    Swiper,
    SwiperSlide,
  },
  mixins: [PostsMixin, PostMixin],
  computed: {
    placeholders() {
      return new Array(3)
    },
    options() {
      return {
        roundLengths: true,
        resistanceRatio: 0.75,
        passiveListeners: false,
        autoplay: false,
        loop: false,
        watchOverflow: true,
        slidesPerView: 'auto',
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
        spaceBetween: 10,
        breakpoints: {
          640: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20,
          },
          768: {
            slidesPerView: 'auto',
            spaceBetween: 20,
            slidesOffsetBefore: 55,
            slidesOffsetAfter: 55,
          },
          1170: {
            slidesPerView: 'auto',
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        },
      }
    },
    swiper() {
      return this.$refs.swiper.$swiper
    },
  },
}
</script>

<template>
  <swiper
    ref="swiper"
    :options="options"
    class="slides"
  >
    <template v-if="postsReady">
      <swiper-slide
        v-for="(post, index) in slides"
        :key="index"
        class="slides__item"
      >
        <router-link
          :key="post.id"
          :to="{
            name: 'Post',
            params: {
              id: post.id
            }
          }"
          class="slides__link"
          :event="''"
          @click.native.prevent="openPostModal($event, post)"
        >
          <h2 class="slides__title">
            {{ post.title }}
          </h2>
          <span class="slides__more">Read more</span>
        </router-link>
      </swiper-slide>
    </template>
    <template v-else>
      <swiper-slide
        v-for="(post, index) in placeholders"
        :key="index"
        class="slides__item"
      >
        <div class="slides__link" />
      </swiper-slide>
    </template>
  </swiper>
</template>

<style lang="scss">
.slides {
  padding: rem(0 0 40px);

  @include mq($from: tablet) {
    margin: rem(0 calc(-1 * var(--app-margin)));
    padding: rem(0 0 80px);
  }

  @include mq($from: wide) {
    margin: 0
  }

  &__item {
    box-sizing: border-box;
    padding: rem(20px);
    width: calc(100vw - 80px) !important;
    height: rem(210px);
    background-color: var(--white-color);
    border-radius: rem(4px);

    @include mq($from: tablet) {
      width: 40% !important;
    }
  }

  &__link {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
    color: var(--text-color);
  }

  &__title {
    font-size: rem(20px);
    line-height: rem(24px);
    flex-grow: 1;

    @include mq($from: tablet) {
      font-size: rem(24px);
      line-height: rem(32px);
    }
  }

  &__more {
    @include sans-serif;
    font-size: rem(18px);
    text-transform: lowercase;
    transition: color .15s;
  }

  &__link:hover &__more {
    color: var(--primary-color);
  }

}
</style>
