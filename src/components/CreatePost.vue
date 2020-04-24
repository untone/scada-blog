<script>
import { mapGetters, mapActions } from 'vuex'
import ResizableTextarea from '@/utils/ResizableTextarea.js'
import Arrow from '@/assets/arrow.svg'

export default {
  name: 'CreatePost',
  components: {
    Arrow,
    ResizableTextarea,
  },
  data() {
    return {
      title: null,
      text: null,
      errors: {
        title: false,
        text: false,
      },
    }
  },
  computed: {
    ...mapGetters('create', [
      'created',
      'loading',
    ]),
    resetDisabled() {
      return !this.title && !this.text
    },
    formValid() {
      const values = Object.values(this.errors)
      return !values.filter(Boolean).length
    },
  },
  created() {
    this.resetPost()
  },
  methods: {
    ...mapActions('create', {
      createPost: 'CREATE_POST',
      resetPost: 'RESET_POST',
    }),
    handleInput(event) {
      const { name } = event.target
      this.errors[name] = !this[name].length
    },
    checkForm() {
      this.errors.title = !this.title
      this.errors.text = !this.text

      if (this.formValid) {
        this.submitForm()
      }
    },
    async submitForm() {
      const payload = JSON.stringify({
        title: this.title,
        text: this.text,
      })
      await this.createPost(payload)
      setTimeout(() => {
        this.resetPost()
      }, 5000)
    },
    resetForm() {
      this.title = null
      this.text = null
      this.errors.title = false
      this.errors.text = false
    },
  },
}
</script>

<template>
  <section class="create">
    <header class="create__header">
      <router-link
        :to="{ name: 'Posts'}"
        class="create__back"
      >
        <Arrow class="create__back_image" />
      </router-link>
      <h2 class="create__title">
        new post
      </h2>
    </header>
    <div
      v-if="created"
      class="create__success"
    >
      Post successfully created
    </div>
    <form
      v-else
      class="create__form"
      @submit.prevent
    >
      <fieldset class="create__form_wrap">
        <input
          v-model="title"
          :disabled="loading"
          autocomplete="off"
          name="title"
          type="text"
          placeholder="title"
          @input="handleInput"
          class="create__form_input"
        >
        <transition name="fade">
          <span
            v-if="errors.title"
            class="create__form_message"
          >
            Field is empty
          </span>
        </transition>
      </fieldset>
      <fieldset class="create__form_wrap">
        <resizable-textarea>
          <textarea
            v-model="text"
            :disabled="loading"
            autocomplete="off"
            name="text"
            placeholder="text"
            class="create__form_input create__form_input--multiline"
            @input="handleInput"
          />
        </resizable-textarea>
        <transition name="fade">
          <span
            v-if="errors.text"
            class="create__form_message"
          >
            Field is empty
          </span>
        </transition>
      </fieldset>
      <div class="create__form_footer">
        <button
          class="create__form_button create__form_button--primary"
          @click="checkForm"
        >
          {{ loading ? 'posting...' : 'add a post' }}
        </button>
        <button
          class="create__form_button create__form_button--secondary"
          @click="resetForm"
          :disabled="resetDisabled"
        >
          cancel
        </button>
      </div>
    </form>
  </section>
</template>

<style lang="scss">
.create {
  margin: 0 auto;
  padding: rem(24px 0 0);
  width: 100%;
  max-width: rem(374px);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(0 0 40px);
    position: relative;
    text-align: center;
  }

  &__back {
    margin-right: rem(-24px);
    transform: rotate(180deg);
    color: var(--text-black);
  }

  &__title {
    flex-grow: 1;
    font-size: rem(24px);
    line-height: rem(32px);
    text-align: center;
  }

  &__success {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: rem(18px);
    line-height: rem(24px);
    color: var(--primary-color);
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;

    .wf-active & {
      font-family: 'IBM Plex Sans', sans-serif;
    }

    &_wrap {
      width: 100%;
      padding: rem(0 0 24px);
      position: relative;
      border: none;
    }

    &_input {
      width: 100%;
      height: 48px;
      padding: rem(0 16px);
      font-size: rem(18px);
      border: 1px solid rgba(0, 0, 0, 0);
      transition: border-color .15s;
      outline: none;
      border-radius: 4px;

      &:focus {
        border-color: var(--text-black);
      }

      &--multiline {
        overflow: hidden;
        padding-top: rem(10px);
        height: auto;
        min-height: rem(144px);
      }
    }

    &_message {
      padding: rem(4px 0 0);
      font-size: rem(14px);
      line-height: rem(16px);
      color: var(--primary-color);
    }

    &_button {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: rem(0 16px);
      width: 175px;
      height: rem(48px);
      font-size: rem(18px);
      appearance: none;
      border: 1px solid;
      border-radius: rem(4px);
      transition: color .15s, background-color .15s, border-color .15s;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: default;
      }

      &--primary {
        color: var(--white-color);
        border-color: var(--text-color);
        background-color: var(--text-color);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          border-color: var(--primary-color);
          background-color: var(--primary-color);
        }
      }

      &--secondary {
        color: var(--text-color);
        border-color: var(--text-color);
        background-color: var(--background-color);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          color: var(--primary-color);
          border-color: var(--primary-color);
        }

      }
    }

    &_footer {
      padding: rem(8px 0 0);
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      justify-content: space-between;
    }
  }
}

</style>
