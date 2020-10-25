import { UserAuthenticate } from './UserAuthenticate';
import UserAuthenticateSend from './UserAuthenticateSend';

export interface NavigationStoreInterface {
  getIsAuthorized: boolean;
  getUserName: string;
  init(): Promise<void>;
  login(userAuth: UserAuthenticateSend): Promise<string>;
  logout(): Promise<void>;
  userChange(user: UserAuthenticate): Promise<void>;
}
