import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('posts', {
      postsCount: 'count',
      postsLoading: 'loading',
      postsLoaded: 'loaded',
      postsReady: 'ready',
      postsReady: 'ready',
    }),
    ...mapGetters('posts', [
      'posts',
      'slides',
      'page',
    ]),
  },
  methods: {
    ...mapActions('posts', {
      getPosts: 'GET_POSTS',
      setPage: 'SET_PAGE',
      setPerPage: 'SET_PER_PAGE',
    }),
    ...mapActions('post', {
      setPost: 'SET_POST',
    }),
  },
}
