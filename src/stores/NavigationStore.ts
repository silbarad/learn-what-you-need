import { provide, consume } from 'provide-consume-decorator';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import FirebaseService from '../services/FirebaseService';

import { FirebaseServiceInterface } from '../types/FirebaseCallbackStoreInterface';
import { NavigationStoreInterface } from '../types/NavigationStoreInterface';
import { FirebaseCallbackStoreInterface } from '../types/FirebaseCallbackInterface';
import UserAuthenticateSend from '../types/UserAuthenticateSend';
import { UserAuthenticate } from '../types/UserAuthenticate';

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
  implements NavigationStoreInterface, FirebaseCallbackStoreInterface {
  @consume('firebase')
  firebase!: FirebaseServiceInterface;

  initFirebase = false;

  userName = '';

  userRoles = [] as string[];

  // GETTERS
  get getIsAuthorized() {
    return this.userRoles.length > 0;
  }

  get getUserName() {
    return this.userName;
  }

  // MUTATION
  @Mutation
  setUserRoles(roles: string[]) {
    this.userRoles = roles;
  }

  @Mutation
  setUserName(userName: string) {
    this.userName = userName;
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
  async logout() {
    await this.firebase.logout();
  }

  @Action
  async userChange(user: UserAuthenticate) {
    this.setUserName(user.userName);
    this.setUserRoles(user.userRoles);
    await Promise.resolve();
  }
}
