<script>
import PostsMixin from '@/mixins/posts'
import PostSlides from '@/components/PostSlides'
import PostsList from '@/components/PostsList'
import PostModal from '@/components/PostModal'

export default {
  name: 'Posts',
  components: {
    PostSlides,
    PostsList,
    PostModal,
  },
  mixins: [PostsMixin],
  created() {
    if (!this.postsLoaded) {
      this.getPosts()
      this.setPerPage(8)
    }
  },
}
</script>

<template>
  <main class="main">
    <template>
      <PostSlides />
      <PostsList />
      <PostModal />
    </template>
  </main>
</template>

