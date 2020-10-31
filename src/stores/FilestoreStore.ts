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

  deskNotExist = false;

  desk: Desk | undefined = undefined;

  desks = [] as Desk[];

  public get Desks() {
    return this.desks;
  }

  public get Desk() {
    return this.desk;
  }

  public get DeskNotExist() {
    return this.deskNotExist;
  }

  @Mutation
  setDeskNotExist(state: boolean) {
    this.deskNotExist = state;
  }

  @Mutation
  setDesks(desks: Desk[]) {
    this.desks = desks;
  }

  @Mutation
  setDesk(desk: Desk) {
    this.desk = desk;
  }

  @Mutation
  setDeskEmpty() {
    this.desk = undefined;
  }

  @Action
  async takeDesks(): Promise<void> {
    const desks = await this.filestore.getDesks();
    this.setDesks(desks);
  }

  @Action
  async setDeskUrl(url: string): Promise<void> {
    this.setDeskNotExist(false);
    if (this.desks.length === 0) {
      await this.takeDesks();
    }
    const desks = this.desks || [];
    const desk = desks.find((el) => el.url === url);
    if (desk) {
      this.setDesk(desk);
    } else {
      this.setDeskEmpty();
      this.setDeskNotExist(true);
    }
    return Promise.resolve();
  }
}
