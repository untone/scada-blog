import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('post', {
      postLoaded: 'loaded',
      postReady: 'ready',
      postModal: 'modal',
      commentsLoading: 'loading',
      commentsPage: 'page',
      commentsCount: 'count',
      commentsTotal: 'total',
    }),
  },
  methods: {
    ...mapActions('post', {
      getPost: 'GET_POST',
      getComments: 'GET_COMMENTS',
      setPost: 'SET_POST',
      setCommentsPage: 'SET_PAGE',
      clearPost: 'CLEAR_POST',
    }),
    openPostModal(event, post) {
      this.setPost({ post, modal: true })
      history.pushState(null, null, `/post/${post.id}`)
    },
    closePostModal() {
      this.clearPost()
      history.pushState(null, null, '/')
    },
  },
}
