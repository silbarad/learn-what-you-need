import UserAuthenticateSend from './UserAuthenticateSend';

export interface NavigationStoreInterface {
  getIsAuthorized: boolean;
  init(): Promise<void>;
  login(userAuth: UserAuthenticateSend): Promise<string>;
  logout(): Promise<void>;
}
