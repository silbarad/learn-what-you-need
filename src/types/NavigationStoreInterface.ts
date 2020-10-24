import UserAuthenticateSend from './UserAuthenticateSend';

export interface NavigationStoreInterface {
  init(): Promise<void>;
  login(userAuth: UserAuthenticateSend): Promise<string>;
}
