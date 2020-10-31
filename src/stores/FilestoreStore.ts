import { provide, consume } from 'provide-consume-decorator';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import FilestoreServiceImpl from '@/services/filestore.service';
import { Desk } from '@/services/models/Desk';
import { FilestoreService } from '@/services/interface/FilestoreService';

@Module({
  name: 'filestoreStore',
  namespaced: true,
  stateFactory: true,
})
@provide({
  /* istanbul ignore next */
  filestore: () => new FilestoreServiceImpl(),
})
export default class extends VuexModule {
  @consume('filestore')
  filestore!: FilestoreService;

  desks = [] as Desk[];

  public get getDesks() {
    return this.desks;
  }

  @Mutation
  setDesks(desks: Desk[]) {
    this.desks = desks;
  }

  @Action
  async takeDesks(): Promise<void> {
    const desks = await this.filestore.getDesks();
    this.setDesks(desks);
  }
}
