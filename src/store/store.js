import { createStore } from 'vuex'
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  state() {
    return {
      tempUnit: 'F', // imperial unit system as default
      cities: [],
      errorMsg: '',
      isLoading: false,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters
})

export default store;
