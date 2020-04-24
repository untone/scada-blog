<script>
import PostItem from '@/components/PostItem'
import PostMixin from '@/mixins/post'

export default {
  name: 'Post',
  components: {
    PostItem,
  },
  mixins: [PostMixin],
  computed: {
    postId() {
      return this.$route.params.id
    },
  },
  created() {
    if (!this.postLoaded) {
      this.getPost(this.postId)
    }
  },
}
</script>

<template>
  <main class="main">
    <template v-if="postReady">
      <PostItem />
    </template>
  </main>
</template>
