import Vue from 'vue';
import Vuex from 'vuex';
import NavigationStore from '../modules/Navigation/store/NavigationStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    navigationStore: NavigationStore,
  },
});

export default store;
