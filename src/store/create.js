import { api } from '@/utils/api'

const state = {
  created: false,
}

const getters = {
  created: state => state.created,
}

const mutations = {
  SET_CREATED(state, created) {
    state.created = created
  },
  CLEAR_CREATED(state) {
    state.created = false
  },
}

const actions = {
  async CREATE_POST({ commit }, payload) {
    const response = await api.post('posts', payload)
    const { data } = response || {}
    console.log('data', data)
    commit('SET_CREATED', true)
    // commit('SET_LOADED', true)
    // commit('SET_READY', true)
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
