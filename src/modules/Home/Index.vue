<template>
  <b-container>
    <b-jumbotron :fluid="true" class="text-left">
      <h1 class="display-4">Learn what you need</h1>
      <p class="lead">Welcome: {{ userName }}</p>
    </b-jumbotron>
    <b-row v-for="desk in desks" :key="desk.id" class="m-1 border">
      <b-col cols="8" class="p-2 text-left">{{ desk.name }}</b-col>
      <b-col cols="4" class="p-2 text-right">
        <b-button @click="showCards(desk.url)">Show cards</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { provide, consume } from 'provide-consume-decorator';
import { getModule } from 'vuex-module-decorators';
import NavigationStore from '@/stores/NavigationStore';
import FilestoreStore from '@/stores/FilestoreStore';
import HomeProps from './types/HomeProps';

@Component
@provide({
  // provide a data store
  /* istanbul ignore next */
  navigationStore() {
    return getModule(NavigationStore, this.$store);
  },
  /* istanbul ignore next */
  filestoreStore() {
    return getModule(FilestoreStore, this.$store);
  },
})
export default class Home extends Vue implements HomeProps {
  @consume('navigationStore') ds!: NavigationStore;

  @consume('filestoreStore') fbs!: FilestoreStore;

  public get userName() {
    return this.ds.getUserName;
  }

  public get desks() {
    return this.fbs.Desks;
  }

  public async created() {
    await this.fbs.takeDesks();
  }

  public showCards(url: string) {
    const newUrl = `desk/${url}`;
    this.$router.push(newUrl);
  }
}
</script>
