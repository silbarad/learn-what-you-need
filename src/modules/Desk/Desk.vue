<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="p-2 text-center">
        <h1>Desk - {{ deskName }}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="p-2 text-center">
        <div class="d-flex justify-content-around">
          <b-button class="w-25" @click="() => navigateLearn()">Learn</b-button>
          <b-button class="w-25" @click="() => navigateEdit()">Edit</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { provide, consume } from 'provide-consume-decorator';
import { getModule } from 'vuex-module-decorators';
import FilestoreStore from '@/stores/FilestoreStore';

@Component
@provide({
  // provide a data store
  /* istanbul ignore next */
  filestoreStore() {
    return getModule(FilestoreStore, this.$store);
  },
})
export default class Desk extends Vue {
  @consume('filestoreStore') fbs!: FilestoreStore;

  public get deskUrl() {
    return this.$route.params.url;
  }

  public get deskName() {
    return (this.fbs.Desk || { name: '' }).name;
  }

  public get deskNotExist() {
    return this.fbs.DeskNotExist;
  }

  public async created() {
    await this.fbs.setDeskUrl(this.deskUrl);
  }

  // Event
  public navigateLearn() {
    // TODO: Implement learn
    this.$bvModal.msgBoxOk('Learn in not implement yet');
  }

  public navigateEdit() {
    // TODO: Implement edit
    this.$bvModal.msgBoxOk('Edit in not implement yet');
  }

  @Watch('deskNotExist')
  public watchDeskNotExist(newValue: boolean) {
    if (newValue) {
      this.$router.push('');
    }
  }
}
</script>
