import { provide, consume } from 'provide-consume-decorator';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import FirebaseService from '../services/FirebaseService';

import { FirebaseServiceInterface } from '../types/FirebaseServiceInterface';
import { NavigationStoreInterface } from '../types/NavigationStoreInterface';
import { FirebaseCallbackInterface } from '../types/FirebaseCallbackInterface';
import UserAuthenticateSend from '../types/UserAuthenticateSend';

const LOGIN_OBJECT_NOT_VALID = 'Login object is not valid.';

@Module({
  name: 'navigationStore',
  namespaced: true,
  stateFactory: true,
})
@provide({
  firebase: () => new FirebaseService(),
})
export default class extends VuexModule
  implements NavigationStoreInterface, FirebaseCallbackInterface {
  @consume('firebase')
  firebase!: FirebaseServiceInterface;

  initFirebase = false;

  userName = '';

  userRoles = [] as string[];

  get isAuthorized() {
    return this.userRoles.length > 0;
  }

  @Mutation
  setRoles(roles: string[]) {
    this.userRoles = roles;
  }

  @Mutation
  setInitFirebase() {
    this.initFirebase = true;
  }

  @Action
  async init() {
    if (!this.initFirebase) {
      await this.firebase.init(this);
      this.setInitFirebase();
    }
  }

  @Action
  async login(userAuth: UserAuthenticateSend) {
    if (!userAuth) {
      return LOGIN_OBJECT_NOT_VALID;
    }
    return this.firebase.login(userAuth);
  }

  @Action
  async userChange() {
    this.setRoles(['admin']);
    return Promise.resolve();
  }
}
