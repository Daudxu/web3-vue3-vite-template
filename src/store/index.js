
import { createStore } from 'vuex'

import contentStore from './modules/contentStore'

const state = {
  count: 12,
  requesting: false,
  error: {}
}

const getters = {
  count: state => state.count,
  requesting: state => state.requesting,
  error: state => state.error
}

export default createStore({
  state,
  getters,
  modules: {
    contentStore
  }
})
