import { api } from '@/utils/api'

const PER_PAGE = 2

const state = {
  loading: false,
  loaded: false,
  post: {},
  comments: [],
  count: 0,
  modal: false,
  ready: false,
  page: 1,
  perPage: PER_PAGE,
  total: 0,
}

const getters = {
  post: state => state.post,
  comments: state => state.comments,
  count: state => state.count,
  modal: state => state.modal,
  loading: state => state.loading,
  loaded: state => state.loaded,
  ready: state => state.ready,
  page: state => state.page,
  perPage: state => state.perPage,
  total: state => state.total,
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
  SET_POST(state, { post, modal = false }) {
    state.post = post
    state.modal = modal
  },
  SET_COMMENTS(state, { comments, count, total }) {
    state.comments = [...state.comments, ...comments]
    state.count = count
    state.total = total
  },
  SET_PAGE(state, page) {
    state.page = page
  },
  SET_PER_PAGE(state, perPage) {
    state.perPage = perPage
  },
  CLEAR_POST(state) {
    state.post = {}
    state.comments = 0
    state.page = 1
    state.modal = false
    state.total = 0
  },
}

const actions = {
  async GET_POST({ commit }, id) {
    const response = await api.get(`posts/${id}`)
    const { data } = response || {}
    commit('SET_POST', {
      post: data,
    })
    commit('SET_LOADED', true)
    commit('SET_READY', true)
  },
  SET_POST({ commit }, payload) {
    commit('SET_POST', payload)
  },
  async GET_COMMENTS({ getters, commit }) {
    commit('SET_LOADING', true)
    const params = {
      _page: getters.page,
      _limit: getters.perPage,
    }
    const response = await api.get(`posts/${getters.post.id}/comments`, { params })
    const { data: comments = [], headers = {} } = response || {}
    console.log('response', response)
    console.log('data', response.data)
    const count = parseInt(headers['x-total-count'])
    const total = Math.ceil(count / getters.perPage)
    commit('SET_COMMENTS', {
      comments,
      count,
      total,
    })
    commit('SET_LOADING', false)
  },
  SET_PAGE({ commit, dispatch }, page) {
    commit('SET_PAGE', page)
    dispatch('GET_COMMENTS')
  },
  CLEAR_POST({ commit }) {
    commit('CLEAR_POST')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
