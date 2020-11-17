import { provide, consume } from 'provide-consume-decorator';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import FilestoreServiceImpl from '@/services/filestore.service';
import { Desk } from '@/services/models/Desk';
import { FilestoreService } from '@/services/interface/FilestoreService';
import { DeskType } from '@/services/models/DeskType';

const deskEmpty = {
  id: '',
  name: '',
  url: '',
} as Desk;
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

  desk: Desk = deskEmpty;

  desks = [] as Desk[];

  deskTypes = [] as DeskType[];

  public get Desks() {
    return this.desks;
  }

  public get Desk() {
    return this.desk;
  }

  public get DeskTypes() {
    return this.deskTypes;
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
    if (this.desk !== desk) {
      this.desk = desk;
      this.deskTypes = [];
    }
  }

  @Mutation
  setDeskEmpty() {
    this.desk = deskEmpty;
    this.deskTypes = [];
  }

  @Mutation
  setDeskTypes(deskTypes: DeskType[]) {
    this.deskTypes = deskTypes;
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
  }

  @Action
  async takeDeskTypes(): Promise<void> {
    console.log('--takeDeskTypes--');
    console.log(this.desk);
    if (!this.desk) {
      return;
    }
    const deskTypes = await this.filestore.getDeskTypes(this.desk.ref);
    this.setDeskTypes(deskTypes);
  }
}
