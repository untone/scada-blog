import { api } from '@/utils/api'

const state = {
  created: false,
  loading: false,
}

const getters = {
  created: state => state.created,
  loading: state => state.loading,
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_CREATED(state, created) {
    state.created = created
  },
  CLEAR_CREATED(state) {
    state.created = false
  },
}

const actions = {
  async CREATE_POST({ commit }, payload) {
    commit('SET_LOADING', true)
    const response = await api.post('posts', payload)
    commit('SET_CREATED', true)
    commit('SET_LOADING', false)
  },
  RESET_POST({ commit}) {
    commit('CLEAR_CREATED')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}
