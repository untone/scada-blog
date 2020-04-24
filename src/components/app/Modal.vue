<script>
import CloseImage from '@/assets/close.svg'

const LOCK_VIEWPORT_CLASS = 'viewport-lock'

export default {
  name: 'Modal',
  props: {
    auto: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CloseImage,
  },
  computed: {
    isMobile() {
      return this.$ui.mobile
    },
  },
}
</script>

<template>
  <portal to="modals-portal">
    <transition
      name="modal"
      :duration="150"
      @before-enter="$ui.lockViewport"
      @after-leave="$ui.unlockViewport"
    >
      <div class="modal">
        <div
          class="modal__overlay"
          @click="$emit('close')"
        />
        <div
          class="modal__box"
          :class="{
            'modal__box--auto': auto
          }"
        >
          <div class="modal__header">
            <h2 class="modal__title">
              <slot name="title" />
            </h2>
            <slot name="close">
              <button
                class="modal__close"
                @click="$emit('close')"
              >
                <CloseImage class="modal__close_image" />
              </button>
            </slot>
          </div>
          <div class="modal__body">
            <slot name="body" />
          </div>
          <div class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </portal>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  will-change: transition;
  line-height: 1.5;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 120vw;
    height: 120vh;
    transform: translate(-10vw, -10vh);
    transition: opacity .35s;
    background-color: var(--text-color);
    opacity: .15;
  }

  &__box {
    overflow: hidden;
    width: 100%;
    max-width: none;
    height: 100%;
    max-height: none;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--white-color);
    transition: box-shadow 0.15s, opacity .35s;
    will-change: transition;

    &--auto {
      height: auto;
    }

    @include mq($from: tablet) {
      margin: rem(120px auto);
      width: rem(650px);
      height: auto;
      max-height: calc(100% - (120px * 2));
      border-radius: rem(8px);
    }
  }

  &__header {
    padding: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @include mq($from: tablet) {
      padding: rem(40px 40px 0);
    }
  }

  &__title {
    padding: rem(24px);
    max-width: 80%;
    font-size: rem(24px);
    line-height: rem(32px);

    @include mq($from: tablet) {
      padding: 0;
    }
  }

  &__close {
    padding: rem(22px);
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    background: none;
    color: var(--text-color);
    border: none;
    cursor: pointer;

    @include mq($from: tablet) {
      padding: 0;
    }

    &_image {
      width: rem(32px);
      height: rem(32px);
      color: var(--text-color);
      transition: color .15s;
    }

    &:hover &_image {
      color: var(--primary-color);
    }

  }

  &__body {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: rem(0 24px);
    flex-shrink: 1;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    @include mq($from: tablet) {
      padding: rem(0 40px);
    }
  }

}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__box,
.modal-leave-active .modal__box,
.modal-enter .modal__overlay,
.modal-leave-active .modal__overlay {
  opacity: 0;
}
</style>
