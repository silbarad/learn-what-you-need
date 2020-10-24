import Vue from 'vue';
import Vuex from 'vuex';
import NavigationStore from './NavigationStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    navigationStore: NavigationStore,
  },
});

export default store;
