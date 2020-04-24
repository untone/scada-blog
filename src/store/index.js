import Vue from 'vue'
import Vuex from 'vuex'

import posts from './posts'
import post from './post'
import create from './create'

const modules = {
  posts,
  post,
  create,
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  namespaced: true,
})
