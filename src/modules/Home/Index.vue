<template>
  <b-container>
    <b-jumbotron :fluid="true" class="text-left">
      <h1 class="display-4">Learn what you need</h1>
      <p class="lead">Welcome: {{ userName }}</p>
    </b-jumbotron>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { provide, consume } from 'provide-consume-decorator';
import { getModule } from 'vuex-module-decorators';
import NavigationStore from '../../stores/NavigationStore';
import HomeProps from './types/HomeProps';

@Component
@provide({
  // provide a data store
  navigationStore() {
    return getModule(NavigationStore, this.$store);
  },
})
export default class Home extends Vue implements HomeProps {
  @consume('navigationStore') ds!: NavigationStore;

  public get userName() {
    return this.ds.getUserName;
  }
}
</script>
