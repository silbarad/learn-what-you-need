import Vue from 'vue';
import Vuex from 'vuex';
import NavigationStore from './NavigationStore';
import FilestoreStore from './FilestoreStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    navigationStore: NavigationStore,
    filestoreStore: FilestoreStore,
  },
});

export default store;
