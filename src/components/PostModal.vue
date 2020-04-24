<script>
import { mapGetters } from 'vuex'
import PostItem from '@/components/PostItem'
import Modal from '@/components/app/Modal'

import PostsMixin from '@/mixins/posts'
import PostMixin from '@/mixins/post'

export default {
  name: 'PostModal',
  components: {
    PostItem,
    Modal,
  },
  mixins: [PostsMixin, PostMixin],
  computed: {
    ...mapGetters('post', [
      'post',
    ]),
  },
}
</script>

<template>
  <modal
    v-if="postModal"
    @close="closePostModal"
  >
    <h2 slot="title">
      {{ post.title }}
    </h2>
    <PostItem slot="body" />
  </modal>
</template>
