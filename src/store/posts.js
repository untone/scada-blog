import { api } from '@/utils/api'

const PER_PAGE = 11
const SLIDES_COUNT = 3

const state = {
  loaded: false,
  loading: true,
  ready: false,
  posts: [],
  page: 1,
  count: 0,
  perPage: PER_PAGE,
  total: 0,
}

const getters = {
  cached: state => state.cached,
  loading: state => state.loading,
  loaded: state => state.loaded,
  ready: state => state.ready,
  posts: state => state.posts.slice(SLIDES_COUNT),
  slides: state => state.posts.slice(0, SLIDES_COUNT),
  page: state => state.page,
  perPage: state => state.perPage,
  total: state => state.total,
  count: state => state.count,
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_LOADED(state, loaded) {
    state.loaded = loaded
  },
  SET_READY(state, ready) {
    state.ready = ready
  },
  SET_POSTS(state, { posts, count, total }) {
    state.posts = [...state.posts, ...posts]
    state.count = count
    state.total = total
  },
  SET_PAGE(state, page) {
    state.page = page
  },
  SET_PER_PAGE(state, perPage) {
    state.perPage = perPage
  },
}

const actions = {
  async GET_POSTS({ getters, commit }) {
    commit('SET_LOADING', true)
    const params = {
      _page: getters.page,
      _limit: getters.perPage,
    }
    const response = await api.get('posts', { params })
    const { data: posts = [], headers = {} } = response || {}
    const count = parseInt(headers['x-total-count'])
    const total = Math.ceil(count / getters.perPage)
    commit('SET_POSTS', {
      posts,
      count,
      total,
    })
    commit('SET_LOADING', false)
    commit('SET_LOADED', true)
    commit('SET_READY', true)
  },
  SET_PAGE({ commit, dispatch }, page) {
    commit('SET_PAGE', page)
    dispatch('GET_POSTS')
  },
  SET_PER_PAGE({ commit, dispatch }, perPage) {
    commit('SET_PER_PAGE', perPage)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
